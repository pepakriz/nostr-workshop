import {nip19, SimplePool} from 'nostr-tools';
import {finalizeEvent} from "nostr-tools";
import {nsec, npub, relays, publicKey, secretKey} from "./00-defaults";
import {EventTemplate} from "nostr-tools/lib/types/core";

const pool = new SimplePool();

const stallId = '11d9981c-2f90-4ab3-bf6b-d3d02861c53c';
const shippingId = '7e64c004-9d5a-4522-bb41-9d25669d9d30';

{
    const eventTemplate = {
        kind: 30017,
        pubkey: publicKey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
            ["d", stallId]
        ],
        content: JSON.stringify({
            "id": stallId,
            "name": "Testing restaurant",
            "description": "",
            "currency": "CZK",
            "shipping": [
                {
                    "id": shippingId,
                    "name": "personally",
                    "cost": 0,
                    "regions": [],
                }
            ]
        }),
    } satisfies EventTemplate;

    const signedEvent = finalizeEvent(eventTemplate, secretKey);

    const result = await Promise.all(pool.publish(relays, signedEvent));

    console.log(result);
}

{
    const productId = 'a6bfcdc7-f795-4647-b2d2-77639fecc2b6';
    const eventTemplate = {
        kind: 30018,
        pubkey: publicKey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
            ["d", productId],
            // ["t", <String (optional), product category],
            // ["t", <String (optional), product category],
        ],
        content: JSON.stringify({
            "id": productId,
    "stall_id": stallId,
    "name": "Řízek",
    "description": "",
    "images": [],
    "currency": "CZK",
    "price": 139,
    "quantity": 2,
    "specs": [],
    "shipping": [
    {
        "id": shippingId,
    "cost": 0,
}
]
        }),
    } satisfies EventTemplate;

    const signedEvent = finalizeEvent(eventTemplate, secretKey);

    const result = await Promise.all(pool.publish(relays, signedEvent));

    console.log(result);
}

pool.close(relays);
