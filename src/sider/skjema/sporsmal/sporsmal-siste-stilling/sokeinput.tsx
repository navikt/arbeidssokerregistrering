import * as React from 'react';
import { Async } from 'react-select';
import { hentStillingMedStyrk08 } from '../../../../ducks/api';
import { Stilling } from '../../../../ducks/siste-stilling';
import { hentStillingsAlternativer } from './sokeinput-utils';

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
}

interface OptionsAsync {
    new (): Async<Option>;
}

const OptionsAsync = Async as OptionsAsync;

class SokeInputComponent extends React.Component<SokeInputComponentProps, SokeInputComponentState> {
    constructor(props: SokeInputComponentProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps: SokeInputComponentProps) {
        this.updateState(nextProps);
    }

    updateState(props: SokeInputComponentProps) {
        this.setState({
            value: {
                stilling: props.defaultStilling,
                labelKey: props.defaultStilling.label,
                id: 0
            }
        });
    }

    getOptions(sokestreng: string) {
        return hentStillingMedStyrk08(encodeURI(sokestreng))
            .then((response: { typeaheadYrkeList: {}[] }) => {

                const {typeaheadYrkeList} = response;

                const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, sokestreng);
                
                return { options: stillingsAlternativer };
            });
    }

    onChange(value: Option) {
        if (value) {
            this.props.onChange(value.stilling);
            this.setState({
                value
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <label htmlFor="stilling" className="invisible">Stilling</label>
                <div className="blokk-m selectContainer input--fullbredde">
                    <OptionsAsync
                        inputProps={{'autoComplete': 'off'}}
                        arrowRenderer={() => null}
                        loadingPlaceholder="Laster..."
                        filterOptions={(options, filter, currentValues) => options}
                        clearable={false}
                        autoload={false}
                        ignoreAccents={false}
                        onChange={this.onChange}
                        loadOptions={this.getOptions}
                        value={this.state.value}
                        id="stilling"
                        valueKey="id"
                        labelKey="labelKey"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default SokeInputComponent;