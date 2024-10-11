'use client';

import React from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import {npub} from "../../src/00-defaults";
import {usePathname} from "next/navigation";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <>
            <nav>
                <ul>
                    <li><Link href={'/app'}>QR</Link></li>
                    <li><Link href={'/app/events'}>Events</Link></li>
                    <li><Link href={'/app/calculator'}>Calculator</Link></li>
                </ul>
            </nav>

            {pathname !== '/app' && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: "auto",
                    padding: "16px",
                    border: '1px solid #dddddd',
                    borderRadius: '8px',
                    maxWidth: 128,
                    width: "100%",
                    backgroundColor: '#ffffff',
                }}>
                    <QRCode
                        size={256}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={npub}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            )}

            <div>{children}</div>
        </>
    )
}