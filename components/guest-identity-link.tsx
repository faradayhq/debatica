"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrCreateGuestIdentity } from "@/lib/guest-profile";

export function GuestIdentityLink() {
  const [displayName, setDisplayName] = useState("Guest mode");

  useEffect(() => {
    setDisplayName(getOrCreateGuestIdentity().displayName);
  }, []);

  return <Link className="guest-badge" href="/profile" aria-label="Open guest profile">{displayName}</Link>;
}
