import { expect } from 'chai';
import { erIkkeSelvgaende } from './skjema-utils';

describe('skjema-utils', () => {
    it('test av erIkkeSelvgaende', () => {

        expect(erIkkeSelvgaende('1', ['1'])).to.equal(true);
        expect(erIkkeSelvgaende('1', ['1', '2', '3'])).to.equal(true);

        expect(erIkkeSelvgaende('1', ['2'])).to.equal(false);
        expect(erIkkeSelvgaende('1', ['4', '2', '3'])).to.equal(false);

    });
});
