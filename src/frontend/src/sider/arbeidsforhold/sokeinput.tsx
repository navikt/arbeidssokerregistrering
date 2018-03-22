import * as React from 'react';
import { Async } from 'react-select';
import { hentStillingMedStyrk08 } from '../../ducks/api';
import { hentStillingsAlternativer } from '../../utils/utils';

interface SokeInputComponentProps {
    feltNavn: string;
    onChange: (label: string, kode: string) => void;
}

interface Option {
    styrk08: string;
    tittel: string;
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
        const {feltNavn} = props;
        const tittel = feltNavn ? feltNavn : '';
        this.state = {value: {tittel: tittel, styrk08: '', id: 0}};

        this.onChange = this.onChange.bind(this);
    }

    getOptions(sokestreng: string) {
        return hentStillingMedStyrk08(sokestreng)
            .then((response: { typeaheadYrkeList: {}[] }) => {

                const {typeaheadYrkeList} = response;

                const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, sokestreng);
                
                return { options: stillingsAlternativer };
            });
    }

    onChange(value: Option) {
        if (value) {
            this.props.onChange(value.tittel, value.styrk08);
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
                        searchPromptText="Skriv for å søke"
                        filterOptions={(options, filter, currentValues) => options}
                        clearable={false}
                        onChange={this.onChange}
                        loadOptions={this.getOptions}
                        value={this.state.value}
                        id="stilling"
                        valueKey="id"
                        labelKey="tittel"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default SokeInputComponent;