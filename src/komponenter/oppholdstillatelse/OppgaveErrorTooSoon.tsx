import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { State as KontaktinfoState } from '../../ducks/kontaktinfo';
import { Kontaktinformasjon } from './'
import EksternLenke from '../ekstern-lenke/ekstern-lenke';
import { uniLogger } from '../../metrikker/uni-logger';

import veilederSvg from './veileder-mann.svg';
import './kontakt-meg-melding.less';

interface Props {
    kontaktinfo: KontaktinfoState;
};

class OppgaveErrorTooSoon extends React.Component<Props> {
    render() {
        const { kontaktinfo: { status: kontaktinfoStatus, data: kontaktinfo } } = this.props;
        const telefonnummerFinnes = kontaktinfo.telefonnummerHosKrr || kontaktinfo.telefonnummerHosNav;
        uniLogger('registrering.oppholdstillatelse.kontaktmeg.vennligstvent');

        return (
            <div className="blokk-m">
                <Veilederpanel
                    svg={<img src={veilederSvg} alt="" className="nav-veilederpanel-illustrasjon" />}
                    type={"plakat"}
                    kompakt
                >
                    <Alertstripe type="info">
                        <Undertittel>Vennligst vent / Please wait</Undertittel>
                    </Alertstripe>
                    <p className="blokk-m">
                        <Normaltekst>Du har allerede bedt oss kontakte deg.</Normaltekst>
                        <Normaltekst>Vi tar kontakt i løpet av to arbeidsdager regnet fra den første meldingen.</Normaltekst>
                        <Normaltekst>Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.</Normaltekst>
                    </p>
                    <p className="blokk-m">
                        <Normaltekst>We have received your first message.</Normaltekst>
                        <Normaltekst>We will contact you within two working days from the first message.</Normaltekst>
                        <Normaltekst>Please make sure your contact details are updated.</Normaltekst>
                    </p>
                    {kontaktinfoStatus === 'OK' && telefonnummerFinnes ?
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
    }
};

export default OppgaveErrorTooSoon;

