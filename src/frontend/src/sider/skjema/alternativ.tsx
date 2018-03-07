import * as React from 'react';
import { Radio } from 'nav-frontend-skjema';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

export type EndreSvar = (sporsmalId: string, alternativId: string) => void;

interface AlternativProps {
    tekstId: string;
    sporsmalId: string;
    alternativId: string;
    checked: boolean | undefined;
    endreSvar: EndreSvar;
}

const onChange = (
    endreSvar: EndreSvar, sporsmalId: string, alternativId: string
) => () => (endreSvar(sporsmalId, alternativId));

function Alternativ(
    {tekstId, sporsmalId, alternativId, endreSvar, checked, intl}: AlternativProps & InjectedIntlProps
) {
    const tekst = intl.messages[tekstId];
    return (
        <Radio
            onChange={onChange(endreSvar, sporsmalId, alternativId)}
            className="blokk-xs"
            name={'alternativ'}
            label={tekst}
            value={tekst}
            checked={checked}
        />);
}

export default Alternativ;