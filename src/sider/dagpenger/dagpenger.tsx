import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import './dagpenger.less';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RouteComponentProps, withRouter } from 'react-router';
import { MatchProps } from '../../utils/utils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
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

        const fornavn = this.props.brukersNavn.data.fornavn;
        let veilederpanelType: 'normal' | 'plakat' = 'plakat';
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
                            <FormattedMessage id={'dagpenger-veilederpanel-tittel'} values={{ fornavn }}/>
                        </Undertittel>

                        <Normaltekst>
                            <FormattedMessage id="dagpenger-veilederpanel-tekst"/>
                        </Normaltekst>

                    </Veilederpanel>
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
