"use client";

import { useEffect, useState } from "react";
import { getOrCreateGuestIdentity } from "@/lib/guest-profile";

export function GuestIdentityLink() {
  const [displayName, setDisplayName] = useState("Guest mode");

  useEffect(() => {
    setDisplayName(getOrCreateGuestIdentity().displayName);
  }, []);

  return <span className="guest-badge">{displayName}</span>;
}
