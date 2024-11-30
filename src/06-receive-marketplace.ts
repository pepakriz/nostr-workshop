import {nip04, nip19, SimplePool} from 'nostr-tools';
import {publicKey, relays, secretKey} from "./00-defaults";

const pool = new SimplePool();

pool.subscribeMany(relays, [
    {
        kinds: [30017, 30018],
        authors: [publicKey],
        limit: 5,
    }
], {
    onevent(event) {
        console.log('got event:', event);
    },
});
pool.subscribeMany(relays, [
    {
        kinds: [4],
        '#p': [publicKey],

        limit: 5,
    }
], {
    async onevent(event) {
        const message = await nip04.decrypt(secretKey, event.pubkey, event.content);

        console.log('got event:', event);
        console.log('got message:', message);
    },
});

