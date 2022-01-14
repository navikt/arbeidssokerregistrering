
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:14 as node-builder

ADD / /source
ARG PUBLIC_URL
ENV CI=true \
    PUBLIC_URL=$PUBLIC_URL
WORKDIR /source
RUN npm ci && npm run build


FROM ghcr.io/navikt/pus-decorator/pus-decorator:latest
ENV APPLICATION_NAME=arbeidssokerregistrering
COPY --from=node-builder /source/build /app
ADD decorator.yaml /decorator.yaml