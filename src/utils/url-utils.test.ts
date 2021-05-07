import { erNAVMiljo } from "./url-utils";
import { expect } from "chai";

describe("url-utils", () => {
  test("erNAVMiljo skal returnere true for sbs-miljø", () => {
    expect(erNAVMiljo("arbeidssokerregistrering.nav.no")).to.equal(true);
    expect(erNAVMiljo("arbeidssokerregistrering.nais.oera.no")).to.equal(true);
    expect(erNAVMiljo("arbeidssokerregistrering.nais.oera-q.local")).to.equal(true);
    expect(erNAVMiljo("tjenester-q1.nav.no")).to.equal(true);
  });

  test("erNAVMiljo skal returnere true for demo-miljø", () => {
    expect(erNAVMiljo("arbeidssokerregistrering.nav.party")).to.equal(true);
  });

  test("erNAVMiljo skal returnere true for fss-miljø", () => {
    expect(erNAVMiljo("arbeidssokerregistrering.nais.adeo.no")).to.equal(true);
    expect(erNAVMiljo("arbeidssokerregistrering-fss.nais.adeo.no")).to.equal(true);
    expect(erNAVMiljo("app-q1.adeo.no")).to.equal(true);
    expect(erNAVMiljo("app.adeo.no")).to.equal(true);
  });

  test("erNAVMiljo skal returnere false for google-tjenster", () => {
    expect(erNAVMiljo("hjksdgfjaugsweeirufgw297-ag34ufga8w7t-nav.translate.goog")).to.equal(false);
    expect(erNAVMiljo("translate.googleusercontent.com")).to.equal(false);
    expect(erNAVMiljo("google.com")).to.equal(false);
  });

  test("erNAVMiljo skal returnere false for nesten riktige hostnavn", () => {
    expect(erNAVMiljo("arbeidssokerregistrering.knav.no")).to.equal(false);
    expect(erNAVMiljo("arbeidssokerregistrering.nav.no.dk")).to.equal(false);
  });
});
