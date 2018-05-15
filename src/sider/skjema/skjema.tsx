import * as React from 'react';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import NavAlertStripe from 'nav-frontend-alertstriper';

interface SkjemaProps {
    children: {}; // TODO Type-sett dette slik at alle har sporsmalId
    gjeldendeSporsmal: number;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    gaaTilbake: () => void;
    gaaTilNesteSide: (gjeldendeSporsmalId: string, antallSporsmal: number) => void;
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
        const gjeldendeSporsmalComponent = this.props.children[this.props.gjeldendeSporsmal];
        this.sporsmalIder = this.getSporsmalIder();
        const enableNesteKnapp = this.props.sporsmalErBesvart(this.sporsmalIder[this.props.gjeldendeSporsmal]);

        return (
            <ResponsivSide>
                <div className="blokk-xs sporsmal-wrapper">
                    {gjeldendeSporsmalComponent}

                    <NavAlertStripe type="advarsel">
                        <Normaltekst>
                            <FormattedMessage id="siste-arbeidsforhold.info.tekst"/>
                        </Normaltekst>
                    </NavAlertStripe>

                </div>

                <Knappervertikalt>
                    <KnappNeste
                        onClick={() => this.nesteButtonClick()}
                        disabled={!enableNesteKnapp}
                    />
                    <LenkeAvbryt />
                </Knappervertikalt>
            </ResponsivSide>
        );
    }

    nesteButtonClick() {
        const gjeldendeSporsmalId = this.sporsmalIder[this.props.gjeldendeSporsmal];
        this.props.gaaTilNesteSide(gjeldendeSporsmalId, this.getSporsmalIder().length);
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