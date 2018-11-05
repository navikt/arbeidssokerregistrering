Arbeidssøkerregistrering
================

Registrering av arbeidssøker

# Editering av tekster direkte i Github
1. For å se tekstnøklene (samsvarer med filnavn), legg på `?vistekster=true` i URL'en. F.eks: `https://arbeidssokerregistrering.herokuapp.com?vistekster=true`.
2. Finn filen der teksten er definert, under `/src/tekster/hjelpetekster`.
3. Trykk på edit og gjør endringen.
4. Trykk på Commit changes nederst på siden.
5. På neste side, åpne en pull request (forespørsel om å få gjøre endring) ved å trykke Create pull request.
6. Utviklerne får automatisk beskjed om at pull requesten er oppretter, og aksepterer endringen så fort en av dem har mulighet.

# Komme i gang med utvikling
* `npm i` 
* `npm start`

## Utvikling med backend

* Clone og start (StartJetty normal) `dev-proxy`  https://github.com/navikt/dev-proxy
* Clone og start `veilarbregistrering` https://github.com/navikt/veilarbregistrering
* Åpne appen i `localhost:8080`

# Kjøre integrasjonstester lokalt
* `npm i` 
* `npm run integrationtest`

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Kjell Arne Brødreskift, Kjell.Arne.Brodreskift@nav.no
* Ola Galde, Ola.Galde@nav.no
* Lars Andreas Tveiten, Lars.Andreas.van.Woensel.Kooy.Tveiten@nav.no
* Gård, Alexander Alexander.Gard@nav.no
* Joselito Poblete, Joselito.Poblete@nav.no
