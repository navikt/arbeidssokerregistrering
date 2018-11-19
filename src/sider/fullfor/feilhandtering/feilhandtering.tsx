import * as React from 'react';
import FeilmeldingGenerell from '../../../komponenter/feilmelding/feilmelding-generell';
import FeilmeldingBrukersStatusUgyldig from './feilmelding-brukers-status-ugyldig';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { ErrorData as FullforErrorData, ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';

interface Props {
    errorData: FullforErrorData;
}

export default function Feilhandtering(props: Props & InjectedIntlProps) {
    const { errorData } = props;
    if (errorData && errorData.data) {
        switch (errorData.data.type) {
            case (FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE): {
                return (
                    <FeilmeldingBrukersStatusUgyldig
                        feilType={FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE}
                    />);
            }
            case (FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET): {
                return (
                    <FeilmeldingBrukersStatusUgyldig
                        feilType={FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET}
                    />);
            }
            case (FullforErrorTypes.BRUKER_ER_UKJENT):
            case (FullforErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES): {
                return (<FeilmeldingBrukersStatusUgyldig feilType={errorData.data.type} />);
            }
            default: {
                return (<FeilmeldingGenerell />);
            }
        }
    } else {
        return (<FeilmeldingGenerell />);
    }
}
