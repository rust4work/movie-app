"use client";

import { useEffect, useState } from "react";

export default function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center text-white z-[9999] text-center">
      <h1 className="text-2xl font-bold mb-2">Oops... something went wrong</h1>
      <h3 className="text-lg opacity-80">Check your connection</h3>
    </div>
  );
}
