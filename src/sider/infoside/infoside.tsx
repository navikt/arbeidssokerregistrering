import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import './infoside.less';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RouteComponentProps, withRouter } from 'react-router';
import { hentFornavn, MatchProps } from '../../utils/utils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import InfoViser from '../../komponenter/info-viser/info-viser';
import { Link } from 'react-router-dom';
import { OPPSUMMERING_PATH, DITT_SYKEFRAVAER_URL } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { connect } from 'react-redux';

const veilederSvg = require('./veileder-syfo.svg');

interface StateProps {
    brukersNavn: BrukersNavnState;
}

type Props = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class Infoside extends React.Component<Props> {

    handleTilbakeBtnClick = (): void => {
        this.props.history.goBack();
    }

    render() {

        const fornavn = hentFornavn(this.props.brukersNavn.data.name);
        let veilederpanelType;
        let veilederpanelKompakt;

        if (window.matchMedia('(min-width: 768px)').matches) {
            veilederpanelType = 'normal';
            veilederpanelKompakt = true;
        } else {
            veilederpanelType = 'plakat';
            veilederpanelKompakt = false;
        }

        return (
            <>
                <div className="infoside--forste-rad__bakgrunn"/>
                <div className="infoside--forste-rad">
                    <Veilederpanel
                        type={veilederpanelType}
                        svg={<img
                            src={veilederSvg}
                            alt="Informasjon"
                            className="nav-veilederpanel__illustrasjon"
                        />}
                        kompakt={veilederpanelKompakt}
                    >
                        <Undertittel>
                            <FormattedMessage id={'infoside-veilederpanel-tittel'} values={{ fornavn }}/>
                        </Undertittel>

                        <Normaltekst>
                            <FormattedMessage id="infoside-veilederpanel-tekst"/>
                        </Normaltekst>

                    </Veilederpanel>
                </div>

                <div className="infoside--andre-rad">
                    <div className="infoside--andre-rad__container">
                        <Systemtittel className="infoside--andre-rad__tittel">
                            <FormattedMessage id="infoside-tilbake-full-stilling-tittel"/>
                        </Systemtittel>
                        <ul>
                            <li className="blokk-xs">
                                <FormattedMessage id="infoside-tilbake-full-stilling-tekst-1"/>
                            </li>
                            <li className="blokk-xs">
                                <FormattedMessage id="infoside-tilbake-full-stilling-tekst-2"/>
                            </li>
                        </ul>
                    </div>
                    <hr className="infoside--andre-rad__divider"/>
                    <InfoViser
                        tekstId="infoside-tilbake-full-stilling-info"
                        className="infoside--andre-rad__info-viser"
                    />
                </div>

                <div className="infoside--tredje-rad">
                    <Systemtittel className="blokk-m infoside--tredje-rad__tittel">
                        <FormattedMessage id="infoside-trenger-plan-tittel"/>
                    </Systemtittel>

                    <div className="infoside--tredje-rad__knapper">
                        <a className="knapp" href={DITT_SYKEFRAVAER_URL}>
                            <FormattedMessage id="infoside-knapp-uenig"/>
                        </a>
                        <Link to={OPPSUMMERING_PATH} className="knapp knapp--hoved">
                            <FormattedMessage id="infoside-knapp-enig"/>
                        </Link>
                    </div>
                </div>

                <LenkeTilbake
                    onClick={this.handleTilbakeBtnClick}
                />
            </>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(injectIntl(Infoside)));