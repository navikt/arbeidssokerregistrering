import { uniLogger } from "../metrikker/uni-logger";

export const antallDagerTilMaksdato = (naa: Date, maksdato: Date): number => {
  const diff = maksdato.getTime() - naa.getTime();
  const antallDager = Math.floor(diff / 1000 / 60 / 60 / 24);

  uniLogger("arbeidssøkerregistrering.antall-dager-til-maksdato.data", {
    maksdato,
    antallDagerTilMaksdato: antallDager,
  });
  return antallDager;
};
