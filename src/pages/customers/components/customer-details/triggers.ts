export const setTime = (isoString: Date | string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

export const distanceTime = (date1: Date | string, date2: Date | string) => {
    if (typeof date1 === 'string') date1 = new Date(date1);
    if (typeof date2 === 'string') date2 = new Date(date2);

    const diffTime = Math.abs(date1.getTime() - date2.getTime());

    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    if (hours > 0) return `${h}:${m}:${s}`;
    if (minutes > 0) return `${m}:${s}`;
    return `${s}s`;
  };