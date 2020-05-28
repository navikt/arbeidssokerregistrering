import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Alertstripe from 'nav-frontend-alertstriper';
import virkedager from '@alheimsins/virkedager';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import prettyPrintDato from '../../utils/pretty-print-dato';
import veilederSvg from './veileder-mann.svg';
import { uniLogger } from '../../metrikker/uni-logger';
import KontaktOpplysninger from './kontaktopplysninger';
import KontaktOpplysningerMangler from './kontaktopplysninger-mangler';

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
            {telefonnummerRegistrert ?
                <KontaktOpplysninger
                    telefonnummerHosKrr={kontaktinfo.telefonnummerHosKrr}
                    telefonnummerHosNav={kontaktinfo.telefonnummerHosNav}
                    handleEndreOpplysningerClicked={handleEndreOpplysningerClicked}
                /> :
                <KontaktOpplysningerMangler
                    handleEndreOpplysningerClicked={handleEndreOpplysningerClicked}
                />
            }
        </Veilederpanel>
    );
}

export default OppgaveOpprettet;
