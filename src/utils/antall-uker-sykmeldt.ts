export const antallUkerSykmeldt = (naa: Date, maksdato: Date): number => {
    const diff = maksdato.getTime() - naa.getTime();
    const antallUkerTilMaksdato = diff / 1000 / 60 / 60 / 24 / 7;
    return Math.floor(52 - antallUkerTilMaksdato);
};
