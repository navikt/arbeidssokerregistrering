import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {AppState} from "../../reducer";
import {endreSvarAction} from "../../ducks/svar";
import LenkeAvbryt from "../knapper/lenke-avbryt";
import LenkeTilbake from "../knapper/lenke-tilbake";
import LenkeNeste from "../knapper/lenke-neste";
import Animasjon from "../../sider/skjema-registrering/animasjon";
import ResponsivSide from "../side/responsiv-side";
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';

interface StateProps {}
interface DispatchProps {}
type Props = StateProps & DispatchProps & InjectedIntlProps;

class NySkjema extends React.Component<Props> {
    render() {
        const advarselElement = false ? (null) : (
            <NavAlertStripe type="advarsel" className="spm-advarsel">
                <FormattedMessage id="skjema.alternativ.advarsel.tekst"/>
            </NavAlertStripe>
        );

        return (
            <ResponsivSide> {/* TODO FO-1547 Sleng på IE-classnames? */}
                {gjeldendeSporsmalComponent}
                {advarselElement}
                <Animasjon flag={this.props.gjeldendeSporsmal}>
                    <LenkeNeste
                        onClick={() => this.nesteButtonClick()}
                        href={href}
                        erAktiv={this.props.sporsmalErBesvart(this.getSporsmalId(gjeldendeSporsmal))}
                    />
                    <LenkeTilbake
                        onClick={() => gaaTilbake()}
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
