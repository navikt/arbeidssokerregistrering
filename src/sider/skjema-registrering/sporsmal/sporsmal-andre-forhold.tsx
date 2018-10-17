import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { AndreForholdSvar, Svar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

type Props = SporsmalProps & InjectedIntlProps;

function AndreForhold(props: Props) {
    const { intl, sporsmalId } = props;
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(sporsmalId, kontekst, intl);

    return (
        <>
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <Innholdstittel tag="h1" className="spm-tittel">
                            {getTekst('tittel')}
                        </Innholdstittel>
                        <Normaltekst className="spm-ingress">
                            {getTekst('ingress')}
                        </Normaltekst>
                    </legend>
                    <div className="spm-body">
                        <Alternativ svar={AndreForholdSvar.JA} {...fellesProps}/>
                        <Alternativ svar={AndreForholdSvar.NEI} {...fellesProps}/>
                    </div>
                </fieldset>
            </form>
            <div className="spm-info">
                <span className="spm-info__ikon" aria-label="info">
                    <Ikon kind="info-sirkel" size="1.5em"/>
                </span>
                <Normaltekst>
                    {getTekst('info')}
                </Normaltekst>
            </div>
        </>
    );
}

export default injectIntl(AndreForhold);
