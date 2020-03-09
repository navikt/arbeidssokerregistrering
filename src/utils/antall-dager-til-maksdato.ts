import { Frontendlogger } from '../middleware/metrics-middleware';
import { uniLogger } from '../metrikker/uni-logger';

export const antallDagerTilMaksdato = (naa: Date, maksdato: Date): number => {
    const diff = maksdato.getTime() - naa.getTime();
    const antallDager = Math.floor(diff / 1000 / 60 / 60 / 24);

    uniLogger('arbeidssøkerregistrering.antall-dager-til-maksdato.data', {
        maksdato, 
        antallDagerTilMaksdato: antallDager,
    });

    const frontendlogger: Frontendlogger = (window as any).frontendlogger; // tslint:disable-line
    if (frontendlogger && frontendlogger.info) {
        const message = `Dager til maksdato: ${antallDager} (Maksdato kan være satt til 350 dager frem i tid)\nMaksdato: ${maksdato}\nNå-dato: ${naa}`;
        frontendlogger.info({
            message: message,
        });
    }

    return antallDager;
};
