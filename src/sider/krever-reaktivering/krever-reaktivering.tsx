import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../../reducer';
import { reaktiverBruker, State as ReaktiverBrukerState } from '../../ducks/reaktiverbruker';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import ReaktiveringFeilhandtering from './feilhandtering/reaktivering-feilhandtering';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { MatchProps } from '../../utils/utils';
import { DU_ER_NA_REGISTRERT_PATH, DITT_NAV_URL } from '../../utils/konstanter';
import Banner from '../../komponenter/banner/banner';
import {
    Data as RegistreringstatusData,
    selectRegistreringstatus
} from '../../ducks/registreringstatus';

import handinfoSvg from './handinfo.svg';
import './krever-reaktivering.less';
import { lagAktivitetsplanUrl } from '../../utils/url-utils';
import { erIFSS } from '../../utils/fss-utils';

interface State {
    reaktivererBruker: boolean;
}

interface StateProps {
    reaktiverBrukerData: ReaktiverBrukerState;
    registreringstatusData: RegistreringstatusData;
}

interface DispatchProps {
    onReaktiverBruker: () => Promise<void | {}>;
}

type Props = RouteComponentProps<MatchProps> & StateProps & DispatchProps;

class KreverReaktivering extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            reaktivererBruker: false
        };
        this.reaktiverBrukerOnClick = this.reaktiverBrukerOnClick.bind(this);
    }

    reaktiverBrukerOnClick() {
        const {onReaktiverBruker, history} = this.props;
        this.setState({reaktivererBruker: true});

        onReaktiverBruker()
            .then((res) => {
                if (!!res) {
                    history.push(DU_ER_NA_REGISTRERT_PATH);
                }
            });
    }

    render() {

        if (this.state.reaktivererBruker) {
            const {reaktiverBrukerData} = this.props;

            return (
                <Innholdslaster
                    feilmeldingKomponent={<ReaktiveringFeilhandtering/>}
                    avhengigheter={[reaktiverBrukerData]}
                    loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
                />
            );
        }

        return (
            <>
                <Banner/>
                <div className="limit">
                    <section className="krever-reaktivering">
                        <Innholdstittel className="krever-reaktivering__tittel">
                            <FormattedMessage id="krever-reaktivering-tittel"/>
                        </Innholdstittel>
                        <div className="krever-reaktivering__infopanel">
                            <div className="krever-reaktivering__handinfo-ikon">
                                <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon"/>
                            </div>
                            <div className="krever-reaktivering__tekster">
                                <Normaltekst>
                                    <FormattedMessage id="krever-reaktivering-boks-tekst"/>
                                </Normaltekst>
                            </div>
                        </div>
                        <div className="krever-reaktivering__aksjonspanel">
                            <Normaltekst>
                                <FormattedMessage id="krever-reaktivering-undertittel"/>
                            </Normaltekst>
                            <div className="lenke-avbryt-wrapper">
                                <KnappBase
                                    type="hoved"
                                    onClick={this.reaktiverBrukerOnClick}
                                >
                                    <FormattedMessage id="ja"/>
                                </KnappBase>
                            </div>
                            <a
                                href={erIFSS() ? lagAktivitetsplanUrl() : DITT_NAV_URL}
                                className="lenke lenke-avbryt typo-element"
                            >
                                <FormattedMessage id="avbryt-lenke"/>
                            </a>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    reaktiverBrukerData: state.reaktiverBruker,
    registreringstatusData: selectRegistreringstatus(state).data,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onReaktiverBruker: () => dispatch(reaktiverBruker()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    KreverReaktivering
));
