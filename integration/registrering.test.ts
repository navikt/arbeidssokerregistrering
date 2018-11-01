import Startside from "./startside-model";
import Sporsmal from "./sporsmal-model";
import { getNetworkIp } from './getNetworkIp';
import { ClientFunction } from 'testcafe';
import * as uaParser from 'ua-parser-js';
import Oppsummering from "./oppsummering-model";

const getUA = ClientFunction(() => navigator.userAgent);

fixture `Registrer arbeidssøker`
    .before(async ctx => {
        ctx.ip = await getNetworkIp();
    });

const startside = new Startside();
const spmside = new Sporsmal();
const oppsummering = new Oppsummering();

test('Ordinær registrering', async t => {
    const browserName = uaParser(await getUA()).browser.name;
    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:5000`)
        .expect(startside.side.exists).ok()
        .takeScreenshot(`${browserName}/forside.png`)
        .click(startside.btnStartRegistrering);

    await spmside.besvarAlleSpm(async (index) => await t.takeScreenshot(`${browserName}/sporsmal_${index}.png`));
    await oppsummering.fullforOppsummering();
    await oppsummering.fullforRegistrering();

});

