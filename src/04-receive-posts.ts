import {nip19, SimplePool} from 'nostr-tools';
import {relays} from "./00-defaults";

const npub = 'npub1lz8xv2dnyryrk4vswkcgf52vqqzruqwuyp53s7pvusx4fef9fh2s7hh86s'; // Hynek Jína

const publicKey = nip19.decode(npub);

const pool = new SimplePool();

pool.subscribeMany(relays, [
    {
        kinds: [1],
        authors: [publicKey.data],
        limit: 5,
    }
], {
    onevent(event) {
        console.log('got event:', event);
    },
});
