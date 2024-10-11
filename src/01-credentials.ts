import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { nip19 } from 'nostr-tools';

const secretKey = generateSecretKey() // `sk` is a Uint8Array
const publicKey = getPublicKey(secretKey) // `pk` is a hex string

const nsec = nip19.nsecEncode(secretKey)
const npub = nip19.npubEncode(publicKey);

console.log('nsec', nsec);
console.log('npub', npub);

