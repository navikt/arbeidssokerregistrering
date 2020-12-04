import * as React from 'react'
import ProgressBar from './progress-bar'
import { finnRiktigConfig } from './progress-bar-utils'
import { MatchProps } from '../../utils/utils'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from '../../reducer'
import { State as SvarState } from '../../ducks/svar'
import {
  Data as RegistreringstatusData,
  selectRegistreringstatus
} from '../../ducks/registreringstatus'

interface OwnProps {
  config?: string[]
}

interface StateProps {
  svar: SvarState
  registreringstatusData: RegistreringstatusData
}

type Props = StateProps & OwnProps & RouteComponentProps<MatchProps>

class ProgressBarContainer extends React.Component<Props> {
  render () {
    // Tar med :url fra Router for å oppdatere progressbar når url endres

    const pathname = this.props.location.pathname.toString()
    const config = finnRiktigConfig(pathname, this.props.svar, this.props.registreringstatusData.registreringType)

    if (config) {
      return (
        <ProgressBar
          gjeldendeSporsmal={config.indexOf(pathname)}
          antallSporsmal={config.length}
          offset={3}
        />
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  svar: state.svar,
  registreringstatusData: selectRegistreringstatus(state).data
})

export default connect(mapStateToProps)(ProgressBarContainer)
