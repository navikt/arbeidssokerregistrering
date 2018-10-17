import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningBestattSvar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import { injectIntl } from 'react-intl';

type Props = SporsmalProps & InjectedIntlProps;

function UtdanningBestattSporsmal(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl);

    return (
        <form className="spm-skjema">
            <fieldset className="skjema__fieldset">
                <legend className="skjema__legend spm-hode">
                    <Innholdstittel tag="h1" className="spm-tittel">
                        {getTekst('tittel')}
                    </Innholdstittel>
                </legend>
                <div className="spm-body">
                    <Alternativ svar={UtdanningBestattSvar.JA} {...fellesProps}/>
                    <Alternativ svar={UtdanningBestattSvar.NEI} {...fellesProps}/>
                </div>
            </fieldset>
        </form>
    );
}

export default injectIntl(UtdanningBestattSporsmal);
