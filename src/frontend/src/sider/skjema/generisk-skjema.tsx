import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import Knapperad from '../../komponenter/knapper/knapperad';
import KnappAvbryt from '../../komponenter/knapper/knapp-avbryt';
import Tilbakeknapp from '../../komponenter/knapper/tilbakeknapp';

interface GeneriskSkjemaProps {
    children: {};
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    avbrytSkjema: () => void;
    gaaTilSporsmal: (sporsmal: number) => void;
    gaaTilbake: () => void;
    fullforSkjema: () => void;
    gaaTilSblRegistrering: () => void;
    // avgittSvarAngirSelvgaendeBruker: () => boolean;
}

type Props = GeneriskSkjemaProps;

export default class GeneriskSkjema extends React.Component<Props> {

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
                <div className="blokk panel-skjema-wrapper" >
                    <Tilbakeknapp onClick={() => this.props.gaaTilbake()}/>
                    {gjeldendeSporsmalComponent}
                </div>

                <Knapperad>
                    <KnappAvbryt
                        classname="knapp mmr"
                        onClick={() => this.props.avbrytSkjema()}
                    />
                    <KnappNeste
                        onClick={() => this.gaaTilNesteSporsmal()}
                        disabled={disableKnappNeste}
                    />
                </Knapperad>
            </React.Fragment>
        );
    }

    gaaTilNesteSporsmal() {
        if ((this.props.gjeldendeSporsmal === this.antallSporsmal) && this.alleSporsmalErBesvarte()) {
            this.props.fullforSkjema();
        } else {
            this.props.gaaTilSporsmal(this.props.gjeldendeSporsmal + 1);
        }
    }

    alleSporsmalErBesvarte(): boolean {
        const besvarteSporsmal = this.sporsmalIder.filter(sporsmalId => this.props.sporsmalErBesvart(sporsmalId));
        return besvarteSporsmal.length === this.antallSporsmal;
    }

    getSporsmalIder(): string[] {
        let map: string[] = ['']; // Det første spørsmålet skal korrespondere med 1, ikke 0
        for (let i = 0; i < this.antallSporsmal; i += 1) {
            map.push(this.props.children[i].props.sporsmalId);
        }
        return map;
    }
}