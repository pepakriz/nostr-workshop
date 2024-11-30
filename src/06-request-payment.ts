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
            "type": 1,
            "message": "Děkujeme, že jste u nás povečeřel",
            "payment_options": [
    {
        "type": "url",
        "link": "https://stripe.com/abc"
},
    {
        "type": "ln",
        "link": "lnbc620n1pnj5cwzpp5c95z8zsaex2hakhds0q9epgd7jng9mtrm6mrucawwwkw3mmhlc3sdqqcqzzsxqrrsssp5ne9h6d4fea53n5g5tfprh835v85yk6tdmgtphvfr0fpcju276kfs9qyyssqt2cp0jh8y85u03hqcjzav2vfmv5ehrxqm7uyrd33eg6u32ftju2jgc0t0peks334c85hau7d6w4fwk666u7rjlkan0uu84lm0vq3vlqpupfsdv"
    },
]
})),
    } satisfies EventTemplate;

    const signedEvent = finalizeEvent(eventTemplate, secretKey);

    console.log(signedEvent);
    const result = await Promise.all(pool.publish(relays, signedEvent));

    console.log(result);
}


pool.close(relays);
