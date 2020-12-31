# action-package-audit

Requires 2FA for publishing an npm org’s packages.

## Environment Variables

### `NPM_TOKEN`

**Required** A [token](https://docs.npmjs.com/about-access-tokens) to authenticate with the npm registry. An automtion token should be provided, not a read-only or publish token.

### `PACKAGE_AUDIT_ORG`

**Required** The npm org to audit. For example, `"smockle"`.

### `PACKAGE_AUDIT_EXCEPTIONS`

**Optional** A space-delimited list of npm packages which should not require 2FA for publishing. For example, `"@smockle/contrast @smockle/periodic"`.

## Example usage

```YAML
- name: Package Audit
  uses: smockle/action-package-audit@main
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    PACKAGE_AUDIT_ORG: "smockle"
    PACKAGE_AUDIT_EXCEPTIONS: "@smockle/contrast @smockle/periodic"
```