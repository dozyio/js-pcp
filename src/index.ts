/**
 * @packageDocumentation
 *
 * PCP (Port Control Protocol, RFC 6887) client for opening and maintaining
 * port mappings.
 */

import { PCPNATClient } from './pcp/index.js'
import type { AbortOptions } from 'abort-error'

export type Protocol = 'tcp' | 'TCP' | 'udp' | 'UDP'

export interface GlobalMapPortOptions {
  /**
   * TTL for port mappings in ms
   *
   * @default 3_600_000
   */
  ttl?: number

  /**
   * If true, any mapped ports are refreshed before they expire
   *
   * @default true
   */
  autoRefresh?: boolean

  /**
   * How long to wait while trying to refresh a port mapping in ms
   *
   * @default 10_000
   */
  refreshTimeout?: number
}

export interface MapPortOptions extends GlobalMapPortOptions, AbortOptions {
  /**
   * The protocol the port uses
   *
   * @default 'TCP'
   */
  protocol?: Protocol
}

export interface PCPMapPortOptions extends GlobalMapPortOptions, AbortOptions {
  /**
   * The internal IP address of the host - IPv4 or IPv6
   */
  internalAddress: string

  /**
   * The suggested external port to map - best effort as this may already be in use
   *
   * @default localPort
   */
  suggestedExternalPort?: number

  /**
   * The suggested external IP address to map - best effort as this may not be available
   *
   * @default ''
   */
  suggestedExternalAddress?: string

  /**
   * The protocol the port uses
   *
   * @default 'TCP'
   */
  protocol?: Protocol
}

export interface PortMapping {
  externalHost: string
  externalPort: number
  internalHost: string
  internalPort: number
  protocol: 'TCP' | 'UDP'
}

export interface Gateway {
  id: string
  host: string
  port: number
  family: 'IPv4' | 'IPv6'

  stop(options?: AbortOptions): Promise<void>
  map(internalPort: number, internalHost: string, options?: MapPortOptions): Promise<PortMapping>
  mapAll(internalPort: number, options?: MapPortOptions): AsyncGenerator<PortMapping, void, unknown>
  unmap(internalPort: number, options?: AbortOptions): Promise<void>
  externalIp(options?: AbortOptions): Promise<string>
}

export interface PCPNAT {
  /**
   * Use a specific network gateway for port mapping
   */
  getGateway(options?: AbortOptions): Promise<Gateway>
}

/**
 * Create a PCP port mapper
 */
export function pcpNat (ipAddress: string, options: GlobalMapPortOptions = {}): PCPNAT {
  return new PCPNATClient(ipAddress, options)
}
