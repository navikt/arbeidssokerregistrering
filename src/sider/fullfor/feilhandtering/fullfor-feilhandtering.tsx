import * as React from 'react'
import { connect } from 'react-redux'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { AppState } from '../../../reducer'
import { ErrorData as FullforErrorData } from '../../../ducks/registrerbruker'
import Feilhandtering from './feilhandtering'

interface StateProps {
  errorData: FullforErrorData
}

type Props = StateProps & InjectedIntlProps

class FullforFeilhandtering extends React.Component<Props> {
  render () {
    const errorData = this.props.errorData
    const intl = this.props.intl
    return <Feilhandtering errorData={errorData} {...{ intl }} />
  }
}

function mapStateToProps (state: AppState) {
  return {
    errorData: (state.registrerBruker.data) as FullforErrorData
  }
}

export default connect(mapStateToProps)(injectIntl(FullforFeilhandtering))
