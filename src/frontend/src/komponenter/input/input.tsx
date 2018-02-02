import * as React from 'react';
import { Input as NavInput } from 'nav-frontend-skjema';
import { CustomField } from 'react-redux-form-validation';

interface InnerInputComponentProps {
    label: string;
    errorMessage?: string[];
    input?: {};
}

function InnerInputComponent({ input, label, errorMessage, ...rest}: InnerInputComponentProps) {
    const feil = errorMessage ? { feilmelding: errorMessage[0] } : undefined;
    return(
        <NavInput
            label={label}
            feil={feil}
            {...rest}
            {...input}
        />
    );
}

interface InputProps {
    feltNavn: string;
    label: string;
}

function Input({ feltNavn, label }: InputProps) {
    return (

        <CustomField
            name={feltNavn}
            errorClass="skjemaelement--harFeil"
            customComponent={<InnerInputComponent label={label} />}
        />
    );
}

export default Input;