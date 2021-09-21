import React, { useEffect } from "react";
import { amplitudeLogger } from "../../metrikker/amplitude-utils";

const SESSION_STORAGE_KEY = "arbeidssokerregistrering-kommerfra";

function setItem(value: string) {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, value);
}

function KommerFra() {
  useEffect(() => {
    const avsender = new URLSearchParams(window.location.search).get("kommerFra");
    if (avsender) {
      setItem(avsender);
      amplitudeLogger("registrering.aktivitet", {
        aktivitet: "Lagrer kommerFra",
        kommerFra: avsender,
      });
    }
  }, []);

  return <></>;
}

export default KommerFra;
