import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import {
  selectSisteStillingFraAAReg,
  State as SisteArbeidsforholdState,
} from "../../../../ducks/siste-stilling-fra-aareg";
import { AppState } from "../../../../reducer";
import {
  hentStillingFraPamGittStyrkkode,
  selectSisteStillingNavnFraPam,
  selectOversettelseAvStillingFraAAReg,
  State as OversettelseAvStillingFraAARegState,
} from "../../../../ducks/oversettelse-av-stilling-fra-aareg";
import EkspanderbartInfo from "../../../../komponenter/ekspanderbartinfo/ekspanderbartInfo";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import SokeInput from "./sokeinput";
import { ingenYrkesbakgrunn, selectSisteStilling, Stilling, velgSisteStilling } from "../../../../ducks/siste-stilling";
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from "../../../../komponenter/skjema/skjema-utils";
import Alternativ from "../../../../komponenter/skjema/alternativ";
import { getDefaultSvar, hentOversattStillingFraAAReg, skalSkjuleSvaralternativer } from "./siste-stilling-utils";
import { DinSituasjonSvar, hentSvar, SisteStillingSvar, Svar } from "../../../../ducks/svar-utils";
import { SporsmalId, State as SvarState } from "../../../../ducks/svar";
import { SporsmalProps } from "../../../../komponenter/skjema/sporsmal-utils";
import { RegistreringType, selectRegistreringstatus } from "../../../../ducks/registreringstatus";
import InaktivSokeInput from "./inaktiv-soke-input";

interface SisteStillingState {
  erInputAktiv: boolean;
}

interface StateProps {
  sisteStillingFraAAReg: SisteArbeidsforholdState;
  oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
  labelTilStillingFraAAReg: string;
  sisteStilling: Stilling;
  svarState: SvarState;
  registreringType: RegistreringType;
}

interface DispatchProps {
  hentStillingFraPamGittStyrkkode: (styrk98: string | undefined) => Promise<void | unknown>;
  velgStilling: (stilling: Stilling) => void;
}

type Props = SporsmalProps & StateProps & DispatchProps & InjectedIntlProps;

class SisteStilling extends React.Component<Props, SisteStillingState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      erInputAktiv: false,
    };

    const { endreSvar, sporsmalId, sisteStilling, svarState } = props;

    if (skalSkjuleSvaralternativer(hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar)) {
      this.angiSvarPaaDetteSporsmaletSomIkkeBesvart();
    } else {
      endreSvar(sporsmalId, getDefaultSvar(sisteStilling));
    }

    this.onInputAktivert = this.onInputAktivert.bind(this);
    this.onStillingEndret = this.onStillingEndret.bind(this);
  }

  skalViseStillingsfelt() {
    return this.props.hentAvgittSvar(this.props.sporsmalId) !== SisteStillingSvar.HAR_IKKE_HATT_JOBB;
  }

  angiSvarPaaDetteSporsmaletSomIkkeBesvart() {
    const { svarState, endreSvar, sporsmalId } = this.props;
    if (hentSvar(svarState, SporsmalId.sisteStilling) !== SisteStillingSvar.INGEN_SVAR) {
      endreSvar(sporsmalId, SisteStillingSvar.INGEN_SVAR);
    }
  }

  onInputAktivert() {
    this.setState({
      erInputAktiv: true,
    });
  }

  onStillingEndret(stilling: Stilling) {
    this.props.velgStilling(stilling);
    this.setState({
      erInputAktiv: false,
    });
  }

  render() {
    const {
      sisteStilling,
      intl,
      endreSvar,
      sporsmalId,
      hentAvgittSvar,
      velgStilling,
      oversettelseAvStillingFraAAReg,
      svarState,
      registreringType,
    } = this.props;

    const alternativProps = {
      intl,
      getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
      hentAvgittSvar: () => hentAvgittSvar(sporsmalId),
    };

    const skjulSvaralternativer = skalSkjuleSvaralternativer(
      hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar
    );

    const alternativer = skjulSvaralternativer ? null : (
      <>
        <Alternativ
          svar={SisteStillingSvar.HAR_HATT_JOBB}
          {...alternativProps}
          avgiSvar={(svar: Svar) => {
            endreSvar(sporsmalId, svar);
            velgStilling(hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg.data));
          }}
        />
        <Alternativ
          svar={SisteStillingSvar.HAR_IKKE_HATT_JOBB}
          {...alternativProps}
          avgiSvar={(svar: Svar) => {
            endreSvar(sporsmalId, svar);
            velgStilling(ingenYrkesbakgrunn);
          }}
        />
      </>
    );

    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(sporsmalId, kontekst, intl, registreringType);

    const sokeInput = this.skalViseStillingsfelt() ? (
      this.state.erInputAktiv ? (
        <SokeInput defaultStilling={sisteStilling} onChange={this.onStillingEndret} />
      ) : (
        <InaktivSokeInput stilling={sisteStilling} onInputAktivert={this.onInputAktivert} />
      )
    ) : null;

    return (
      <>
        <form className="spm-skjema">
          <fieldset className="skjema__fieldset">
            <legend className="skjema__legend spm-hode">
              <Innholdstittel tag="h1" className="spm-tittel">
                {getTekst("tittel")}
              </Innholdstittel>
              <Normaltekst className="spm-beskrivelse">
                <span dangerouslySetInnerHTML={{ __html: intl.messages["siste-arbeidsforhold.ingress"] }} />
              </Normaltekst>
            </legend>
            <div className="spm-body">{alternativer}</div>
          </fieldset>
        </form>
        <div className="spm-valg">
          {sokeInput}
          <EkspanderbartInfo tittelId="siste-arbeidsforhold.info.tittel" className="ekspanderbartinfo">
            <Normaltekst>
              <FormattedMessage id="siste-arbeidsforhold.info.tekst" />
            </Normaltekst>
          </EkspanderbartInfo>
        </div>
      </>
    );
  }
}

//  <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>

const mapStateToProps = (state: AppState) => ({
  sisteStillingFraAAReg: selectSisteStillingFraAAReg(state),
  oversettelseAvStillingFraAAReg: selectOversettelseAvStillingFraAAReg(state),
  labelTilStillingFraAAReg: selectSisteStillingNavnFraPam(state),
  sisteStilling: selectSisteStilling(state),
  svarState: state.svar,
  registreringType: selectRegistreringstatus(state).data.registreringType,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
  velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SisteStilling));
