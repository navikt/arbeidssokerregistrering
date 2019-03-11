/*tslint:disable*/
import { hentBrukerFnr, hentVeilederEnhetId } from './utils';

interface Config {
    config: {
        dataSources: {
            veileder: string;
            enheter: string;
        };
        toggles: {
            visEnhet: boolean;
            visEnhetVelger: boolean;
            visSokefelt: boolean;
            visVeileder: boolean;
        };
        applicationName: string;
        initiellEnhet: string | null;
        fnr: string | null;
    };
}

const config = (): Config => ({
    config: {
        applicationName: 'Arbeidsrettet oppfølging',
        dataSources: {
            enheter: '/veilarbveileder/api/veileder/enheter',
            veileder: '/veilarbveileder/api/veileder/me',
        },
        fnr: hentBrukerFnr(),
        initiellEnhet: hentVeilederEnhetId(),
        toggles: {
            visEnhet: true,
            visEnhetVelger: false,
            visSokefelt: true,
            visVeileder: true,
        },
    },
});

export const initialiserToppmeny = (): void => {
    if ((window as any).renderDecoratorHead) {
        (window as any).renderDecoratorHead(config());
    }
};
