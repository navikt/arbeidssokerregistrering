import * as React from 'react'
import Alternativ from '../../../komponenter/skjema/alternativ'
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils'
import { Innholdstittel } from 'nav-frontend-typografi'
import { Svar, TilbakeIArbeidSvar } from '../../../ducks/svar-utils'
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils'
import { injectIntl, InjectedIntlProps } from 'react-intl'

type Props = SporsmalProps & InjectedIntlProps

function SporsmalTilbakeIArbeid (props: Props) {
  const fellesProps = {
    endreSvar: props.endreSvar,
    avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
    getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
    hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
  }

  const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId,
    kontekst, props.intl, props.registeringType)

  return (
    <form className='spm-skjema'>
      <fieldset className='skjema__fieldset'>
        <legend className='skjema__legend spm-hode'>
          <Innholdstittel tag='h1' className='spm-tittel blokk-xxxl'>
            {getTekst('tittel')}
          </Innholdstittel>
        </legend>
        <div className='spm-body'>
          <Alternativ svar={TilbakeIArbeidSvar.JA_FULL_STILLING} {...fellesProps} />
          <Alternativ svar={TilbakeIArbeidSvar.JA_REDUSERT_STILLING} {...fellesProps} />
          <Alternativ svar={TilbakeIArbeidSvar.USIKKER} {...fellesProps} />
          <Alternativ svar={TilbakeIArbeidSvar.NEI} {...fellesProps} />
        </div>
      </fieldset>
    </form>
  )
}

export default injectIntl(SporsmalTilbakeIArbeid)
