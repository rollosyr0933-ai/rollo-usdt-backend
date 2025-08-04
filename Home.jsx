import React, { useEffect, useState } from 'react';

export default function Home() {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrice(parseFloat(data.p).toFixed(2));
        };

        return () => ws.close();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">أسعار العملات الرقمية - Rollo.usdt</h1>
            <p>سعر BTC/USDT الحالي: <span className="font-semibold">{price ? `${price} USDT` : 'جارٍ التحميل...'}</span></p>
        </div>
    );
}