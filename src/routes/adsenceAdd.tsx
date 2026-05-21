import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdsenseAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: "320px",
          }}
          data-ad-client="ca-pub-8022438675607325"
          data-ad-slot="8445235299"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
    );
}