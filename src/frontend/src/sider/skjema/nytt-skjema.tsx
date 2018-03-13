import * as React from 'react';
import { MatchProps } from './skjema';
import { RouteComponentProps } from 'react-router';
import { AVBRYT_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import Knapperad from '../../komponenter/knapper/knapperad';
import KnappAvbryt from '../../komponenter/knapper/knapp-avbryt';

interface SkjemaProps {
    children: {};
    gjeldendeSide: number;
}

export interface MatchProps {
    id: string;
}

type Props = SkjemaProps & RouteComponentProps<MatchProps>;

class NyttSkjema extends React.Component<Props> {

    gjeldendeSporsmal: number;

    constructor(props: Props) {
        super(props);
        this.gjeldendeSporsmal = parseInt(props.match.params.id, 10);
    }

    render() {
        return (
            <React.Fragment>
                <div className="blokk panel-skjema-wrapper">
                    sporsmal
                </div>

                <Knapperad>
                    <KnappAvbryt
                        classname="knapp mmr"
                        onClick={() => this.avbrytSkjema()}
                    />
                    <KnappNeste onClick={() => this.gaaTilNesteSporsmal()}/>
                </Knapperad>
            </React.Fragment>
        );
    }

    avbrytSkjema() {
        this.props.history.push(`${AVBRYT_PATH}`);
    }

    gaaTilNesteSporsmal() {
        this.gaaTilSporsmal(this.gjeldendeSporsmal + 1);
    }

    gaaTilSporsmal(sporsmal: number) {
        this.props.history.push(`${SKJEMA_PATH}/${sporsmal}`);
        this.gjeldendeSporsmal = sporsmal;
    }
}

export default NyttSkjema;