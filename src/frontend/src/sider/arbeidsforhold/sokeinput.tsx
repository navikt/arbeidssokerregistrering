import * as React from 'react';
import { Async } from 'react-select';
import { hentStillingMedStyrk08 } from '../../ducks/api';
import * as _ from 'lodash';

interface SokeInputComponentProps {
    feltNavn: string;
    onChange: (label: string, kode: string) => void;
}

interface Option {
    styrk08: string;
    tittel: string;
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
        this.state = {value: {tittel: tittel, styrk08: ''}};

        this.onChange = this.onChange.bind(this);
    }

    getOptions(input: string) {
        return hentStillingMedStyrk08(input)
            .then((res: {typeaheadYrkeList: string}) => {

                const { typeaheadYrkeList } = res;

                const sortertListe = _.take(_.orderBy(typeaheadYrkeList, ['label'], ['asc']), 7);
                const mapStillingListe = _.map(sortertListe, (stilling: {label: string, styrk08NavListe: {}[]}) => {
                    const styrk08 = stilling.styrk08NavListe.length > 0 ? stilling.styrk08NavListe[0] : '';
                    return {
                        tittel: stilling.label,
                        styrk08
                    };
                });

                const options = [
                    ...mapStillingListe,
                    {styrk08: '-1', tittel: 'Annet stilling'}
                ];
                return {
                    options
                };
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
            <div className="blokk-m">
                <React.Fragment>
                    <OptionsAsync
                        filterOptions={(options, filter, currentValues) => options}
                        clearable={false}
                        onChange={this.onChange}
                        loadOptions={this.getOptions}
                        value={this.state.value}
                        id="stilling"
                        valueKey="styrk08"
                        labelKey="tittel"
                    />
                </React.Fragment>
            </div>
        );
    }
}

export default SokeInputComponent;