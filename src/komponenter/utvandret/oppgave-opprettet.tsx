import * as React from 'react';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Alertstripe from 'nav-frontend-alertstriper';
import virkedager from '@alheimsins/virkedager';
import { Kontaktinformasjon } from '../oppholdstillatelse';
import EksternLenke from '../ekstern-lenke/ekstern-lenke';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import prettyPrintDato from '../../utils/pretty-print-dato';
import veilederSvg from '../oppholdstillatelse/veileder-mann.svg';
import { uniLogger } from '../../metrikker/uni-logger';

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

    uniLogger('registrering.utvandret.kontaktmeg.success');
    uniLogger('registrering.utvandret.kontaktmeg.telefonnummer', {
        krr: kontaktinfo.telefonnummerHosKrr ? 'true' : 'false',
        nav: kontaktinfo.telefonnummerHosNav ? 'true' : 'false'
    });

    React.useEffect(() => {
        hentKontaktinfo('/veilarbregistrering/api/person/kontaktinfo');
    }, []);

    const idag = new Date();
    const nesteVirkedag = virkedager(idag, 2);
    const datoNorsk = prettyPrintDato({ dato: nesteVirkedag, language: 'no' });
    const datoEngelsk = prettyPrintDato({ dato: nesteVirkedag, language: 'en' });

    const handleEndreOpplysningerClicked = () => {
        uniLogger('registrering.utvandret.endreopplysninger.clicked');
    };

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
                onClick={handleEndreOpplysningerClicked}
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
                onClick={handleEndreOpplysningerClicked}
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

export default OppgaveOpprettet;
