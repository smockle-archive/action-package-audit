FROM node:14-slim

LABEL name="action-package-audit"
LABEL maintainer="Clay Miller <clay@smockle.com>"
LABEL version="1.0.0"
LABEL repository="https://github/smockle/action-package-audit"
LABEL homepage="https://github/smockle/action-package-audit"

LABEL com.github.actions.name="Package Audit"
LABEL com.github.actions.description="Requires 2FA for publishing an npm org’s packages"
LABEL com.github.actions.icon="shield"
LABEL com.github.actions.color="blue"

COPY run.mjs /run.mjs
COPY index.mjs /index.mjs
ENTRYPOINT ["node", "/index.mjs"]