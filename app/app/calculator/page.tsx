'use client';

import {useEffect, useState} from "react";
import {finalizeEvent, SimplePool} from "nostr-tools";
import {publicKey, relays, secretKey} from "../../../src/00-defaults";
import {nip04} from "nostr-tools";
import {bytesToHex} from "@noble/hashes/utils";
import * as mathjs from "mathjs";
import {EventTemplate} from "nostr-tools/lib/types/core";

export default function Page() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const pool = new SimplePool();
        pool.subscribeMany(relays, [
            {
                kinds: [4],
                '#p': [publicKey],
                limit: 0,
            }
        ], {
            async onevent(event) {
                console.log('got event:', event);
                setRows((rows) => [
                    event,
                    ...rows,
                ]);

                const message = await nip04.decrypt(bytesToHex(secretKey), event.pubkey, event.content);
                console.log('message', message);

                const [command, ...rest] = message.split(' ');
                const args = rest.join(' ');

                console.log('command', command, args);

                const result = (() => {
                    if (command === '/calculate') {
                        try {
                            return `${args} = ${mathjs.evaluate(args)}`;
                        } catch (err) {
                            console.error(err);

                            return err.message;
                        }
                    } else {
                        return `Unsupported command ${command}`;
                    }
                })();

                let ciphertext = await nip04.encrypt(bytesToHex(secretKey), event.pubkey, result);

                const eventTemplate = {
                    kind: 4,
                    pubkey: publicKey,
                    created_at: Math.floor(Date.now() / 1000),
                    tags: [
                        ['p', event.pubkey],
                    ],
                    content: ciphertext,
                } satisfies EventTemplate;

                const signedEvent = finalizeEvent(eventTemplate, secretKey);

                await Promise.all(pool.publish(relays, signedEvent));
            },
        });

        return () => {
            pool.close(relays);
            pool.destroy();
        };
    }, []);

    return (
        <>
            <h2>Send DM '/command 5*6'</h2>

            <ul>
                {rows.map((row, i) => (
                    <li key={i}>
                        <pre>{JSON.stringify(row, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </>
    );
}