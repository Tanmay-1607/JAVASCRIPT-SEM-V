
export function getTimeRemaining(targetDate) {
    const currentTime = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const difference = targetTime - currentTime;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: true
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
    };
}

export function formatDate(date) {
    return new Date(date).toLocaleString();
}
