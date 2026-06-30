const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  process.stderr.write("Supabase is not configured. Copy .env.example to .env.local and add the project URL and anon key.\n");
  process.exit(1);
}

try {
  const headers = { apikey: anonKey };
  if (!anonKey.startsWith("sb_publishable_")) headers.Authorization = `Bearer ${anonKey}`;
  const response = await fetch(new URL("/auth/v1/settings", url), {
    headers
  });

  if (!response.ok) {
    throw new Error(`Supabase API returned ${response.status} ${response.statusText}`);
  }

  process.stdout.write("Supabase connection successful.\n");
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "Supabase connection failed."}\n`);
  process.exit(1);
}
