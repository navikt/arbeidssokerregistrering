import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import Alertstripe from "nav-frontend-alertstriper";
import Veilederpanel from "nav-frontend-veilederpanel";
import { uniLogger } from "../../metrikker/uni-logger";
import veilederSvg from "./veileder-mann.svg";
import "./kontakt-meg.less";

const OppgaveError = () => {
  uniLogger("registrering.utvandret.kontaktmeg.error");

  return (
    <Veilederpanel
      svg={<img src={veilederSvg} alt="veilder" className="veileder-illustrasjon" />}
      type={"plakat"}
      kompakt
    >
      <Alertstripe type="feil" data-testid="alertstripe">
        <Undertittel>Noe gikk galt / We're having trouble</Undertittel>
      </Alertstripe>
      <p>
        Vi klarte ikke å ta imot henvendelsen din. Vennligst forsøk igjen senere. Opplever du dette flere ganger kan du
        ringe oss på <strong>55 55 33 33</strong>.
      </p>
      <p>
        We’re having trouble with your request right now. Please try again later. If you are still experiencing
        problems, you can call us on <strong>55 55 33 33</strong>.
      </p>
    </Veilederpanel>
  );
};

export default OppgaveError;
