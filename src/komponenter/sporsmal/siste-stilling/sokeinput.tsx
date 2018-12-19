import * as React from 'react';
import * as _ from 'lodash';
import { hentStillingMedStyrk08 } from '../../../ducks/api';
import { Stilling, tomStilling } from '../../../ducks/siste-stilling';
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
    visSpinner: boolean;
}

class SokeInputComponent extends React.Component<SokeInputComponentProps, SokeInputComponentState> {

    private waitingFor;
    private autocompleteSearchDebounced;
    private _autocompleteCache = {};
    constructor(props: SokeInputComponentProps) {
        super(props);

        this.resetValue = this.resetValue.bind(this);
        this.hentStillingsAlternativer = this.hentStillingsAlternativer.bind(this);
        this.oppdaterStillingState = this.oppdaterStillingState.bind(this);
        this.oppdaterDefaultState = this.oppdaterDefaultState.bind(this);

        this.autocompleteSearchDebounced = _.debounce(this.autocompleteSearch, 300);

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

    autocompleteSearch (sokeStreng: string) {
        this.waitingFor = sokeStreng;
        const cached = this._autocompleteCache[sokeStreng];
        if (cached) {
            Promise.resolve(cached).then(
                (stillingsAlternativer: {stilling: Stilling, labelKey: string, id: number}[]) => {
                this.setState({
                    stillingsAlternativer,
                    visSpinner: false
                });
            });
        } else {
            hentStillingMedStyrk08(encodeURI(sokeStreng))
                .then((response: { typeaheadYrkeList: {}[] }) => {

                    const {typeaheadYrkeList} = response;

                    const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, sokeStreng);

                    if (sokeStreng === this.waitingFor) {
                        this._autocompleteCache[sokeStreng] = stillingsAlternativer;
                        this.setState({
                            stillingsAlternativer,
                            visSpinner: false
                        });
                    }
                });
        }
    }

    hentStillingsAlternativer(v) { // tslint:disable-line
        const sokeStreng = v.target.value;

        this.setState({
            value: {
                stilling: tomStilling,
                labelKey: sokeStreng,
                id: 0
            }
        });

        if (sokeStreng.length < 2) {
            return;
        }

        this.setState({
            visSpinner: true
        });

        this.autocompleteSearchDebounced(sokeStreng);

    }

    oppdaterStillingState(valgteStillingIndex) { // tslint:disable-line
        const { stilling, labelKey, id }  = this.state.stillingsAlternativer[valgteStillingIndex];

        this.props.onChange(stilling);

        this.setState({
            value: {
                stilling,
                labelKey,
                id
            },
            stillingsAlternativer: []
        });
    }

    oppdaterDefaultState() {
        const stilling = this.props.defaultStilling;
        const labelKey = this.props.defaultStilling.label;
        this.props.onChange(stilling);

        this.setState({
            value: {
                stilling,
                labelKey,
                id: 0
            },
            stillingsAlternativer: []
        });
    }

    resetValue() {
        this.setState({
            value: {
                stilling: tomStilling,
                labelKey: '',
                id: 0
            },
        });
    }

    render() {
        return (
            <AutoComplete
                value={this.state.value.labelKey}
                resetValue={this.resetValue}
                onChange={this.hentStillingsAlternativer}
                oppdaterState={this.oppdaterStillingState}
                oppdaterDefaultState={this.oppdaterDefaultState}
                resultatListe={this.state.stillingsAlternativer}
                visSpinner={this.state.visSpinner}
            />
        );
    }
}

export default SokeInputComponent;