import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { State as SvarState } from '../../ducks/svar';
import { getAlleSporsmalSomIkkeSkalBesvares, SkjemaConfig } from './skjema-utils';
import Animasjon from './animasjon';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { erIE } from '../../utils/ie-test';

export interface SkjemaProps {
    children: {}; // TODO Type-sett dette slik at alle har sporsmalId
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    gaaTilSporsmal: (sporsmal: number) => void;
    fullforSkjema: () => void;
    advarselElement: React.ReactElement<Element> | null;
    svar: SvarState;
    config?: SkjemaConfig;
    settStateForUbesvartSporsmal: (sporsmalId: string) => void;
    onNesteClick: (sporsmalId: string) => void;
    hrefTilSporsmal: (sporsmal: number) => string;
    hrefTilFullfor: string;
}

interface State {
    tilbake: boolean;
}

type Props = SkjemaProps;

export default class Skjema extends React.Component<Props, State> {
    private antallSporsmal: number;
    private sporsmalIder: string[];

    constructor(props: Props) {
        super(props);
        this.state = {
            tilbake: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.gjeldendeSporsmal !== this.props.gjeldendeSporsmal) {
            this.setState({
                ...this.state,
                tilbake: this.props.gjeldendeSporsmal > nextProps.gjeldendeSporsmal,
            });
        }
    }

    render() {
        const {advarselElement, children, gjeldendeSporsmal, hrefTilSporsmal, hrefTilFullfor} = this.props;
        this.antallSporsmal = React.Children.toArray(children).length;
        const gjeldendeSporsmalComponent = this.props.children[gjeldendeSporsmal];
        this.sporsmalIder = this.getSporsmalIder();
        let classnames = this.state.tilbake ? 'tilbake ' : '';
        classnames += erIE() ? 'erIE' : '';

        const nesteSporsmal = this.finnNesteSporsmal();
        const href = nesteSporsmal !== -1
            ? hrefTilSporsmal(nesteSporsmal)
            : hrefTilFullfor;

        return (
            <ResponsivSide className={classnames}>
                {gjeldendeSporsmalComponent}
                {advarselElement}
                <Animasjon flag={this.props.gjeldendeSporsmal}>
                    <KnappNeste
                        onClick={() => this.nesteButtonClick()}
                        href={href}
                        erAktiv={this.props.sporsmalErBesvart(this.getSporsmalId(gjeldendeSporsmal))}
                    />
                    <LenkeTilbake />
                    <LenkeAvbryt />
                </Animasjon>
            </ResponsivSide>
        );
    }

    nesteButtonClick() {
        const {onNesteClick, gjeldendeSporsmal} = this.props;
        const gjeldendeSporsmalId = this.getSporsmalId(gjeldendeSporsmal);
        onNesteClick(gjeldendeSporsmalId);
        const spmErBesvart = this.props.sporsmalErBesvart(gjeldendeSporsmalId);

        if (spmErBesvart) {
            const nesteSporsmal = this.finnNesteSporsmal();
            const sisteSporsmal = this.antallSporsmal - 1;
            if (nesteSporsmal === -1) {
                this.settStateTilEventuelleUbesvarteSporsmal(sisteSporsmal + 1);
                this.props.fullforSkjema();
            } else {
                this.settStateTilEventuelleUbesvarteSporsmal(nesteSporsmal);
                this.props.gaaTilSporsmal(nesteSporsmal);
            }
        }
    }

    settStateTilEventuelleUbesvarteSporsmal(nesteSporsmal: number) {
        if (this.skalHoppeOverSporsmal(nesteSporsmal)) {
            this.settStateForAlleUbesvarteSporsmal(
                this.props.gjeldendeSporsmal + 1,
                nesteSporsmal - this.props.gjeldendeSporsmal - 1
            );
        }
    }

    skalHoppeOverSporsmal(nesteSporsmal: number) {
        return nesteSporsmal > this.props.gjeldendeSporsmal + 1;
    }

    settStateForAlleUbesvarteSporsmal(sporsmal: number, antall: number) {
        for (let i = sporsmal; i < sporsmal + antall; i += 1) {
            this.props.settStateForUbesvartSporsmal(this.getSporsmalId(i));
        }
    }

    finnNesteSporsmal(): number {
        const foregaendeSporsmalIder =
            this.sporsmalIder.filter((sporsmalId, indeks) => indeks <= this.props.gjeldendeSporsmal);

        const sporsmalIderSomIkkeSkalBesvares =
            getAlleSporsmalSomIkkeSkalBesvares(foregaendeSporsmalIder, this.props.svar, this.props.config);

        const gjenstaendeSporsmalSomSkalBesvares = this.sporsmalIder
            .filter(sporsmalId => !foregaendeSporsmalIder.includes(sporsmalId))
            .filter(sporsmalId => !sporsmalIderSomIkkeSkalBesvares.includes(sporsmalId))
            .map(sporsmalId => this.getSporsmal(sporsmalId))
            .filter(sporsmal => sporsmal !== this.props.gjeldendeSporsmal);

        if (gjenstaendeSporsmalSomSkalBesvares.length === 0) {
            return -1;
        } else {
            return gjenstaendeSporsmalSomSkalBesvares[0];
        }
    }

    getSporsmalId(sporsmal: number) {
        return this.sporsmalIder[sporsmal];
    }

    getSporsmal(sporsmalId: string) {
        return this.sporsmalIder.indexOf(sporsmalId);
    }

    getSporsmalIder(): string[] {
        let sporsmalIder: string[] = [];
        for (let i = 0; i < this.antallSporsmal; i += 1) {
            sporsmalIder.push(this.props.children[i].props.sporsmalId);
            // TODO: Se om dette kan gjøres bedre.
            // For at this.props.children[i] skal funke trenger man minst to children, dvs. minst to spm i skjemaet.
        }
        return sporsmalIder;
    }
}
