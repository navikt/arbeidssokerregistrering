import { Frontendlogger } from '../middleware/metrics-middleware';
import { uniLogger } from '../metrikker/uni-logger';

export const antallUkerSykmeldt = (naa: Date, maksdato: Date): number => {
    const diff = maksdato.getTime() - naa.getTime();
    const antallTimerTilMaksdato = diff / 1000 / 60 / 60;
    const antallDagerTilMaksdato = diff / 1000 / 60 / 60 / 24;
    const antallUkerTilMaksdato = diff / 1000 / 60 / 60 / 24 / 7;
    const ukerSykmeldt = Math.floor(52 - antallUkerTilMaksdato);

    uniLogger('arbeidssøkerregistrering.antall-uker-sykmeldt.data', {maksdato, antallUkerTilMaksdato, antallDagerTilMaksdato, antallTimerTilMaksdato, ukerSykmeldt});

    const frontendlogger: Frontendlogger = (window as any).frontendlogger; // tslint:disable-line
    if (frontendlogger && frontendlogger.info) {
        const message = `Uker sykmeldt: ${ukerSykmeldt}\nUker til maksdato: ${antallUkerTilMaksdato}\nDager til maksdato: ${antallDagerTilMaksdato}\nTimer til maksdato: ${antallTimerTilMaksdato}\nMaksdato: ${maksdato}\nNå-dato: ${naa}`;
        frontendlogger.info({
            message: message,
        });
    }

    return ukerSykmeldt;
};
