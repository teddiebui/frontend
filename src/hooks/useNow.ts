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
    const currentTime = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${currentDate} ${currentTime}`;
}

export function useNow(intervalMs = 1000) {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if (intervalMs <= 0) {
            setNow(Date.now());
            return undefined;
        }

        let intervalId: ReturnType<typeof setInterval> | undefined;

        const tick = () => {
            setNow(Date.now());
        };

        const timeoutDelay = intervalMs - (Date.now() % intervalMs);
        const timeoutId = setTimeout(() => {
            tick();
            intervalId = setInterval(tick, intervalMs);
        }, timeoutDelay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalMs]);

    return now;
}