# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as node-builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci && npm run build


FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator-ssl
ENV APPLICATION_NAME=arbeidssokerregistrering
COPY --from=node-builder /source/build /app
ADD decorator.yaml /decorator.yaml
ADD decorator-q1-fss.yaml /decorator-q1-fss.yaml
ADD decorator-q0-fss.yaml /decorator-q0-fss.yaml
ADD decorator-prod-fss.yaml /decorator-prod.yaml