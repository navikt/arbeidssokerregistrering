import * as React from 'react';
import Banner from '../../komponenter/banner/banner';
import utropstegnSvg from '../fullfor/utropstegn.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../../komponenter/lenke-med-chevron/lenke-med-chevron';
import { injectIntl } from 'react-intl';
import './info-for-ikke-arbeidssoker-uten-oppfolging.less';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

class InfoForIkkeArbeidssokerUtenOppfolging extends React.Component<InjectedIntlProps> {
    render() {

        const lenkeUrl = this.props.intl.messages['info-for-ikke-arbeidssoker-uten-oppfolging-lenke-url'];

        return (
            <>
                <Banner/>
                <div className="info-for-ikke-arbeidssoker">
                    <div className="info-boks">
                        <img
                            src={utropstegnSvg}
                            alt="Informasjon"
                            className="info-boks--bilde"
                        />
                        <div className="info-boks--innhold">
                            <Normaltekst className="blokk-m">
                                <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-innhold"/>
                            </Normaltekst>
                            <LenkeMedChevron path={lenkeUrl}>
                                <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-lenke-tekst"/>
                            </LenkeMedChevron>
                        </div>
                    </div>
                </div>
            </>
        );

    }
}

export default injectIntl(InfoForIkkeArbeidssokerUtenOppfolging);
