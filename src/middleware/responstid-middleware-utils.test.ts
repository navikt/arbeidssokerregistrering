import * as chai from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import { ActionTypes as RegStatusActionTypes } from '../ducks/registreringstatus';
import { loggResponstidForTjenestekall } from './responstid-middleware-utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});
afterEach(() => {
    sandbox.restore();
});

describe('test logging av responstid', () => {
    it('skal logge responstid for OK kall', () => {
        const frontendlogger = {
            event: sinon.spy(),
        };

        const clock = sandbox.useFakeTimers();

        loggResponstidForTjenestekall(RegStatusActionTypes.HENT_REG_STATUS_PENDING, frontendlogger);
        clock.tick(50);
        loggResponstidForTjenestekall(RegStatusActionTypes.HENT_REG_STATUS_OK, frontendlogger);

        const args = frontendlogger.event.getCall(0).args;
        expect(args[0]).to.equal('registrering.responstid.hent-reg-status');
        expect(args[1].responstid >= 50).to.equal(true);
        expect(args[1].responstid < 60).to.equal(true);

        clock.restore();
    });

    it('skal logge responstid for FEILET kall', () => {
        const frontendlogger = {
            event: sinon.spy(),
        };

        const clock = sandbox.useFakeTimers();
        loggResponstidForTjenestekall(RegStatusActionTypes.HENT_REG_STATUS_PENDING, frontendlogger);
        clock.tick(50);
        loggResponstidForTjenestekall(RegStatusActionTypes.HENT_REG_STATUS_FEILET, frontendlogger);

        const args = frontendlogger.event.getCall(0).args;
        expect(args[0]).to.equal('registrering.responstid.hent-reg-status');
        expect(args[1].responstid >= 50).to.equal(true);
        expect(args[1].responstid < 60).to.equal(true);
        clock.restore();
    });
});