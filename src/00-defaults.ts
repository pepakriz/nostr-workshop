import {nip19} from "nostr-tools";

export const nsec = 'nsec1jzp0h9wenntj75u3863wwxcs0knzkxmucptw4l60u957dzrcj65s2qt9et';
export const npub = 'npub1fr23l7h07pe3f9fjk96n5h4p6k3tu4kelnra7wug2fnafxt0fk0q3xdk79';

export const relays = [
    // 'wss://nostr.wine',
    'wss://relay.primal.net',
    'wss://relay.damus.io',
];

export const secretKey = nip19.decode(nsec).data;
export const publicKey = nip19.decode(npub).data;