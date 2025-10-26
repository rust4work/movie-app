"use client";

import { useEffect } from "react";

async function getGuestSessionId() {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to create guest session");
  }

  const data = await res.json();
  return data.guest_session_id;
}

export default function InitGuestSession() {
  useEffect(() => {
    console.log("InitGuestSession mounted");

    const storedId = localStorage.getItem("guest_session_id");
    console.log("Current localStorage ID:", storedId);

    if (!storedId) {
      console.log("No guest session found. Creating new one...");
      getGuestSessionId()
        .then((id) => {
          localStorage.setItem("guest_session_id", id);
          console.log("✅ New guest session ID:", id);
        })
        .catch((err) => {
          console.error("❌ Error creating guest session:", err);
        });
    } else {
      console.log("Guest session already exists:", storedId);
    }
  }, []);

  return null;
}
