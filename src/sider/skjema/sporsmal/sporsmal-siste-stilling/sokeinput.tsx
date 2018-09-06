import * as React from 'react';
import { hentStillingMedStyrk08 } from '../../../../ducks/api';
import { Stilling, tomStilling } from '../../../../ducks/siste-stilling';
import { hentStillingsAlternativer } from './sokeinput-utils';
import AutoComplete from './autocomplete';

interface SokeInputComponentProps {
    defaultStilling: Stilling;
    onChange: (stilling: Stilling) => void;
}

interface Option {
    stilling: Stilling;
    labelKey: string;
    id: number;
}

interface SokeInputComponentState {
    value: Option;
    stillingsAlternativer: {stilling: Stilling, labelKey: string, id: number}[];
    sokeStreng: string;
    visSpinner: boolean;
}

class SokeInputComponent extends React.Component<SokeInputComponentProps, SokeInputComponentState> {

    constructor(props: SokeInputComponentProps) {
        super(props);

        this.hentStillingsAlternativer = this.hentStillingsAlternativer.bind(this);
        this.oppdaterStillingState = this.oppdaterStillingState.bind(this);
        this.oppdaterMedTomStillingState = this.oppdaterMedTomStillingState.bind(this);
        this.toemStillingsAlternativer = this.toemStillingsAlternativer.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    updateState(props: SokeInputComponentProps) {
        this.setState({
            value: {
                stilling: props.defaultStilling,
                labelKey: props.defaultStilling.label,
                id: 0
            },
            stillingsAlternativer: [],
            visSpinner: false
        });
    }

    hentStillingsAlternativer(v) { // tslint:disable-line
        const sokeStreng = v.target.value;

        this.setState({
            value: {
                stilling: tomStilling,
                labelKey: sokeStreng,
                id: 0
            },
            sokeStreng
        });

        const that = this;

        this.setState({
            visSpinner: true
        });

        hentStillingMedStyrk08(encodeURI(sokeStreng))
            .then((response: { typeaheadYrkeList: {}[] }) => {

                const {typeaheadYrkeList} = response;

                const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, sokeStreng);

                this.setState({
                    visSpinner: false
                });
                that.setState({
                    stillingsAlternativer
                });
            });
    }

    toemStillingsAlternativer() {
        this.setState({
            stillingsAlternativer: []
        });
    }

    oppdaterStillingState(valgteStillingIndex) { // tslint:disable-line
        const { stilling, labelKey, id }  = this.state.stillingsAlternativer[valgteStillingIndex];

        this.props.onChange(stilling);

        this.setState({
            value: {
                stilling,
                labelKey,
                id
            }
        });
    }

    oppdaterMedTomStillingState() {
        this.props.onChange(tomStilling);
        const sokeStreng = this.state.sokeStreng;

        this.setState({
            value: {
                stilling: tomStilling,
                labelKey: sokeStreng,
                id: 0
            }
        });
    }

    render() {
        return (
            <AutoComplete
                value={this.state.value.labelKey}
                onChange={this.hentStillingsAlternativer}
                oppdaterState={this.oppdaterStillingState}
                oppdaterDefaultState={this.oppdaterMedTomStillingState}
                resultatListe={this.state.stillingsAlternativer}
                toemResultatListe={this.toemStillingsAlternativer}
                visSpinner={this.state.visSpinner}
            />
        );
    }
}

export default SokeInputComponent;