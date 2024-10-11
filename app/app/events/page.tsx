'use client';

import {useEffect, useState} from "react";
import {SimplePool} from "nostr-tools";
import {publicKey, relays} from "../../../src/00-defaults";

export default function Page() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const pool = new SimplePool();
        pool.subscribeMany(relays, [
            {
                // kinds: [1],
                authors: [publicKey],
                limit: 5,
            }
        ], {
            onevent(event) {
                setRows((rows) => [
                    event,
                    ...rows,
                ])
                console.log('got event:', event);
            },
        });

        return () => {
            pool.close(relays);
            pool.destroy();
        };
    }, []);

    return (
        <>
              <ul>
                  {rows.map((row) => (
                      <li><pre>{JSON.stringify(row, null, 2)}</pre></li>
                  ))}
              </ul>
            </>
            );
            }