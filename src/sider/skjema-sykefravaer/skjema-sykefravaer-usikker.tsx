import * as React from 'react'
import Skjema from '../../komponenter/skjema/skjema'
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar'
import { hentSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils'
import { AppState } from '../../reducer'
import { connect, Dispatch } from 'react-redux'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { MatchProps } from '../../utils/utils'
import { RouteComponentProps } from 'react-router-dom'

import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter'
import { nullStillSporsmalSomIkkeSkalBesvares, SkjemaConfig } from '../../komponenter/skjema/skjema-utils'
import { RegistreringType } from '../../ducks/registreringstatus'
import {
  usikkerSporsmaleneConfig
} from './skjema-sykefravaer-sporsmalene'

interface DispatchProps {
  resetSvar: (sporsmalId: SporsmalId) => void
  endreSvar: (sporsmalId: string, svar: Svar) => void
}

interface StateProps {
  svarState: SvarState
}

const skjemaFlytUsikker: SkjemaConfig = new Map<Svar, string[]>([
  [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']]
])

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>

class SkjemaSykefravaerUsikker extends React.Component<Props> {
  render () {
    const { endreSvar, intl, resetSvar, svarState, location, match, history } = this.props
    const fellesProps = {
      endreSvar: (sporsmalId: SporsmalId, svar: Svar) => {
        nullStillSporsmalSomIkkeSkalBesvares(sporsmalId, svar, endreSvar, resetSvar)
        endreSvar(sporsmalId, svar)
      },
      intl: intl,
      hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId)
    }

    const regType = RegistreringType.SYKMELDT_REGISTRERING
    const sporsmal = usikkerSporsmaleneConfig(fellesProps, regType)
      .map(spmElement => spmElement.element)

    return (
      <Skjema
        config={skjemaFlytUsikker} // TODO lag test som fanger opp endring her
        baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/4`}
        endUrl={OPPSUMMERING_PATH}
        {...{ location, match, history }}
      >
        {sporsmal}
      </Skjema>
    )
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  svarState: state.svar
})

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  resetSvar: (sporsmalId) => dispatch(resetSvarAction(sporsmalId)),
  endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar))
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerUsikker))
