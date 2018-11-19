import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../../komponenter/lenke-med-chevron/lenke-med-chevron';
import { InjectedIntlProps } from 'react-intl';
import Feilmelding from './feilmelding';
import utropstegnSvg from '../../sider/fullfor/utropstegn.svg';
import './feilmelding-mangler-arbeidstillatelse.less';

class FeilmeldingManglerArbeidstillatelse extends React.Component<InjectedIntlProps> {

    render() {

        const lenkeUrl = this.props.intl.messages['feilmelding-mangler-arbeidstillatelse-lenke-url'];

        return (
            <Feilmelding bilde={utropstegnSvg} className="feilmelding-mangler-arbeidstillatelse">
                <Normaltekst className="blokk-s">
                    <FormattedMessage id="feilmelding-mangler-arbeidstillatelse-innhold"/>
                </Normaltekst>
                <LenkeMedChevron path={lenkeUrl}>
                    <FormattedMessage id="feilmelding-mangler-arbeidstillatelse-lenke-tekst"/>
                </LenkeMedChevron>
            </Feilmelding>
        );

    }
}

export default FeilmeldingManglerArbeidstillatelse;