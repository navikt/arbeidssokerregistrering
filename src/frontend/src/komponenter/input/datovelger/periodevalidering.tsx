import * as React from 'react';
import { change, touch, WrappedFieldMetaProps } from 'redux-form';
import * as classNames from 'classnames';
import { CustomField } from 'react-redux-form-validation';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../reducer';
import { validerPeriode } from './utils';

interface InnerInputComponentProps {
    meta?: WrappedFieldMetaProps;
    feltNavn: string;
    dispatch: Dispatch<AppState>;
    fraDato?: Date;
    tilDato?: Date;
    input?: {};
    errorMessage?: string[];
}

class InnerInputComponent extends React.Component<InnerInputComponentProps> {
    componentWillReceiveProps(nextProps: InnerInputComponentProps) {
        const { feltNavn, meta, dispatch, fraDato, tilDato } = this.props;
        const validNew = validerPeriode(nextProps.fraDato, nextProps.tilDato);
        const validOld = validerPeriode(fraDato, tilDato);

        if (validNew !== validOld && !!meta) {
            dispatch(touch(meta.form, feltNavn));
            dispatch(change(meta.form, feltNavn, validNew));
        }
    }

    render() {
        const { input, errorMessage } = this.props;
        return (
            <div>
                <input type="hidden" {...input} />
                <div
                    role="alert"
                    aria-live="assertive"
                    aria-relevant="all"
                    className="skjemaelement__feilmelding"
                >
                    <span>
                        {errorMessage}
                    </span>
                </div>
            </div>
        );
    }
}

const ConnectedInputComponent = connect()(InnerInputComponent);

interface PeriodeValideringProps {
    fraDato?: Date;
    tilDato?: Date;
    feltNavn: string;
    errorMessageId: string;
    children?: React.ReactNode;
}

function PeriodeValidering({
                               fraDato,
                               tilDato,
                               feltNavn,
                               errorMessageId,
                               children, intl}: PeriodeValideringProps & InjectedIntlProps) {

    const valid = validerPeriode(fraDato, tilDato);

    function errorMessage() {
        return intl.formatMessage({
            id: errorMessageId,
        });
    }

    return (
        <div
            className={classNames({
                skjema__periodevalidering: true,
                'skjema--harFeil': !valid,
            })}
        >
            <div
                className={classNames({ skjema__feilomrade: !valid })}
                id={feltNavn}
                tabIndex={valid ? undefined : -1}
            >
                {children}

                <CustomField
                    name={feltNavn}
                    customComponent={
                        <ConnectedInputComponent
                            feltNavn={feltNavn}
                            fraDato={fraDato}
                            tilDato={tilDato}
                        />
                    }
                    validate={() => (valid ? undefined : errorMessage())}
                />
            </div>
        </div>
    );
}

export const PeriodeValideringPure = PeriodeValidering;

export default injectIntl(PeriodeValideringPure);
