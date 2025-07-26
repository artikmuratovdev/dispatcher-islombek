/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); 
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  return (
    showButton && (
      <button
        onClick={handleInstall}
        className="px-5 py-2 bg-white absolute top-3 right-3 z-10 rounded-lg "
      >
        Install App
      </button>
    )
  );
};
