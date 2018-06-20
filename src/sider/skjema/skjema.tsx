import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import { State as SvarState } from '../../ducks/svar';
import {  getAlleSporsmalSomIkkeSkalBesvares, SkjemaConfig } from './skjema-utils';

export interface SkjemaProps {
    children: {}; // TODO Type-sett dette slik at alle har sporsmalId
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    gaaTilbake: () => void;
    gaaTilSporsmal: (sporsmal: number) => void;
    fullforSkjema: () => void;
    advarselElement: React.ReactElement<Element> | null;
    svar: SvarState;
    config?: SkjemaConfig;
}

interface State {
    visAdvarsel: boolean;
}

type Props = SkjemaProps;

export default class Skjema extends React.Component<Props, State> {
    private antallSporsmal: number;
    private sporsmalIder: string[];

    render() {
        const {  advarselElement, children, gjeldendeSporsmal } = this.props;
        this.antallSporsmal = React.Children.toArray(children).length;
        const gjeldendeSporsmalComponent = this.props.children[gjeldendeSporsmal];
        this.sporsmalIder = this.getSporsmalIder();

        return (
            <ResponsivSide>
                <div className="blokk-xs sporsmal-wrapper">
                    {gjeldendeSporsmalComponent}
                    {advarselElement}
                </div>
                <Knappervertikalt>
                    <KnappNeste onClick={() => this.nesteButtonClick()} />
                    <LenkeAvbryt/>
                </Knappervertikalt>
            </ResponsivSide>
        );
    }

    nesteButtonClick() {
        const spmErBesvart = this.props.sporsmalErBesvart(this.getSporsmalId(this.props.gjeldendeSporsmal));

        if (spmErBesvart) {
            const nesteSporsmal = this.finnNesteSporsmal();
            if (nesteSporsmal === -1) {
                this.props.fullforSkjema();
            } else {
                this.props.gaaTilSporsmal(nesteSporsmal);
            }
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

        return gjenstaendeSporsmalSomSkalBesvares.length !== 0 ? gjenstaendeSporsmalSomSkalBesvares[0] : -1;
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