import React from 'react';
import { Undertittel, Feilmelding } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import virkedager from '@alheimsins/virkedager'
import Hjelpetekst from 'nav-frontend-hjelpetekst';

import prettyPrintDato from '../../utils/pretty-print-dato'
import { State as KontaktinfoState } from '../../ducks/kontaktinfo';
import { Kontaktinformasjon } from './'
import EksternLenke from '../ekstern-lenke/ekstern-lenke';
import { uniLogger } from '../../metrikker/uni-logger';

import veilederSvg from './veileder-mann.svg';
import './kontakt-meg-melding.less';

interface Props {
    kontaktinfo: KontaktinfoState;
    visKontaktopplysninger: boolean;
};

const OppgaveSuccess = ({kontaktinfo, visKontaktopplysninger}: Props) => {
    const { status, data: {telefonnummerHosKrr, telefonnummerHosNav} } = kontaktinfo;
    const telefonnummer = {
        krr: telefonnummerHosKrr ? 'true' : 'false',
        nav: telefonnummerHosNav ? 'true' : 'false'
    };
    uniLogger('registrering.oppholdstillatelse.kontaktmeg.telefonnummer', telefonnummer);
    uniLogger('registrering.oppholdstillatelse.kontaktmeg.success');
    const idag = new Date();
    const nesteVirkedag = virkedager(idag, 2);
    const datoNorsk = prettyPrintDato({ dato: nesteVirkedag, language: 'no' });
    const datoEngelsk = prettyPrintDato({ dato: nesteVirkedag, language: 'en' });

    const handleEndreOpplysningerClicked = () => {
        uniLogger('registrering.oppholdstillatelse.endreopplysninger.clicked');
    };

    const kontaktOpplysninger = () => {
        const telefonnummerRegistrert = telefonnummerHosKrr || telefonnummerHosNav;

        return (
            status === 'OK' && telefonnummerRegistrert ?
                <>
                    {telefonnummerHosKrr ?
                        <Kontaktinformasjon
                            telefonnummer={telefonnummerHosKrr}
                            kilde="Kontakt- og reservasjonsregisteret"
                            data-testid="kontaktinformasjonskort-krr"
                        /> : null}
                    {telefonnummerHosNav ?
                        <Kontaktinformasjon
                            telefonnummer={telefonnummerHosNav}
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
                :
                <>
                    <div style={{ display: 'flex' }}>
                        <Feilmelding data-testid="feilmelding">Ingen kontaktopplysninger funnet! / No contact details found!</Feilmelding>
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
        )
    };

    return (
        <Veilederpanel
            svg={<img src={veilederSvg} alt="veileder" className="veileder-illustrasjon" />}
            type={"plakat"}
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
            {visKontaktopplysninger ? kontaktOpplysninger() :
                <EksternLenke
                    url="https://www.nav.no/person/personopplysninger/#kontaktinformasjon"
                    tekst="Legg inn kontaktopplysninger / Enter contact details"
                    data-testid="ekstern-lenke-legg-inn-opplysninger"
                    onClick={handleEndreOpplysningerClicked}
                />}
        </Veilederpanel>
    )
};

export default OppgaveSuccess;

