import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import Alertstripe from "nav-frontend-alertstriper";
import Veilederpanel from "nav-frontend-veilederpanel";
import { uniLogger } from "../../metrikker/uni-logger";
import veilederSvg from "./veileder-mann.svg";
import KontaktOpplysninger from "./kontaktopplysninger";
import KontaktOpplysningerMangler from "./kontaktopplysninger-mangler";

interface Props {
  telefonnummerHosKrr: string | null;
  telefonnummerHosNav: string | null;
}

const OppgaveErrorAlleredeOpprettet = ({ telefonnummerHosKrr, telefonnummerHosNav }: Props) => {
  uniLogger("registrering.utvandret.kontaktmeg.alleredeopprettet");

  const handleEndreOpplysningerClicked = () => {
    uniLogger("registrering.utvandret.kontaktmeg.alleredeopprettet.endreopplysninger");
  };

  const telefonnummerRegistrert = telefonnummerHosKrr || telefonnummerHosNav;

  return (
    <Veilederpanel
      svg={<img src={veilederSvg} alt="veileder" className="veileder-illustrasjon" />}
      type={"plakat"}
      kompakt
    >
      <Alertstripe type="info" data-testid="alertstripe">
        <Undertittel>Vennligst vent / Please wait</Undertittel>
      </Alertstripe>
      <p>
        Du har allerede bedt oss kontakte deg. Vi tar kontakt i løpet av to arbeidsdager regnet fra den første
        meldingen. Pass på at kontaktopplysningene dine er oppdatert slik at vi kan nå deg.
      </p>
      <p>
        We have received your first message. We will contact you within two working days from the first message. Please
        make sure your contact details are updated.
      </p>
      {telefonnummerRegistrert ? (
        <KontaktOpplysninger
          telefonnummerHosKrr={telefonnummerHosKrr}
          telefonnummerHosNav={telefonnummerHosNav}
          handleEndreOpplysningerClicked={handleEndreOpplysningerClicked}
        />
      ) : (
        <KontaktOpplysningerMangler handleEndreOpplysningerClicked={handleEndreOpplysningerClicked} />
      )}
    </Veilederpanel>
  );
};

export default OppgaveErrorAlleredeOpprettet;
