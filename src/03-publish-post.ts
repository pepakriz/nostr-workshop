import {nip19, SimplePool} from 'nostr-tools';
import {finalizeEvent} from "nostr-tools";
import {nsec, npub, relays, publicKey, secretKey} from "./00-defaults";
import {EventTemplate} from "nostr-tools/lib/types/core";

const pool = new SimplePool();

const eventTemplate = {
    kind: 1,
    pubkey: publicKey,
    created_at: Math.floor(Date.now() / 1000),
    tags: [

    ],
    content: "Hello world!",
    /// sig: 'nevíme',
} satisfies EventTemplate;

const signedEvent = finalizeEvent(eventTemplate, secretKey);

const result = await Promise.all(pool.publish(relays, signedEvent));

console.log(result);

pool.close(relays);
