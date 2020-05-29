import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel, EtikettLiten } from 'nav-frontend-typografi';

import './kontaktinformasjon.less';
import EksternLenke from '../ekstern-lenke/ekstern-lenke';

interface Props {
    telefonnummer: string | undefined;
    kilde: string;
}

class Kontaktinformasjon extends React.Component<Props> {
    render() {
        const { telefonnummer, kilde, ...children } = this.props;
        return (
            <Panel border className="kontaktinfo-kort" {...children}>
                <Undertittel>{`Telefonnummer lagret hos ${kilde}`}</Undertittel>
                <Undertittel className="informasjon">{telefonnummer}</Undertittel>
                <EtikettLiten>{`Kilde: ${kilde}`}</EtikettLiten>
            </Panel>
        );
    }
}

interface Kontaktopplysninger {
    telefonnummerHosKrr: string | null;
    telefonnummerHosNav: string | null;
    handleEndreOpplysningerClicked: () => void;
}

const KontaktOpplysninger = ({telefonnummerHosKrr, telefonnummerHosNav, handleEndreOpplysningerClicked}: Kontaktopplysninger) => (
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
);

export default KontaktOpplysninger;
