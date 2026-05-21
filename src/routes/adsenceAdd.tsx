import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
    }
}

const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8022438675607325";

function scheduleIdleCallback(callback: () => void) {
    if (typeof window.requestIdleCallback === "function") {
        return window.requestIdleCallback(callback, { timeout: 3000 });
    }

    return window.setTimeout(callback, 1500);
}

function clearIdleCallback(handle: number) {
    if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle);
        return;
    }

    window.clearTimeout(handle);
}

function loadAdsenseScript() {
    return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${ADSENSE_SCRIPT_URL}"]`);
        if (existing) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = ADSENSE_SCRIPT_URL;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load AdSense script"));
        document.head.appendChild(script);
    });
}

export default function AdsenseAd() {
    useEffect(() => {
        const handle = scheduleIdleCallback(() => {
            loadAdsenseScript()
                .catch(() => undefined)
                .finally(() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch {
                        // Ignore failures during ad initialization.
                    }
                });
        });

        return () => clearIdleCallback(handle);
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