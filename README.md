# @dozyio/js-libp2p-pcp

PCP (Port Control Protocol, RFC 6887) port mapping for Node.js.

## Install

```console
npm i @dozyio/js-libp2p-pcp
```

## Usage

```ts
import { pcpNat } from '@dozyio/js-libp2p-pcp'

const client = pcpNat('2a0e:e0c0:0001:0002:e000:0001:3243:c001')
const gateway = await client.getGateway()

const mapping = await gateway.map(3000, '2a0e:e0c0:0001:0002:1619:e31a:f311:c00d', {
  protocol: 'udp',
  suggestedExternalPort: 2000
})

console.info(mapping)

await gateway.stop()
```

## Notes

- PCP runs over UDP port `5351`.
- Some routers require PCP via a LAN-side IPv6 GUA instead of link-local or WAN addresses.

## License

Licensed under either of:

- Apache 2.0 ([LICENSE-APACHE](./LICENSE-APACHE))
- MIT ([LICENSE-MIT](./LICENSE-MIT))
