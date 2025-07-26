import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const isFirstRender = useRef(true);
    const wasOffline = useRef(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!isOnline) {
            toast.error("Offline rejim!");
            wasOffline.current = true;
        } else if (wasOffline.current) {
            toast.success("Internetga ulandi!");
            wasOffline.current = false;
        }
    }, [isOnline]);

    return null;
};