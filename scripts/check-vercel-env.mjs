#!/usr/bin/env node

/**
 * Build-time Supabase env diagnostic for Vercel/production builds.
 * Prints true/false only — never key values.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function loadEnvFile(relativePath) {
  const filePath = join(process.cwd(), relativePath);
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

// Vercel injects env at build time. Locally, load .env files before Next.js runs.
loadEnvFile(".env");
loadEnvFile(".env.local");

function exists(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0;
}

console.log("[cedar-creek] Supabase environment check (build time):");

for (const name of VARS) {
  console.log(`${name} exists: ${exists(name)}`);
}

console.log("[cedar-creek] End Supabase environment check.");
