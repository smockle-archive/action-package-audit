#!/usr/bin/env node --es-module-specifier-resolution=node

import { run } from "./run.mjs";

/** A read-only token to authenticate with the npm registry. */
const token = process.env.NPM_TOKEN;
if (!token) {
  console.error("Missing environment variable: NPM_TOKEN");
  process.exit(1);
}
await run(`echo "//registry.npmjs.org/:_authToken=${token}" > "${process.env.HOME}/.npmrc"`);

/** The npm org to audit */
const org = process.env.PACKAGE_AUDIT_ORG;
if (!org) {
  console.error("Missing environment variable: PACKAGE_AUDIT_ORG");
  process.exit(1);
}

/** Packages which should not require 2FA for publishing */
const exceptions = (process.env.PACKAGE_AUDIT_EXCEPTIONS ?? "")
  .trim()
  .split(" ")
  .filter((x) => x);

// Retrieve org packages
const { stdout } = await run(`npm access ls-packages ${org}`);

// Extract a list of org packages from command output, then
// remove exceptions.
const packages = Object.keys(JSON.parse(stdout.trim()))
  .filter((pkg) => !exceptions.includes(pkg));

// Require 2FA for publishing packages
// Docs: https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification
for (const pkg of packages) {
  await run(`npm access 2fa-required ${pkg}`);
}
