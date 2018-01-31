import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { CustomField } from 'react-redux-form-validation';
import { connect, Dispatch } from 'react-redux';
import { change, touch, WrappedFieldMetaProps } from 'redux-form';
import MaskedInput from 'react-maskedinput';
import {
    autobind,
    dateToISODate,
    erGyldigISODato,
    ISODateToDatePicker,
    datePickerToISODate,
    erGyldigFormattertDato
} from './utils';
import DayPickerComponent from './day-picker';
import { AppState } from '../../../reducer';
import { getIntlMessage } from '../../../utils/utils';

function stopEvent(event: React.MouseEvent<HTMLDivElement>) {
    try {
        event.nativeEvent.stopImmediatePropagation();
    } catch (e) {
        event.stopPropagation();
    }
}

interface DatoFieldInterfaceProps {
    meta?: WrappedFieldMetaProps;
    id: string;
    feltNavn: string;
    label: React.ReactNode;
    input?: { value: Date };
    dispatch: Dispatch<AppState>;
    disabled?: boolean;
    errorMessage?: React.ReactNode;
    disabledDays: (date?: Date) => boolean;
}

interface DatoFieldInterfaceState {
    erApen: boolean;
}

class DatoField extends React.Component<DatoFieldInterfaceProps, DatoFieldInterfaceState> {
    container: any; // tslint:disable-line:no-any
    toggleButton: any; // tslint:disable-line:no-any
    constructor(props: DatoFieldInterfaceProps) {
        super(props);
        autobind(this);
        this.state = {
            erApen: false,
        };
    }

    componentDidMount() {
        console.log('didmount');
        // this.container.addEventListener('focusout', this.onFocusOut);
    }

    componentWillUnmount() {
        // this.container.removeEventListener('focusout', this.onFocusOut);
    }

    onFocusOut(e: MouseEvent) {
        const relatedTarget = e.relatedTarget;
        if (relatedTarget) {
            const targetErChildnode = this.container.contains(relatedTarget);
            if (!targetErChildnode) {
                this.lukk(false);
            }
        }
    }

    onKeyUp(e: React.KeyboardEvent<HTMLElement>) {
        const ESCAPE_KEYCODE = 27;
        if (e.which === ESCAPE_KEYCODE) {
            this.lukk();
        }
    }

    onDayClick(date: Date) {
        if (this.props.disabledDays(date)) {
            return;
        }

        const { meta, feltNavn } = this.props;
        const isoDate = dateToISODate(date);
        this.props.dispatch(change((meta as WrappedFieldMetaProps).form, feltNavn, isoDate));
        this.props.dispatch(touch((meta as WrappedFieldMetaProps).form, feltNavn));
        this.lukk();
    }

    toggle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (this.state.erApen) {
            this.lukk();
        } else {
            this.apne();
        }
    }
    apne() {
        this.setState({
            erApen: true,
        });
    }

    lukk(settFokus: boolean = true) {
        this.setState({
            erApen: false,
        });
        if (settFokus) {
            this.toggleButton.focus();
        }
    }

    render() {
        const {
            meta,
            input,
            id,
            label,
            disabled,
            errorMessage,
        } = this.props;

        const feil = errorMessage && errorMessage;
        const value = input && input.value;
        const maskedInputProps = {
            ...input,
            value: erGyldigISODato(value) ? ISODateToDatePicker(value) : value,
        };

        return (
            <div
                className="datovelger skjemaelement"
                ref={container => {
                    this.container = container;
                }}
            >
                <label className="skjemaelement__label" htmlFor={id}>
                    {label}
                </label>
                <div
                    className="datovelger__inner"
                    onClick={stopEvent}
                >
                    <div className="datovelger__inputContainer">
                        <MaskedInput
                            type="tel"
                            mask="11.11.1111"
                            autoComplete="off"
                            placeholder="dd.mm.åååå"
                            id={id}
                            disabled={disabled}
                            className={`skjemaelement__input input--m datovelger__input ${meta && meta.touched &&
                            meta.error
                                ? 'skjemaelement__input--harFeil'
                                : ''}`}
                            {...maskedInputProps}
                        />
                        <button
                            className="js-toggle datovelger__toggleDayPicker"
                            aria-label={
                                this.state.erApen
                                    ? 'Skjul datovelger'
                                    : 'Vis datovelger'
                            }
                            ref={toggle => {
                                this.toggleButton = toggle;
                            }}
                            id={`toggle-${id}`}
                            disabled={disabled}
                            onKeyUp={this.onKeyUp}
                            onClick={this.toggle}
                            aria-pressed={this.state.erApen}
                            type="button"
                        />
                    </div>
                    {this.state.erApen &&
                        <DayPickerComponent
                            {...this.props}
                            ariaControls={`toggle-${id}`}
                            onDayClick={this.onDayClick}
                            onKeyUp={this.onKeyUp}
                            lukk={this.lukk}
                        />}
                </div>
                <div
                    role="alert"
                    aria-live="assertive"
                    className="skjemaelement__feilmelding"
                >
                    {feil}
                </div>
            </div>
        );
    }
}

function parseDato(dato: Date) {
    return erGyldigFormattertDato(dato) ? datePickerToISODate(dato) : dato;
}

const ConnectedDatoField = connect()(DatoField);

interface Datovelger {
    feltNavn: string;
    labelId: string;
    disabledDays: (date?: Date) => boolean;
    initialMonth?: Date;
}

function Datovelger({ feltNavn, labelId, intl, ...rest }: Datovelger & InjectedIntlProps) {
    const datoFelt = (
        <ConnectedDatoField
            label={<FormattedMessage id={labelId} />}
            feltNavn={feltNavn}
            id={getIntlMessage(intl.messages, labelId)}
            {...rest}
        />
    );
    return (
        <CustomField
            name={feltNavn}
            parse={parseDato}
            className="datovelger__inputelement"
            errorClass="skjemaelement--harFeil"
            customComponent={datoFelt}
        />
    );
}

export default injectIntl(Datovelger);
