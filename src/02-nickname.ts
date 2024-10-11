import {SimplePool} from 'nostr-tools';
import {finalizeEvent} from "nostr-tools";
import {relays, publicKey, secretKey} from "./00-defaults";
import {EventTemplate} from "nostr-tools/lib/types/core";

const pool = new SimplePool();

const eventTemplate: EventTemplate = {
    kind: 0,
    pubkey: publicKey,
    created_at: Math.floor(Date.now() / 1000),
    tags: [

    ],
    content: JSON.stringify({
        name: 'CC Workshop',
        about: "Existuji jen kvůli workshopu na ChainCampu2024"
    }),
    /// sig: 'nevíme',
} satisfies EventTemplate;

const signedEvent = finalizeEvent(eventTemplate, secretKey);

console.log('signedEvent', signedEvent);

const result = await Promise.all(pool.publish(relays, signedEvent));

console.log(result);

pool.close(relays);
