'use client';

import QRCode from "react-qr-code";
import {npub} from "../../src/00-defaults";

export default function Page() {
    return (
        <>
                <div style={{height: "auto", margin: "0 auto", maxWidth: 512, width: "100%"}}>
                    <QRCode
                        size={256}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={npub}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </>
            );
            }