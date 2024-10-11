import {SimplePool} from 'nostr-tools';
import {publicKey, relays} from "./00-defaults";

const pool = new SimplePool();

pool.subscribeMany(relays, [
    {
        kinds: [3],
        '#p': [publicKey],

        limit: 5,
    }
], {
    onevent(event) {
        console.log('got event:', event);
    },
});
