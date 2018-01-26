import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import KnappFullfor from '../skjema/knapp-fullfor';
import EkspanderbartInfo from '../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { Checkbox } from 'nav-frontend-skjema';
import { AVBRYT_PATH, REGVELLYKKET_PATH } from '../utils/konstanter';
import { AppState } from '../reducer';
import { utforRegistrering, selectRegistrerBruker, State as RegistrerBrukerState } from '../ducks/registrerbruker';
import { getIntlMessage } from '../utils/utils';
import Feilmelding from './feilmelding';
import Innholdslaster from '../innholdslaster/innholdslaster';

interface StateProps {
    registrerBruker: RegistrerBrukerState;
}

interface DispatchProps {
    onRegistrerBruker: () => Promise<void | {}>;
}

interface EgenStateProps {
    markert: boolean;
}

type EgenProps = RouteComponentProps<MatchProps> & StateProps & DispatchProps & InjectedIntlProps;

class Fullfor extends React.PureComponent<EgenProps, EgenStateProps> {
    constructor(props: EgenProps) {
        super(props);
        this.state = {
            markert: false,
        };
        this.settMarkert = this.settMarkert.bind(this);
        this.registrerBrukerOnClick = this.registrerBrukerOnClick.bind(this);
    }

    registrerBrukerOnClick() {
        this.props.onRegistrerBruker()
            .then((res) => {
                if (!!res) {
                    this.props.history.push(`${REGVELLYKKET_PATH}`);
                }
            });
    }

    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });
    }

    render() {
        const {registrerBruker, history, intl} = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} />}
                avhengigheter={[registrerBruker]}
                storrelse="XXL"
            >
                <PanelBlokkGruppe
                    knappAksjoner={[
                        <Knapp
                            key="1"
                            type="standard"
                            className="knapp mmr"
                            onClick={() => {
                                history.push(`${AVBRYT_PATH}`);
                            }}
                        >
                            <Normaltekst>{getIntlMessage(intl.messages, 'knapp-avbryt')}</Normaltekst>
                        </Knapp>,
                        <KnappFullfor
                            intl={intl}
                            key="2"
                            disabled={!this.state.markert}
                            onClick={this.registrerBrukerOnClick}
                        />
                    ]}
                >
                    <PanelBlokk
                        tittelId="fullfor-header"
                        tittelCssNavnVariant="oransje-variant"
                    >
                        <Normaltekst>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: getIntlMessage(intl.messages, 'fullfor-ingress')
                                }}
                            />
                        </Normaltekst>
                        <ul className="typo-normal blokk pml mmt">
                            <li>{getIntlMessage(intl.messages, 'fullfor-liste-1')}</li>
                            <li>{getIntlMessage(intl.messages, 'fullfor-liste-2')}</li>
                            <li>{getIntlMessage(intl.messages, 'fullfor-liste-3')}</li>
                            <li>{getIntlMessage(intl.messages, 'fullfor-liste-4')}</li>
                        </ul>
                        <EkspanderbartInfo tittelId="fullfor-les-mer">
                            <Normaltekst>
                                {getIntlMessage(intl.messages, 'fullfor-les-mer-beskrivelse')}
                            </Normaltekst>
                        </EkspanderbartInfo>
                    </PanelBlokk>
                    <PanelBlokk cssVariant="oransje-variant padding-vertikalt-small">
                        <Checkbox
                            onChange={this.settMarkert}
                            checked={this.state.markert}
                            label={getIntlMessage(intl.messages, 'fullfor-sjekkboks')}
                            id="fullfor-sjekkboks"
                        />
                    </PanelBlokk>
                </PanelBlokkGruppe>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    registrerBruker: selectRegistrerBruker(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: () => dispatch(utforRegistrering()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Fullfor)
);
