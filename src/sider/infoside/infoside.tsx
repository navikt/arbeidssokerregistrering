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
import { OPPSUMMERING_PATH } from '../../utils/konstanter';
import { DITT_SYKEFRAVAER_URL } from '../../ducks/api';
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

        return (
            <>
                <LenkeTilbake
                    onClick={this.handleTilbakeBtnClick}
                />
                <div className="infoside--forste-rad">

                    <Veilederpanel
                        type="normal"
                        svg={<img
                            src={veilederSvg}
                            alt="Informasjon"
                            className="nav-veilederpanel__illustrasjon"
                        />}
                        kompakt={true}
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
                    <div className="infoside-tilbake-full-stilling-container">
                        <Systemtittel>
                            <FormattedMessage id="infoside-tilbake-full-stilling-tittel"/>
                        </Systemtittel>
                        <ul>
                            <li><FormattedMessage id="infoside-tilbake-full-stilling-tekst-1"/></li>
                            <li><FormattedMessage id="infoside-tilbake-full-stilling-tekst-2"/></li>
                        </ul>
                        <hr className="infoside-tilbake-full-stilling-container--divider"/>
                        <InfoViser tekstId="infoside-tilbake-full-stilling-info"/>
                    </div>
                </div>

                <div className="infoside--tredje-rad">

                    <Systemtittel>
                        <FormattedMessage id="infoside-trenger-plan-tittel"/>
                    </Systemtittel>

                    <Normaltekst>
                        <FormattedMessage id="infoside-trenger-plan-tekst"/>
                    </Normaltekst>

                    <div className="infoside--knapper">
                        <a className="knapp knapp--hoved" href={DITT_SYKEFRAVAER_URL}>
                            <FormattedMessage id="infoside-knapp-tilbake-til-sykefravaer"/>
                        </a>
                        <Link to={OPPSUMMERING_PATH} className="knapp">
                            <FormattedMessage id="infoside-knapp-lag-plan"/>
                        </Link>
                    </div>

                </div>

            </>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(injectIntl(Infoside)));