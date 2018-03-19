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

                const sorterteSvaralternativer =
                    _.take(_.orderBy(typeaheadYrkeList, ['label'], ['asc']), 7);

                let id = 0;
                const stillinger = _.map(sorterteSvaralternativer,
                                         (stilling: { label: string, styrk08NavListe: string[] }) => {
                        const styrk08 = stilling.styrk08NavListe.length > 0 ? stilling.styrk08NavListe[0] : '';
                        return {
                            id: ++id,
                            tittel: stilling.label,
                            styrk08
                        };
                    });

                const options = [
                    ...stillinger,
                    {styrk08: '-1', tittel: 'Annet stilling', id: id + 1}
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
                <OptionsAsync
                    filterOptions={(options, filter, currentValues) => options}
                    clearable={false}
                    onChange={this.onChange}
                    loadOptions={this.getOptions}
                    value={this.state.value}
                    valueKey="id"
                    labelKey="tittel"
                />
            </div>
        );
    }
}

export default SokeInputComponent;