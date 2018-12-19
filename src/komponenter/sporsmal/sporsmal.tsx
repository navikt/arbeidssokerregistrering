import * as React from 'react';
import { getIntlTekstForSporsmal, TekstKontekst } from '../skjema/skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { RegistreringType, State as RegistreringStatusState } from '../../ducks/registreringstatus';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { SporsmalId } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import Ikon from 'nav-frontend-ikoner-assets';

interface SporsmalProps {
    sporsmalId: SporsmalId;
    children: React.ReactElement<{sporsmalId: SporsmalId}>[];
    visInfoTekst?: boolean;
}

interface StateProps {
    registreringStatus: RegistreringStatusState;
}

type Props = StateProps & InjectedIntlProps & SporsmalProps;

const Sporsmal: React.SFC<Props> = (props: Props) => {

    const { sporsmalId, registreringStatus, intl, children, visInfoTekst } = props;
    const registreringType = registreringStatus.data.registreringType || RegistreringType.ORDINAER_REGISTRERING;

    const getTekst = (tekstKontekst: TekstKontekst) =>
        getIntlTekstForSporsmal(sporsmalId, tekstKontekst, intl, registreringType);

    const tittelTekst = getTekst('tittel');

    return (
        <>
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <Innholdstittel tag="h1" className="spm-tittel blokk-xxxl">
                            {tittelTekst}
                        </Innholdstittel>
                    </legend>
                    <div className="spm-body">
                        {children}
                    </div>
                </fieldset>
            </form>
            { visInfoTekst && (
                <div className="spm-info">
                    <span className="spm-info__ikon" aria-label="info">
                        <Ikon kind="info-sirkel" size="1.5em"/>
                    </span>
                    <Normaltekst>
                        {getTekst('info')}
                    </Normaltekst>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    registreringStatus: state.registreringStatus,
});

export default connect(mapStateToProps)(injectIntl(Sporsmal));
