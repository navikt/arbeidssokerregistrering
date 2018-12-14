import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { AndreForholdSvar, Svar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { SporsmalId } from '../../../ducks/svar';

type Props = SporsmalProps & InjectedIntlProps;

function AndreForhold(props: Props) {
    const { intl } = props;
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: intl,
        avgiSvar: (svar: Svar) => props.endreSvar(SporsmalId.andreForhold, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(SporsmalId.andreForhold, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(SporsmalId.andreForhold),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(SporsmalId.andreForhold.toString(),
        kontekst, intl, props.registeringType);

    return (
        <>
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <h1
                            className="typo-innholdstittel spm-tittel"
                            dangerouslySetInnerHTML={{ __html: getTekst('tittel') }}
                        />
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
