import { SporsmalId, State as SvarState } from "../../../../src/ducks/svar";
import { Data as RegStatus } from "../../../../src/ducks/registreringstatus";
import { DinSituasjonSvar } from "../../../../src/ducks/svar-utils";
import { getTekstIdForArbeidSisteManeder } from "../../../../src/sider/oppsummering/oppsummering-utils";

describe("oppsummering-utils", () => {
    it("Hvis bruker og AAReg er enige om at bruker har vært i jobb, så skal getTekstIdForArbeidSisteManeder returnere tom string", () => {
        const svarState: SvarState = lagSvarState(
            DinSituasjonSvar.VIL_FORTSETTE_I_JOBB
        );
        const regStatus: RegStatus = { jobbetSeksAvTolvSisteManeder: true };
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal(
            ""
        );
    });

    it("Hvis bruker og AAReg er enige om at bruker IKKE har vært i jobb, så skal getTekstIdForArbeidSisteManeder returnere tom string", () => {
        const svarState: SvarState = lagSvarState(DinSituasjonSvar.ALDRI_HATT_JOBB);
        const regStatus: RegStatus = { jobbetSeksAvTolvSisteManeder: false };
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal(
            ""
        );
    });

    it("Hvis bruker svarer at den har vært i jobb og AAReg uenig, skal getTekstIdForArbeidSisteManeder returnere riktig tekst", () => {
        const svarState: SvarState = lagSvarState(
            DinSituasjonSvar.VIL_FORTSETTE_I_JOBB
        );
        const regStatus: RegStatus = { jobbetSeksAvTolvSisteManeder: false };
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal(
            "oppsummering-arbeidserfaring-2"
        );
    });

    it("Hvis bruker svarer at den IKKE har vært i jobb og AAReg uenig, skal getTekstIdForArbeidSisteManeder returnere riktig tekst", () => {
        const svarState: SvarState = lagSvarState(DinSituasjonSvar.ALDRI_HATT_JOBB);
        const regStatus: RegStatus = { jobbetSeksAvTolvSisteManeder: true };
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal(
            "oppsummering-arbeidserfaring-1"
        );
    });
});

function lagSvarState(dinSituasjonSvar: DinSituasjonSvar) {
    return [
        {
            sporsmalId: SporsmalId.dinSituasjon,
            svar: dinSituasjonSvar,
        },
    ];
}
