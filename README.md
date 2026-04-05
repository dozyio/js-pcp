# @dozyio/pcp

PCP (Port Control Protocol, RFC 6887) port mapping for Node.js.

## Install

```console
npm i @dozyio/pcp
```

## Usage

```ts
import { pcpNat } from '@dozyio/pcp'

// Router LAN-side IPv6 GUA running the PCP server
const client = pcpNat('2a0e:e0c0:0001:0002:e000:0001:3243:c001')
const gateway = await client.getGateway()

// Option A: explicitly map to a specific local host IPv6 address
const explicit = await gateway.map(3000, '2a0e:e0c0:0001:0002:1619:e31a:f311:c00d', {
  protocol: 'udp'
})

console.info(explicit)

// Option B: let the library auto-select local addresses from OS interfaces
for await (const m of gateway.mapAll(3000, {
  protocol: 'udp'
})) {
  console.info(m)
}

await gateway.stop()
```

## Addressing model

- `pcpNat(<gatewayAddress>)` expects the PCP server address (usually the router LAN-side IPv6 GUA).
- `gateway.map(port, <localHostAddress>, options)` maps traffic to your local machine address.
- `gateway.mapAll(port, options?)` discovers eligible local interface addresses and tries each one.
- Address discovery skips loopback and link-local addresses.

## Notes

- PCP runs over UDP port `5351`.
- Some routers require PCP via a LAN-side IPv6 GUA instead of link-local or WAN addresses.

## Testing

- Integration tests require a reachable PCP gateway set via `GATEWAY=<router-ipv4-or-ipv6>`.
- Gateway-dependent tests are skipped in CI.

## License

Licensed under either of:

- Apache 2.0 ([LICENSE-APACHE](./LICENSE-APACHE))
- MIT ([LICENSE-MIT](./LICENSE-MIT))
