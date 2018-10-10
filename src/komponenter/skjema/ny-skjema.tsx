//tslint:disable
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import LenkeAvbryt from '../knapper/lenke-avbryt';
import LenkeTilbake from '../knapper/lenke-tilbake';
import LenkeNeste from '../knapper/lenke-neste';
import Animasjon from '../../sider/skjema-registrering/animasjon';
import ResponsivSide from '../side/responsiv-side';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { RouteComponentProps } from 'react-router';
import { MatchProps } from '../../utils/utils';
import { getAlleSporsmalSomIkkeSkalBesvares, isNumber, SkjemaConfig } from './skjema-utils';
import { Svar } from '../../ducks/svar-utils';

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

interface OwnProps {
    children: React.ReactElement<{sporsmalId: SporsmalId}>[];
    config: SkjemaConfig;
    baseUrl: string;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class NySkjema extends React.Component<Props> {

    handleNesteBtnClick = (): void => {

    };

    finnGjeldendeSporsmal = (): React.ReactElement<any> => {

        const plassering = this.finnGjeldendeSporsmalPlassering();

        if (!this.props.children || plassering < 0 || plassering > this.props.children.length) {
            return (<p>Spørsmålet finnes ikke</p>);
        }

        return this.props.children[plassering];
    };

    finnGjeldendeSporsmalPlassering = (): number => {
        const plassering = Number.parseInt(this.props.match.params.id, 10);
        return isNumber(plassering) ? plassering : -1;
    };

    finnNesteHref = (): string => {

        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering();

        const foregaendeSporsmalIder =
            this.getSporsmalIder().filter((sporsmalId, indeks) => indeks <= gjeldendeSporsmalPlassering);

        const sporsmalIderSomIkkeSkalBesvares =
            getAlleSporsmalSomIkkeSkalBesvares(foregaendeSporsmalIder, this.props.svarState, this.props.config);

        const sporsmalIder = this.getSporsmalIder();

        for (let i = gjeldendeSporsmalPlassering + 1; i < sporsmalIder.length; i++) {

            if (!sporsmalIderSomIkkeSkalBesvares.includes(sporsmalIder[i])) {
                return this.props.baseUrl + '/' + i;
            }

        }

        return this.props.baseUrl + '/oppsummering';

    };

    getSporsmalIder = (): SporsmalId[] => {
        return this.props.children.map(child => child.props.sporsmalId);
    };

    render() {
        const advarselElement = false ? (null) : (
            <NavAlertStripe type="advarsel" className="spm-advarsel">
                <FormattedMessage id="skjema.alternativ.advarsel.tekst"/>
            </NavAlertStripe>
        );

        const nesteHref = this.finnNesteHref();

        const gjeldendeSporsmal = this.finnGjeldendeSporsmal();

        return (
            <ResponsivSide> {/* TODO FO-1547 Sleng på IE-classnames? */}
                {gjeldendeSporsmal}
                {advarselElement}
                <Animasjon flag={this.props.match.params.id}>
                    <LenkeNeste
                        onClick={this.handleNesteBtnClick}
                        href={nesteHref}
                        erAktiv={true}
                    />
                    {/*this.props.sporsmalErBesvart(this.getSporsmalId(gjeldendeSporsmal))*/}
                    <LenkeTilbake
                        onClick={() => this.props.history.goBack()}
                    />
                    <LenkeAvbryt/>
                </Animasjon>
            </ResponsivSide>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NySkjema));
