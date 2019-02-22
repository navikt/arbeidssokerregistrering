/*tslint:disable*/
import { hentBrukerFnr } from './utils';

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
        initiellEnhet?: string;
        fnr?: string;
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
        toggles: {
            visEnhet: true,
            visEnhetVelger: false,
            visSokefelt: true,
            visVeileder: true,
        },
    },
});

export default () => {
    if ((window as any).renderDecoratorHead) {
        (window as any).renderDecoratorHead(config());
    } else {
        window.location.href = 'feilsider/500.html';
    }
};

export const initialiserToppmeny = (): void => {
    (window as any).renderDecoratorHead(config());
};
