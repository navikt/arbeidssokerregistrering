import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import Knapperad from '../../komponenter/knapper/knapperad';
import KnappAvbryt from '../../komponenter/knapper/knapp-avbryt';
import Tilbakeknapp from '../../komponenter/knapper/tilbakeknapp';

interface SkjemaProps {
    children: {};
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
    avbrytSkjema: () => void;
    gaaTilSporsmal: (sporsmal: number) => void;
    gaaTilbake: () => void;
    gaaTilNesteSide: (gjeldendeSporsmalId: string, alleSporsmalIder: string[]) => void;
}

type Props = SkjemaProps;

export default class Skjema extends React.Component<Props> {

    private antallSporsmal: number;
    private sporsmalIder: string[];

    constructor(props: Props) {
        super(props);
    }

    render() {
        this.antallSporsmal = React.Children.toArray(this.props.children).length;
        const gjeldendeSporsmalComponent = this.props.children[this.props.gjeldendeSporsmal - 1];
        this.sporsmalIder = this.getSporsmalIder();
        const disableKnappNeste = (this.props.gjeldendeSporsmal === this.antallSporsmal) ?
            !this.alleSporsmalErBesvarte() :
            !this.props.sporsmalErBesvart(this.sporsmalIder[this.props.gjeldendeSporsmal]);

        return (
            <React.Fragment>
                <Tilbakeknapp onClick={() => this.props.gaaTilbake()}/>
                {gjeldendeSporsmalComponent}

                <Knapperad>
                    <KnappAvbryt
                        classname="knapp mmr"
                        onClick={() => this.props.avbrytSkjema()}
                    />
                    <KnappNeste
                        onClick={() => this.nesteButtonClick()}
                        disabled={disableKnappNeste}
                    />
                </Knapperad>
            </React.Fragment>
        );
    }

    nesteButtonClick() {
        //gjeldende sporsmal, sporsmal som skal besvares
        const gjeldendeSporsmalId = this.sporsmalIder[this.props.gjeldendeSporsmal];
        let alleSporsmalsIder = [...this.getSporsmalIder()];
        alleSporsmalsIder.shift();
        this.props.gaaTilNesteSide(gjeldendeSporsmalId, alleSporsmalsIder);
    }

    alleSporsmalErBesvarte(): boolean {
        const besvarteSporsmal = this.sporsmalIder.filter(sporsmalId => this.props.sporsmalErBesvart(sporsmalId));
        return besvarteSporsmal.length === this.antallSporsmal;
    }

    getSporsmalIder(): string[] {
        let map: string[] = ['']; // Det første spørsmålet skal korrespondere med 1, ikke 0 TODO fiks dette.
        for (let i = 0; i < this.antallSporsmal; i += 1) {
            map.push(this.props.children[i].props.sporsmalId);
            // For at this.props.children[i] skal funke trenger man minst to children
        }
        return map;
    }
}