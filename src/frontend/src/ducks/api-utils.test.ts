import { promiseWithSetTimeout, stubFetch, withError, withResponse } from '../test/test-utils';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { fetchToJson, fetchWithTimeout } from './api-utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

afterEach(() => fetch.restore());

describe('Test fetchToJson', () => {
    it('skal feile', () => {
        stubFetch(withError(500));
        return expect(fetchToJson({url: 'url'})).to.be.rejected;
    });

    it('skal recover', () => {
        stubFetch(withError(500));
        return expect(fetchToJson({url: 'url', recoverWith: () => ({foo: 'bar'})})).to.eventually.have.property('foo');
    });
    it('skal reocover om 404', () => {
        stubFetch(withError(404));
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : undefined,
        })).to.eventually.have.property('foo');
    });
    it('skal ikke reocover om 500', () => {
        stubFetch(withError(500));
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : undefined,
        })).to.be.rejected;
    });
    it('skal ikke reocover om 500', () => {
        stubFetch(withError(500));
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : null,
        })).to.be.rejected;
    });
    it('skal ikke recover dersom fetch-kall er ok', () => {
        stubFetch(withResponse({bar: 'foo'}));
        return expect(fetchToJson({
            url: 'url',
            recoverWith: () => ({foo: 'bar'}),
        })).to.eventually.have.property('bar');
    });
});

describe('fetchWithTimeout', () => {
    it('skal time ut', () => {
        sinon.stub(global, 'fetch').callsFake(() => promiseWithSetTimeout(200));

        return expect(fetchWithTimeout('/minurl', 50)).to.be.rejected;
    });
    it('skal ikke time ut', () => {
        sinon.stub(global, 'fetch').callsFake(() => promiseWithSetTimeout(50));

        return expect(fetchWithTimeout('/minurl', 200)).to.be.fulfilled;
    });
});