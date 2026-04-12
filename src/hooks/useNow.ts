import { useEffect, useState } from "react";

export function formatElapsed(startTimestamp?: number, now?: number) {
    if (!startTimestamp || !now) return '';

    let ms = now - startTimestamp;
    ms = ms < 0 ? 0 : ms;

    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function updateTime(timestamp: number) {
    const now = new Date(timestamp);
    const currentDate = now.toLocaleDateString('vi-VN');
    const currentTime = now.toLocaleTimeString('vi-VN', { hour12: false });

    return `${currentDate} ${currentTime}`;
}

export function useNow(intervalMs = 1000) {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const id = setInterval(() => {
            setNow(Date.now());
        }, intervalMs);

        return () => clearInterval(id);
    }, [intervalMs]);

    return now;
}