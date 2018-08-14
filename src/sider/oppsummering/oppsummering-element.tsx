import * as React from 'react';
import { connect } from 'react-redux';
import { State as SvarState } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { FormattedMessage } from 'react-intl';
import { getTekstIdForOppsummering } from './oppsummering-utils';
import { Svar } from '../../ducks/svar-utils';
import { MessageValue } from 'react-intl';

interface OwnProps {
    sporsmalId?: string;
    tekstId?: string;
    tekst?: string;
    skjul?: boolean;
    skjulHvisSvarErLik?: Svar | Svar[];
    values?: {[key: string]: MessageValue | JSX.Element};
}

interface StateProps {
    svarState: SvarState;
}

type Props = OwnProps & StateProps;

class OppsummeringElement extends React.Component<Props> {
    render() {
        const { tekst, values, } = this.props;

        if (!this.skalViseElement()) {
            return null;
        }

        const tekstTilRendring = tekst ? tekst : (
            <FormattedMessage id={this.getIntlTekstId()} values={values}/>
        );

        return (
            <li className="typo-normal">
                {this.props.children}
                {tekstTilRendring}
            </li>
        );
    }

    getIntlTekstId(): string {
        const { sporsmalId, tekstId, } = this.props;

        if (sporsmalId) {
            return getTekstIdForOppsummering(sporsmalId, this.props.svarState[sporsmalId]);
        } else {
            return tekstId || '';
        }
    }

    skalViseElement() {
        const {
            svarState,
            sporsmalId,
            skjulHvisSvarErLik,
            skjul,
        } = this.props;

        if (skjul) {
            return false;
        }
        if (!sporsmalId || !skjulHvisSvarErLik) {
            return true;
        }
        if (Array.isArray(skjulHvisSvarErLik) && skjulHvisSvarErLik.includes(svarState[sporsmalId])) {
            return false;
        }
        return skjulHvisSvarErLik !== svarState[sporsmalId];
    }
}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar
});

export default connect(mapStateToProps)(OppsummeringElement);