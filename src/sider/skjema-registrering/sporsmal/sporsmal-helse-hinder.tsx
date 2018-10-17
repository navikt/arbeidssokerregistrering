import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { HelseHinderSvar, Svar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

type Props = SporsmalProps & InjectedIntlProps;

function HelseHinder(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl);

    return (
        <>
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <Innholdstittel tag="h1" className="spm-tittel">
                            {getTekst('tittel')}
                        </Innholdstittel>
                    </legend>
                    <div className="spm-body">
                        <Alternativ svar={HelseHinderSvar.JA} {...fellesProps}/>
                        <Alternativ svar={HelseHinderSvar.NEI} {...fellesProps}/>
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

export default injectIntl(HelseHinder);
