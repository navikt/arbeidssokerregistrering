# Arbeidssøkerregistrering

Frontend for registrering av arbeidssøker for **personbrukere**.

Frontenden for **veiledere** finnes på [navikt/arbeidssokerregistrering-fss](https://github.com/navikt/arbeidssokerregistrering-fss).

# Komme i gang med utvikling

- `npm i`
- `npm start`

For å starte app i demo-mode

- `npm run demo`

## Utvikling med backend

- Clone og start (StartJetty normal) `dev-proxy` https://github.com/navikt/dev-proxy
- Clone og start `veilarbregistrering` https://github.com/navikt/veilarbregistrering
- Åpne appen i `localhost:8080`

# Kjøre GUI-tester lokalt

Start server i cypress modus i et terminalvindu og start testene i et annet.

- `npm run start:cypress`
- `npm run cypress:run`

# Editering av tekster direkte i Github

1. For å se tekstnøklene (samsvarer med filnavn), legg på `?vistekster=true` i URL'en. F.eks: `https://arbeidssokerregistrering.herokuapp.com?vistekster=true`.
2. Finn filen der teksten er definert, under `/src/tekster/hjelpetekster`.
3. Trykk på edit og gjør endringen.
4. Trykk på Commit changes nederst på siden.
5. På neste side, åpne en pull request (forespørsel om å få gjøre endring) ved å trykke Create pull request.
6. Utviklerne får automatisk beskjed om at pull requesten er oppretter, og aksepterer endringen så fort en av dem har mulighet.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-paw-dev](https://nav-it.slack.com/archives/CLTFAEW75)
