
import Startside from './startside-model';
import Sporsmal from './sporsmal-model';
import { getNetworkIp } from './getNetworkIp';
import { ClientFunction } from 'testcafe';
import * as uaParser from 'ua-parser-js';
import Oppsummering from './oppsummering-model';
import * as axeCheck from 'axe-testcafe';

const getUA = ClientFunction(() => navigator.userAgent);
const port = 4502;
//Regel som feiler på lokal instans men ikke i testmiljø
const axeOptions = {
    rules: { 'landmark-one-main': { enabled: false } }
};

const spmside = new Sporsmal();
const oppsummering = new Oppsummering();

fixture `Universell utforming`
    .before(async ctx => {
        ctx.ip = await getNetworkIp();
    })
    .beforeEach(async t => {
        t.ctx.browserName = uaParser(await getUA()).browser.name;
        //Kjører kun uu validering på chrome fordi det er ikke behov for å kjøre samme testene på flere browsere
        t.ctx.uuCheck = async () => t.ctx.browserName.startsWith('Chrome') && await axeCheck(t, undefined, axeOptions);
    });

test('Forside - Ordinær registrering', async t => {
    const startside = new Startside();

    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:${port}`)
        .expect(startside.side.exists).ok();

    await t.ctx.uuCheck();

});

test('Skjema 1 - Ordinær registrering', async t => {

    await t
       .navigateTo(`http://${t.fixtureCtx.ip}:${port}/skjema/1`)
       .expect(spmside.side.exists).ok();

   await t.ctx.uuCheck();

});

test('Skjema 5 - Ordinær registrering', async t => {

    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:${port}/skjema/5`)
        .expect(spmside.side.exists).ok();

    await t.ctx.uuCheck();

});

test('Oppsummering', async t => {

    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:${port}/oppsummering`)
        .expect(oppsummering.sideOppsummering.exists).ok();

    await t.ctx.uuCheck();

});

test('Fullfør', async t => {

    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:${port}/fullfor`)
        .expect(oppsummering.sideFullfor.exists).ok();

    await t.ctx.uuCheck();

});

test('Du er nå registrert', async t => {

    await t
        .navigateTo(`http://${t.fixtureCtx.ip}:${port}/duernaregistrert`)
        .expect(oppsummering.sideRegistrert.exists).ok();

    await t.ctx.uuCheck();

});
