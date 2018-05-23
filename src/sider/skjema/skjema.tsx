import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';

interface SkjemaProps {
    children: {}; // TODO Type-sett dette slik at alle har sporsmalId
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    gaaTilbake: () => void;
    gaaTilNesteSide: (gjeldendeSporsmalId: string, antallSporsmal: number) => void;
    advarselElement: React.ReactElement<Element> | null;
}

type Props = SkjemaProps;

export default class Skjema extends React.Component<Props> {

    private antallSporsmal: number;
    private sporsmalIder: string[];

    constructor(props: Props) {
        super(props);
    }

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
        const gjeldendeSporsmalId = this.sporsmalIder[this.props.gjeldendeSporsmal];
        const spmErBesvart = this.props.sporsmalErBesvart(this.sporsmalIder[this.props.gjeldendeSporsmal]);

        if (spmErBesvart) {
            this.props.gaaTilNesteSide(gjeldendeSporsmalId, this.getSporsmalIder().length);
        }
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