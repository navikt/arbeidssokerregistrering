import chai from 'chai';
import * as sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { ActionTypes as RegStatusActionTypes } from '../ducks/registreringstatus';
import { loggResponstid } from './responstid-middleware-utils';

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
        const frontlogger = sinon.spy();

        const clock = sandbox.useFakeTimers();

        loggResponstid(RegStatusActionTypes.HENT_REG_STATUS_PENDING, frontlogger);

        clock.tick(50);
        loggResponstid(RegStatusActionTypes.HENT_REG_STATUS_OK, frontlogger);
        expect(frontlogger.calledOnce).to.equal(true);
        expect(frontlogger.args[0][0]).to.equal('registrering.responstid.hent-reg-status');
        expect(frontlogger.args[0][1].responstid).to.equal(50);
        expect(frontlogger.args[0][1].responstid).to.below(60);
        clock.restore();
    });

    it('skal logge responstid for FEILET kall', () => {
        const frontlogger = sinon.spy();

        const clock = sandbox.useFakeTimers();

        loggResponstid(RegStatusActionTypes.HENT_REG_STATUS_PENDING, frontlogger);

        clock.tick(50);
        loggResponstid(RegStatusActionTypes.HENT_REG_STATUS_FEILET, frontlogger);
        expect(frontlogger.calledOnce).to.equal(true);
        expect(frontlogger.args[0][0]).to.equal('registrering.responstid.hent-reg-status');
        expect(frontlogger.args[0][1].responstid).to.equal(50);
        expect(frontlogger.args[0][1].responstid).to.below(60);
        clock.restore();
    });
});
