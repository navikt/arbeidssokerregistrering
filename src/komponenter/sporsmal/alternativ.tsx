import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import * as classNames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { getTekstIdForSvar, nullStillSporsmalSomIkkeSkalBesvares } from '../skjema/skjema-utils';

interface AlternativProps {
    svar: Svar;
    sporsmalId: SporsmalId;
    className?: string;
}

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    resetSvar: (sporsmalId: SporsmalId) => void;
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

type AllProps = AlternativProps & StateProps & DispatchProps & InjectedIntlProps;

const Alternativ: React.SFC<AllProps> = (props: AllProps) => {

    const { sporsmalId, svar, className, intl, svarState } = props;
    const tekst = intl.messages[getTekstIdForSvar(sporsmalId, svar)];
    const erBesvart = hentSvar(svarState, sporsmalId) === svar;

    const handleSvarEndret = () => {
        props.endreSvar(sporsmalId, svar);
        nullStillSporsmalSomIkkeSkalBesvares(sporsmalId, svar, props.endreSvar, props.resetSvar);
    };

    return (
        <div className={classNames('alternativ-wrapper', className)}>
            <RadioPanel
                onChange={handleSvarEndret}
                inputProps={{className: 'blokk-xs'}}
                name={'alternativ'}
                label={tekst}
                value={tekst}
                checked={erBesvart}
            />
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    resetSvar: (sporsmalId) => dispatch(resetSvarAction(sporsmalId)),
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Alternativ));