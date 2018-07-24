import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Banner from '../../komponenter/banner/banner';
import { DITTNAV_URL } from '../../ducks/api';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { reaktiverBruker, State as ReaktiverBrukerState } from '../../ducks/reaktiverbruker';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import FeilmeldingGenerell from '../../komponenter/feilmelding/feilmelding-generell';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import KnappBase from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { DUERNAREGISTRERT_PATH } from '../../utils/konstanter';

// tslint:disable

const handinfoSvg = require('./handinfo.svg');

interface StateProps {
    reaktiverBrukerData: ReaktiverBrukerState;
}

interface DispatchProps {
    onReaktiverBruker: () => Promise<void | {}>;
}
type Props = RouteComponentProps<MatchProps> & StateProps & DispatchProps;

class KreverReaktivering extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.reaktiverBrukerOnClick = this.reaktiverBrukerOnClick.bind(this);
    }

    reaktiverBrukerOnClick() {
        const {onReaktiverBruker, history} = this.props;
        onReaktiverBruker()
            .then((res) => {
                if (!!res) {
                    history.push(DUERNAREGISTRERT_PATH);
                }
            });
    }

    render() {
        const {reaktiverBrukerData} = this.props;

        return (
            <>
            <Banner/>
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell/>}
                avhengigheter={[reaktiverBrukerData]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
            >
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
                        <div className={'knapper-vertikalt'}>
                            <KnappBase
                                type="hoved"
                                onClick={this.reaktiverBrukerOnClick}
                            >
                                <FormattedMessage id="ja"/>
                            </KnappBase>
                            <a href={DITTNAV_URL} className="lenke-avbryt typo-element">
                                <FormattedMessage id="avbryt-lenke"/>
                            </a>
                        </div>
                    </div>
                </section>
            </Innholdslaster>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    reaktiverBrukerData: state.reaktiverBruker,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onReaktiverBruker: () => dispatch(reaktiverBruker()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    KreverReaktivering
));
