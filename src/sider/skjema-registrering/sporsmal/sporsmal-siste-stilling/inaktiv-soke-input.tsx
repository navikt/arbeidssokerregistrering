import * as React from 'react';
import { Stilling } from '../../../../ducks/siste-stilling';
import './inaktiv-soke-input.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface InaktivSokeInputProps {
    stilling: Stilling;
    onInputAktivert: () => void;
}

type AllProps = InaktivSokeInputProps & InjectedIntlProps;

const InaktivSokeInput: React.SFC<AllProps> = (props: AllProps) => {

    const { intl, stilling, onInputAktivert } = props;
    const tekster = {
        undertittel: intl.messages['siste-arbeidsforhold.undertittel'],
        endreTekst: intl.messages['sistestilling-endre-tekst']
    };

    return (
        <div className="inaktiv-soke-input">
            <Undertittel>{tekster.undertittel}</Undertittel>
            <div className="inaktiv-soke-input__input-felt" onClick={onInputAktivert}>
                <Normaltekst tag="span" className="inaktiv-soke-input__input-felt--stilling-tekst">
                    {stilling.label}
                </Normaltekst>
                <button className="inaktiv-soke-input__input-felt--endre typo-normal">{tekster.endreTekst}</button>
            </div>
        </div>
    );
};

export default injectIntl(InaktivSokeInput);