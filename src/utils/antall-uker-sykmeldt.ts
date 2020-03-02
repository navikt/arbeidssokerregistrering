import { Frontendlogger } from '../middleware/metrics-middleware';

export const antallUkerSykmeldt = (naa: Date, maksdato: Date): number => {
    const diff = maksdato.getTime() - naa.getTime();
    const antallUkerTilMaksdato = diff / 1000 / 60 / 60 / 24 / 7;
    const ukerSykmeldt = Math.floor(52 - antallUkerTilMaksdato);


    const frontendlogger: Frontendlogger = (window as any).frontendlogger; // tslint:disable-line
    if (frontendlogger) {

        const message = `Uker sykmeldt: ${ukerSykmeldt}\nAntall uker til maksdato: ${antallUkerTilMaksdato}\nMaksdato: ${maksdato}\nNå-dato: ${naa}`;

        frontendlogger.info({
            message: message,
        });
    }

    return ukerSykmeldt;
};
