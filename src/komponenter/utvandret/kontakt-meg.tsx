import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst, Feilmelding, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import '../oppholdstillatelse/kontakt-meg-melding.less';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import { uniLogger } from '../../metrikker/uni-logger';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { Kontaktinformasjon } from '../oppholdstillatelse';
import EksternLenke from '../ekstern-lenke/ekstern-lenke';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederSvg from '../oppholdstillatelse/veileder-mann.svg';
import Alertstripe from 'nav-frontend-alertstriper';
import virkedager from '@alheimsins/virkedager';

const OppgaveOpprettet = () => {
    interface Kontaktinfo {
        telefonnummerHosKrr: string | null;
        telefonnummerHosNav: string | null;
    }
    const [kontaktinfo, setKontaktinfo] = React.useState<Kontaktinfo>({
        telefonnummerHosKrr: null,
        telefonnummerHosNav: null
    });

    const hentKontaktinfo = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'get',
        });

        if (response.status === 200) {
            const data = await response.json();
            setKontaktinfo({
                telefonnummerHosKrr: data.telefonnummerHosKrr,
                telefonnummerHosNav: data.telefonnummerHosNav
            });
        }
    };

    React.useEffect(() => {
        hentKontaktinfo('/veilarbregistrering/api/person/kontaktinfo');
    }, []);

    const idag = new Date();
    const nesteVirkedag = virkedager(idag, 2);
    const datoNorsk = prettyPrintDato({ dato: nesteVirkedag, language: 'no' });
    const datoEngelsk = prettyPrintDato({ dato: nesteVirkedag, language: 'en' });

    const telefonnummerRegistrert = kontaktinfo.telefonnummerHosKrr || kontaktinfo.telefonnummerHosNav;

    const kontaktOpplysninger = () => (
        <>
            {kontaktinfo.telefonnummerHosKrr ?
                <Kontaktinformasjon
                    telefonnummer={kontaktinfo.telefonnummerHosKrr}
                    kilde="Kontakt- og reservasjonsregisteret"
                    data-testid="kontaktinformasjonskort-krr"
                /> : null}
            {kontaktinfo.telefonnummerHosNav ?
                <Kontaktinformasjon
                    telefonnummer={kontaktinfo.telefonnummerHosNav}
                    kilde="NAV"
                    data-testid="kontaktinformasjonskort-nav"
                /> : null}
            <EksternLenke
                url="https://www.nav.no/person/personopplysninger/#kontaktinformasjon"
                tekst="Endre opplysninger / Change contact details"
                data-testid="ekstern-lenke-endre-opplysninger"
            />
        </>
    );

    const kontaktOpplysningerMangler = () => (
        <>
            <div style={{ display: 'flex' }}>
                <Feilmelding data-testid="feilmelding">
                    Ingen kontaktopplysninger funnet! / No contact details found!
                </Feilmelding>
                <Hjelpetekst className="tekstboks">
                    Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
                    / Please make sure your contact details are updated or we will be unable to reach you.
                </Hjelpetekst>
            </div>
            <EksternLenke
                url="https://www.nav.no/person/personopplysninger/#kontaktinformasjon"
                tekst="Legg inn kontaktopplysninger / Enter contact details"
                data-testid="ekstern-lenke-legg-inn-opplysninger"
            />
        </>
    );

    return (
        <Veilederpanel
            svg={<img src={veilederSvg} alt="veileder" className="veileder-illustrasjon" />}
            type={'plakat'}
            kompakt
        >
            <Alertstripe type="suksess" data-testid="alertstripe">
                <Undertittel >Henvendelse mottatt / Request received</Undertittel>
            </Alertstripe>
            <Undertittel className="tekstboks">Viktig / Important:</Undertittel>
            <p>
                Vi kontakter deg innen utgangen av <strong>{datoNorsk}</strong>.
                Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
            </p>
            <p>
                We will contact you before the end of <strong>{datoEngelsk}</strong>.
                Please make sure your contact details are updated.
            </p>
            {telefonnummerRegistrert ? kontaktOpplysninger() : kontaktOpplysningerMangler()}
        </Veilederpanel>
    );
}

const KontaktMeg = () => {

    interface Oppgave {
        id: number;
        tildeltEnhetsnr: string;
        oppgaveType: string;
    }

    const [oppgave, setOppgave] = React.useState<Oppgave>({
        id: -1,
        tildeltEnhetsnr: '',
        oppgaveType: ''
    });

    const opprettOppgave = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({ oppgaveType: 'UTVANDRET' })
        });

        if (response.status === 200) {
            const data = await response.json();
            setOppgave({ id: data.id, tildeltEnhetsnr: data.tildeltEnhetsnr, oppgaveType: data.oppgaveType });
        }
    };

    const handleKontakMegClicked = () => {
        uniLogger('registrering.utvandret.kontaktmeg');
        opprettOppgave('/veilarbregistrering/api/oppgave');
    };

    if (oppgave.id === -1) {
        return (
            <Panel border>
                <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
                    En veileder må hjelpe deg slik at du blir registrert
                </Systemtittel>
                <Normaltekst className="blokk-s">
                    Du står registrert som utvandret i våre systemer.<br />
                    Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.
                </Normaltekst>
                <Normaltekst className="blokk-m">
                    Kontakt oss, så hjelper vi deg videre.
                </Normaltekst>
                <div className="blokk-s">
                    <Hovedknapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={handleKontakMegClicked}>
                        Ta kontakt / Contact us
                    </Hovedknapp>
                </div>
                <Normaltekst className="blokk-s">
                    You're listed as emigrated in our systems.<br />
                    This means that you cannot register as a jobseeker online.
                </Normaltekst>
                <Normaltekst className="blokk-m">
                    Please contact us for help with this.
                </Normaltekst>
            </Panel>
        );
    } else {
        return <OppgaveOpprettet />;
    }
}

export default KontaktMeg;
