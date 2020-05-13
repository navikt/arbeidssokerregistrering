import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import virkedager from '@alheimsins/virkedager'

import prettyPrintDato from '../../utils/pretty-print-dato'
import { State as KontaktinfoState } from '../../ducks/kontaktinfo';
import { Kontaktinformasjon } from './'
import EksternLenke from '../ekstern-lenke/ekstern-lenke';
import { uniLogger } from '../../metrikker/uni-logger';

import veilederSvg from './veileder-mann.svg';
import './kontakt-meg-melding.less';

interface Props {
    kontaktinfo: KontaktinfoState;
};

class OppgaveSuccess extends React.Component<Props> {
    private telfonnummerLogger(kontaktinfo) {
        if (kontaktinfo.telefonnummerHosKrr && kontaktinfo.telefonnummerHosNav) {
            uniLogger('registrering.oppholdstillatelse.kontaktmeg.telefonnummer.krrognav');
        } else if (kontaktinfo.telefonnummerHosKrr) {
            uniLogger('registrering.oppholdstillatelse.kontaktmeg.telefonnummer.krr');
        } else if (kontaktinfo.telefonnummerHosNav) {
            uniLogger('registrering.oppholdstillatelse.kontaktmeg.telefonnummer.nav');
        } else {
            uniLogger('registrering.oppholdstillatelse.kontaktmeg.telefonnummer.ingen');
        }
    };

    render() {
        const { kontaktinfo: { status: kontaktinfoStatus, data: kontaktinfo } } = this.props;
        const idag = new Date();
        const nesteVirkedag = virkedager(idag, 2);
        const datoNorsk = prettyPrintDato({ dato: nesteVirkedag, language: 'no' });
        const datoEngelsk = prettyPrintDato({ dato: nesteVirkedag, language: 'en' });
        const telefonnummerRegistrert = kontaktinfo.telefonnummerHosKrr || kontaktinfo.telefonnummerHosNav
        uniLogger('registrering.oppholdstillatelse.kontaktmeg.success');
        this.telfonnummerLogger(kontaktinfo);

        return (
            <div className="blokk-m">
                <Veilederpanel
                    svg={<img src={veilederSvg} alt="" className="nav-veilederpanel-illustrasjon" />}
                    type={"plakat"}
                    kompakt
                >
                    <Alertstripe type="suksess">
                        <Undertittel>Henvendelse mottatt / Request received</Undertittel>
                    </Alertstripe>
                    <p className="blokk-m">
                        <Undertittel>Viktig / Important:</Undertittel>
                        <Normaltekst>Vi kontakter deg innen utgangen av {datoNorsk}.</Normaltekst>
                        <Normaltekst>Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.</Normaltekst>
                    </p>
                    <p className="blokk-m">
                        <Normaltekst>We will contact you before the end of {datoEngelsk}.</Normaltekst>
                        <Normaltekst>Please make sure your contact details are updated.</Normaltekst>
                    </p>
                    {kontaktinfoStatus === 'OK' && telefonnummerRegistrert ?
                        <>
                            {kontaktinfo.telefonnummerHosKrr ?
                                <Kontaktinformasjon
                                    telefonnummer={kontaktinfo.telefonnummerHosKrr}
                                    kilde="Kontakt- og reservasjonsregisteret"
                                /> : null}
                            {kontaktinfo.telefonnummerHosNav ?
                                <Kontaktinformasjon
                                    telefonnummer={kontaktinfo.telefonnummerHosNav}
                                    kilde="NAV"
                                /> : null}
                            <EksternLenke
                                url="https://www.nav.no/person/personopplysninger/#kontaktinformasjon"
                                tekst="Endre lagrede opplysninger" />
                        </>
                        :
                        <>
                            <p>
                                <Normaltekst>Ingen kontaktinformasjon funnet.</Normaltekst>
                            </p>
                            <EksternLenke
                                url="https://www.nav.no/person/personopplysninger/#kontaktinformasjon"
                                tekst="Legg inn opplysninger" />
                        </>
                    }
                </Veilederpanel>
            </div>
        )
    };
};

export default OppgaveSuccess;

