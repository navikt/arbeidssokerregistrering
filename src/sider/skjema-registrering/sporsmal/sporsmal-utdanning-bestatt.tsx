import * as React from "react";
import Alternativ from "../../../komponenter/skjema/alternativ";
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from "../../../komponenter/skjema/skjema-utils";
import { Innholdstittel } from "nav-frontend-typografi";
import { Svar, UtdanningBestattSvar } from "../../../ducks/svar-utils";
import { SporsmalProps } from "../../../komponenter/skjema/sporsmal-utils";
import ReactIntl, { injectIntl } from "react-intl";
import { SkjemaGruppe } from "nav-frontend-skjema";

type Props = SporsmalProps & ReactIntl.InjectedIntlProps;

function UtdanningBestattSporsmal(props: Props) {
  const fellesProps = {
    endreSvar: props.endreSvar,
    avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
    getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
    hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
  };
  const getTekst = (kontekst: TekstKontekst) =>
    getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl, props.registeringType);

  return (
    <form className="spm-skjema">
      <SkjemaGruppe
        legend={
          <Innholdstittel tag="h1" className="spm-tittel">
            {getTekst("tittel")}
          </Innholdstittel>
        }
      >
        <div className="spm-body">
          <Alternativ svar={UtdanningBestattSvar.JA} {...fellesProps} />
          <Alternativ svar={UtdanningBestattSvar.NEI} {...fellesProps} />
        </div>
      </SkjemaGruppe>
    </form>
  );
}

export default injectIntl(UtdanningBestattSporsmal);
