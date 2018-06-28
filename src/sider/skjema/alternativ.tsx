import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import * as classNames from 'classnames';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { Svar } from '../../ducks/svar-utils';

interface AlternativProps {
    hentAvgittSvar: () => Svar | undefined;
    svar: Svar;
    avgiSvar: (svar: Svar) => void;
    getTekstId: (svar: Svar) => string;
    className?: string;
}

function Alternativ(props: AlternativProps & InjectedIntlProps) {
    const tekst = props.intl.messages[props.getTekstId(props.svar)];
    return (
        <div className={classNames('alternativ-wrapper', props.className)}>
            <RadioPanel
                onChange={() => props.avgiSvar(props.svar)}
                className="blokk-xs"
                name={'alternativ'}
                label={tekst}
                value={tekst}
                checked={props.hentAvgittSvar() === props.svar}
            />
        </div>
    );
}

export default Alternativ;