import * as React from 'react';
import * as classnames from 'classnames';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst, Systemtittel, Element } from 'nav-frontend-typografi';
import { VEIENTILARBEID_MED_DAGPENGER_URL, VEIENTILARBEID_URL } from '../../ducks/api';
import AvsjekkBilde from './avsjekk-bilde';
import { erIE } from '../../utils/ie-test';
import { frontendLogger } from '../../metrikker/metrics-utils';
import handinfoSvg from './clipboard.svg';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MatchProps } from '../../utils/utils';
import './registrert.less';

interface StateProps {
    state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class DuErNaRegistrert extends React.Component<AllProps> {

    render() {

        return (
            <section className={classnames('registrert', erIE() ? 'erIE' : null)}>

                <div className="registrert__avsjekk">
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id="duernaregistrert-innholdstittel"/>
                    </Systemtittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                    <div className="registrert__tekster">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id="duernaregistrert-systemtittel"/>
                        </Systemtittel>
                        <Normaltekst className="blokk">
                            <FormattedMessage id="duernaregistrert-normaltekst"/>
                        </Normaltekst>
                        <Element className="blokk-xxs">
                            <FormattedMessage id="duernaregistrert-element"/>
                        </Element>
                        <div className="registrert__knapperad">
                            <a
                                href={VEIENTILARBEID_URL}
                                className="registrert__lenke knapp knapp--standard"
                                onClick={() => {
                                    frontendLogger('registrering.ikke.vis.dagpenger.info');
                                }}
                            >
                                <FormattedMessage id="knapp-ikke-na"/>
                            </a>
                            <a
                                href={VEIENTILARBEID_MED_DAGPENGER_URL}
                                className="registrert__lenke knapp knapp--hoved"
                                onClick={() => {
                                    frontendLogger('registrering.vis.dagpenger.info');
                                }}
                            >
                                <FormattedMessage id="knapp-ja-vis-meg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));