import {nip04, nip19, SimplePool} from 'nostr-tools';
import {finalizeEvent} from "nostr-tools";
import {nsec, npub, relays, publicKey, secretKey} from "./00-defaults";
import {EventTemplate} from "nostr-tools/lib/types/core";

const pool = new SimplePool();

const paymentId = 'a37e307c80ee987d0d392761596e60a1360aeabddffc2e02759ed3579b7defff';

{
    const eventTemplate = {
        kind: 4,
        pubkey: publicKey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
            ['p', 'adf1c23ec4e667a87ac676d681dca38677d8c940f25600f82c4b66230917bcd5']
        ],
        content: await nip04.encrypt(secretKey, 'adf1c23ec4e667a87ac676d681dca38677d8c940f25600f82c4b66230917bcd5', JSON.stringify({
            "id": paymentId,
            "type": 2,
            "message": "Děkujeme, že jste u nás povečeřel",
            "paid": true,
            shipped: true,
        })),
    } satisfies EventTemplate;

    const signedEvent = finalizeEvent(eventTemplate, secretKey);

    console.log(signedEvent);
    const result = await Promise.all(pool.publish(relays, signedEvent));

    console.log(result);
}


pool.close(relays);
