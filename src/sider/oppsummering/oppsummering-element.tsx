import * as React from 'react';
import { connect } from 'react-redux';
import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { FormattedMessage } from 'react-intl';
import { getTekstIdForOppsummering } from './oppsummering-utils';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { MessageValue } from 'react-intl';
import { erSporsmalBesvart } from '../../komponenter/skjema/skjema-utils';

interface OwnProps {
    sporsmalId?: SporsmalId;
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

        if (this.props.sporsmalId && !erSporsmalBesvart(this.props.svarState, this.props.sporsmalId)) {
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
        const { sporsmalId, tekstId, svarState } = this.props;

        if (sporsmalId) {
            return getTekstIdForOppsummering(sporsmalId, hentSvar(svarState, sporsmalId));
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
        const svar: Svar | undefined = hentSvar(svarState, sporsmalId);
        if (!svar) {
            return true;
        }
        if (Array.isArray(skjulHvisSvarErLik) && skjulHvisSvarErLik.includes(svar)) {
            return false;
        }
        return skjulHvisSvarErLik !== svar;
    }
}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar
});

export default connect(mapStateToProps)(OppsummeringElement);