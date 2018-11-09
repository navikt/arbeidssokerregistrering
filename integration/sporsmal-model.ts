import { Selector, t} from 'testcafe';

export default class Sporsmal {
    side: Selector;
    btnNeste: Selector;
    body: Selector;
    tittel: Selector;
    rdioAlternativ: Selector;

    constructor () {
        this.side = Selector('.sporsmal');
        this.btnNeste = Selector('[data-testid="neste"]');
        this.body = Selector('.spm-body');
        this.tittel = Selector('.spm-tittel');
        this.rdioAlternativ = Selector('.radioPanel');

    }

    async klikkNeste(){
        await t
            .expect(this.side.exists).ok()
            .click(this.btnNeste);
    }

    async validerSide(){
        await t
            .expect(this.tittel.exists).ok()
            .expect(this.body.exists).ok();

        const tittel = await this.tittel.innerText;
        await t
            .expect(tittel).typeOf('string', `Validerer spmtekst ${tittel}`)
            .expect(tittel!.length).gt(5, `Validerer spmtekst lengde ${tittel}`);
        return this;
    }

    async validerCheckbokser(){
        const count = await this.rdioAlternativ.count;
        await t.expect(count).gte(2);

        for(let x=0; x<count; x++){
            const text = await this.rdioAlternativ.nth(x).textContent;
            await t.expect(text.length).gte(2, `Tekst på rdioknapp:${text} skal være lengre enn 2`);
        }
    }

    async besvarAlleSpm(callback){
        for(let i=0; i<=6; i++){
            await this.validerSide();
            await this.validerCheckbokser();
            await this.klikkNeste();
            await callback(i);

        }
    }


}