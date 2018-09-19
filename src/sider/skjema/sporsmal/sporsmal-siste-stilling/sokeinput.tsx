import * as React from 'react';
import * as _ from 'lodash';
import { Async } from 'react-select';
import { hentStillingMedStyrk08 } from '../../../../ducks/api';
import { Stilling } from '../../../../ducks/siste-stilling';
import { hentStillingsAlternativer } from './sokeinput-utils';
import { FormattedMessage } from 'react-intl';

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
    new(): Async<Option>;
}

const OptionsAsync = Async as OptionsAsync;

class SokeInputComponent extends React.Component<SokeInputComponentProps, SokeInputComponentState> {

    static clickLabel() {
        document.getElementById('stilling')!.focus();
    }

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

                return {options: stillingsAlternativer};
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
            <>
                <label
                    htmlFor="stilling"
                    className="typo-undertittel sokeinput__label"
                    onClick={SokeInputComponent.clickLabel}
                >
                    <FormattedMessage id="siste-arbeidsforhold.undertittel"/>
                </label>
                <div className="blokk-m selectContainer input--fullbredde">
                    <OptionsAsync
                        cache={false}
                        inputProps={{'autoComplete': 'off'}}
                        arrowRenderer={() => null}
                        loadingPlaceholder="Laster..."
                        filterOptions={(options, filter, currentValues) => options}
                        clearable={false}
                        autoload={false}
                        ignoreAccents={false}
                        onChange={this.onChange}
                        loadOptions={_.throttle(this.getOptions, 500)}
                        value={this.state.value}
                        id="stilling"
                        valueKey="id"
                        labelKey="labelKey"
                    />
                </div>
            </>
        );
    }
}

export default SokeInputComponent;
