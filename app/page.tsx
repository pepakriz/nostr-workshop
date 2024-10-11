'use client';

import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white_contrast_compact_verbatim_headers.css";
import {useEffect, useRef} from "react";

const MoreInfoLink = (props: { link: string }) => (
    <>
        <br />
        <br />
        <br />

        <a href={props.link}>více
            podrobností</a>
    </>
);

export default function Page() {
    const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
    const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

    useEffect(() => {
        // Prevents double initialization in strict mode
        if (deckRef.current) return;

        deckRef.current = new Reveal(deckDivRef.current!, {
            transition: "slide",
            // other config options
        });
        deckRef.current.initialize({
            plugins: [RevealMarkdown, RevealHighlight],
        }).then(() => {
            // good place for event handlers and plugin setups
        });

        return () => {
            try {
                if (deckRef.current) {
                    deckRef.current.destroy();
                    deckRef.current = null;
                }
            } catch (e) {
                console.warn("Reveal.js destroy call failed.");
            }
        };
    }, []);

    return (
        // Your presentation is sized based on the width and height of
        // our parent element. Make sure the parent is not 0-height.
        <div className="reveal" ref={deckDivRef}>
            <div className="slides">
                <section>
                    <a href="https://revealjs.com">
                        <img src="/static/nostr-logo.png" style={{width: 200}} alt="Nostr logo"
                             className="demo-logo"/>
                    </a>
                    <h1>Z technického pohledu</h1>
                    <p>
                        <small>@pepakriz</small>
                    </p>
                </section>

                <section>
                    <section>
                        <h2>Opakování</h2>
                    </section>
                    <section>
                        <img
                            src={'/static/nostr-client1.webp'}
                            width="auto"
                            height="600px"
                        />
                        <img
                            src={'/static/nostr-client2.png'}
                            width="auto"
                            height="600px"
                        />
                    </section>
                    <section>
                        <h3>Co znamená "protokol"?</h3>

                        <blockquote>
                            "Nostr is a protocol, designed for simplicity, that aims to create a censorship-resistant
                            global
                            social network." - https://nostr.com/
                        </blockquote>

                        <img src={'/static/railway.jpg'}/>
                    </section>
                    <section>
                        <blockquote>
                            "There are two main components: clients & relays. Each user runs a client. Anyone can run a
                            relay." - https://nostr.com/
                        </blockquote>

                        <img src={'static/nostr-network.png'}/>
                    </section>
                    <section>
                        <h3>Běžná registrace do online služeb</h3>

                        <img src={'static/signup-form.png'}/>
                    </section>
                    <section>
                        <h3>Registrace do nostru</h3>

                        <ul>
                            <li>nPub</li>
                            <li>nSec</li>
                        </ul>
                    </section>
                </section>

                <section>
                    <section>
                        <h2>Jdeme pod povrch</h2>

                        <img
                            src={'/static/diving.png'}
                            width="600px"
                            height="auto"
                        />
                    </section>
                    <section>
                        <h3>Využití klíčů</h3>

                        <ul>
                            <li>Podepisování dat jako důkaz autorství</li>
                            <li>Zasílání šifrovaných dat konkrétnímu příjemci</li>
                        </ul>
                    </section>
                    <section>
                        <h3>Podepisování</h3>

                        <img
                            src={'/static/signature.png'}
                            width="600px"
                            height="auto"
                        />
                    </section>
                    <section>
                        <h3>Šifrování</h3>

                        <img
                            src={'/static/encryption.png'}
                            width="400px"
                            height="auto"
                        />
                    </section>
                    <section>
                        <h3>Event</h3>

                        <img
                            src={'/static/data-icon.png'}
                            width="100px"
                            height="auto"
                        />

                        <pre>
                            <code data-trim={''} data-noescape={''} data-line-numbers={''}>
{`{
    "id": "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    "pubkey": "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    "created_at": 1673347337,
    "kind": 1,
    "content": "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    "tags": [
        ["e", "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206"],
        ["p", "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"]
    ],
    "sig": "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
}`}
                            </code>
                        </pre>

                        <MoreInfoLink
                            link={'https://github.com/nostr-protocol/nips/blob/master/01.md#events-and-signatures'}/>
                    </section>
                    <section>
                        <h3>Sekce 'tags'</h3>

                        <img
                            src={'/static/tag.png'}
                            width="100px"
                            height="auto"
                        />

                        <pre>
                            <code data-trim={''} data-noescape={''} data-line-numbers={''}>
{`{
  "tags": [
    ["e", "5c83da77af1dec6d7289834998ad7aafbd9e2191396d75ec3cc27f5a77226f36", "wss://nostr.example.com"],
    ["p", "f7234bd4c1394dda46d09f35bd384dd30cc552ad5541990f98844fb06676e9ca"],
    ["a", "30023:f7234bd4c1394dda46d09f35bd384dd30cc552ad5541990f98844fb06676e9ca:abcd", "wss://nostr.example.com"],
    ["alt", "reply"],
    // ...
  ],
  // ...
}`}
                            </code>
                        </pre>

                        <MoreInfoLink link={'https://github.com/nostr-protocol/nips/blob/master/01.md#tags'}/>
                    </section>
                    <section>
                        <h3>NIPs</h3>

                        <blockquote>
                            Nostr Implementation Possibilities<br/>
                            <a href={'https://github.com/nostr-protocol/nips'}>https://github.com/nostr-protocol/nips</a>
                        </blockquote>
                    </section>
                    <section>
                        <h3>Komunikace s relay</h3>

                        <ul>
                            <li>
                                <code>{'["EVENT", <event JSON as defined above>]'}</code>
                            </li>
                            <li>
                                <code>{'["REQ", <subscription_id>, <filters1>, <filters2>, ...]'}</code>
                            </li>
                            <li>
                                <code>{'["CLOSE", <subscription_id>]'}</code>
                            </li>
                        </ul>

                        <MoreInfoLink
                            link={'https://github.com/nostr-protocol/nips/blob/master/01.md#from-client-to-relay-sending-events-and-creating-subscriptions'}/>
                    </section>
                    <section>
                        <h3>Odpovědi od relay</h3>

                        <ul>
                            <li>
                                <code>{'["EVENT", <subscription_id>, <event JSON as defined above>]'}</code>
                            </li>
                            <li>
                                <code>{'["OK", <event_id>, <true|false>, <message>]'}</code>
                            </li>
                            <li>
                                ...
                            </li>
                        </ul>

                        <MoreInfoLink
                            link={'https://github.com/nostr-protocol/nips/blob/master/01.md#from-relay-to-client-sending-events-and-notices'}/>
                    </section>
                </section>

                <section>
                    <section>
                        <h2>Ukázky kódu</h2>
                    </section>
                    <section>
                        <h3>NIP-01: user metadata & posts</h3>
                    </section>
                    <section>
                        <h3>NIP-02: follow list</h3>
                    </section>
                    <section>
                        <h3>NIP-04: Encrypted Direct Message (@deprecated)</h3>
                    </section>
                    <section>
                        <h3>NIP-78: Arbitrary custom app data</h3>

                        <a href={'https://github.com/nostr-protocol/nips/blob/master/78.md'}>https://github.com/nostr-protocol/nips/blob/master/78.md</a>
                    </section>
                </section>

                <section>
                    <section>
                        <h2>Jak na vlastní aplikace?</h2>
                    </section>
                    <section>
                        <h3>Co Nostr relay poskytuje vývojářům za featury?</h3>

                        <div className={'fragment fade-up'}>
                            <ul>
                                <li>data storage</li>
                                <li>message bus</li>
                                <li>event queue</li>
                                <li>event sourcing</li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <h3>https://www.satlantis.io</h3>

                        <img src={'/static/satlantis.png'}/>
                    </section>
                    <section>
                        <h3>https://www.0xchat.com</h3>

                        <img src={'/static/oxchat.png'}/>
                    </section>
                    <section>
                        <h3>https://www.flockstr.com</h3>

                        <img src={'/static/flockstr.png'}/>
                    </section>
                    <section>
                        <h3>https://nostrapps.com</h3>

                        <img src={'/static/nostrapps.png'}/>
                    </section>

                    <section>
                        <h3>Nápady?</h3>

                        <ul>
                            <li className={'fragment fade-up'}>Recenze produktů (Heureka)</li>
                            <li className={'fragment fade-up'}>Recenze filmů (ČSFD)</li>
                            <li className={'fragment fade-up'}>Restaurační menu (Qerko, Choice)</li>
                            <li className={'fragment fade-up'}>Rezervace (Qerko, Choice)</li>
                            <li className={'fragment fade-up'}>Pokročilé platby - od stolu, takeaway apod. (Qerko,
                                Choice) - inspirace: <a
                                    href={'https://github.com/nostr-protocol/nips/blob/master/15.md'}>NIP-15</a></li>
                            <li className={'fragment fade-up'}>Nákup/prodej BTC přes kontakty (Vexl)</li>
                        </ul>
                    </section>
                </section>
                <section>
                    <section>
                        <h2>
                            A jaký nápad je ten váš?
                        </h2>
                        <h3 className={'fragment fade-up'}>
                            Pobavme se o tom...
                        </h3>

                        <img
                            className={'fragment fade-up'}
                            src={'/static/pepakriz-nostr-qr.png'}
                            width="300px"
                            height="auto"
                        />
                    </section>
                </section>
            </div>
        </div>
    );
}