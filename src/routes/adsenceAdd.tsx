import React, { useEffect } from 'react';

const AdsComponent = ({ dataAdSlot }) => {

    useEffect(() => {
        try {
            if (
                typeof window !== "undefined" && window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        } catch (e) {
            console.error("Adsense error:", e);
        }
    }, [dataAdSlot]);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8022438675607325"
            data-ad-slot={dataAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default AdsComponent;