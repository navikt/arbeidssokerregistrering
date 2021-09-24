import React from "react";
import { amplitudeLogger } from "../../../metrikker/amplitude-utils";
import { erEksperimentkontor } from "../../../utils/utils";
import { VTA_REGISTRERING_FULLORT } from "../../../utils/konstanter";
import { erIFSS } from "../../../utils/fss-utils";

interface Props {
  erSykmeldt: boolean;
  ingen_kvittering: boolean;
  geografisk_tilknytning: string;
  kommerFra?: string | null;
  erReaktivert?: boolean;
}

function SendVidereTilVta(props: Props) {
  const { erSykmeldt, ingen_kvittering, geografisk_tilknytning } = props;

  //Dersom man ikke erIFSS og tilhører eksperimenkontor og ikke erSykmeldt skal man sendes til VTA om ingen_kvittering er aktiv
  if (!erSykmeldt && !erIFSS() && ingen_kvittering && erEksperimentkontor(geografisk_tilknytning)) {
    amplitudeLogger("registrering.aktivitet", {
      aktivitet: "Redirecter til veientilarbeid",
    });
    window.location.href = VTA_REGISTRERING_FULLORT;
    return null;
  }

  return <></>;
}

export default SendVidereTilVta;
