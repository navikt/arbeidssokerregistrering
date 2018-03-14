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
}

type Props = GeneriskSkjemaProps;

export default class GeneriskSkjema extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="blokk panel-skjema-wrapper">
                    <Tilbakeknapp onClick={() => this.props.gaaTilbake()}/>
                    {this.props.children}
                </div>

                <Knapperad>
                    <KnappAvbryt
                        classname="knapp mmr"
                        onClick={() => this.props.avbrytSkjema()}
                    />
                    <KnappNeste onClick={() => this.gaaTilNesteSporsmal()}/>
                </Knapperad>
            </React.Fragment>
        );
    }

    gaaTilNesteSporsmal() {
        this.props.gaaTilSporsmal(this.props.gjeldendeSporsmal + 1);
    }
}