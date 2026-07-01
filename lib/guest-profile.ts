import type { GuestProfile } from "./data";
import { getCountryCode } from "./countries";

export const GUEST_PROFILE_KEY = "debaticaGuestProfile";
export const GUEST_PROFILE_PROMPT_SEEN_KEY = "debaticaGuestProfilePromptSeen";
export const GUEST_ID_KEY = "debaticaGuestId";

export type GuestIdentity = {
  id: string;
  displayName: string;
  countryCode?: string;
};

const GUEST_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const GUEST_ID_LENGTH = 6;
let sessionGuestId: string | null = null;

export const GUEST_AGE_RANGES = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"] as const;

function isValidGuestId(value: string | null): value is string {
  return Boolean(value)
    && value!.length === GUEST_ID_LENGTH
    && [...value!].every((character) => GUEST_ID_ALPHABET.includes(character));
}

function generateGuestId() {
  const randomValues = new Uint8Array(GUEST_ID_LENGTH);
  crypto.getRandomValues(randomValues);
  return [...randomValues].map((value) => GUEST_ID_ALPHABET[value % GUEST_ID_ALPHABET.length]).join("");
}

export function getOrCreateGuestIdentity(): GuestIdentity {
  let id: string;
  try {
    const storedId = localStorage.getItem(GUEST_ID_KEY);
    id = isValidGuestId(storedId) ? storedId : generateGuestId();
    if (id !== storedId) localStorage.setItem(GUEST_ID_KEY, id);
    sessionGuestId = id;
  } catch {
    sessionGuestId ??= generateGuestId();
    id = sessionGuestId;
  }
  const country = readGuestProfile().country;
  const countryCode = getCountryCode(country);
  return { id, displayName: `Guest #${id}`, ...(countryCode && { countryCode }) };
}

export function readGuestProfile(): GuestProfile {
  try {
    const stored = localStorage.getItem(GUEST_PROFILE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as GuestProfile;
    return {
      ...(typeof parsed.ageRange === "string" && { ageRange: parsed.ageRange }),
      ...(typeof parsed.country === "string" && { country: parsed.country })
    };
  } catch {
    return {};
  }
}
