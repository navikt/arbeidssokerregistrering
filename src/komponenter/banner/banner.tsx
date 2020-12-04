import * as React from 'react'
import { connect } from 'react-redux'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Systemtittel } from 'nav-frontend-typografi'
import { START_PATH } from '../../utils/konstanter'
import { AppState } from '../../reducer'
import { Data as StartRegistreringData, RegistreringType } from '../../ducks/registreringstatus'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { MatchProps } from '../../utils/utils'
import './banner.less'
import { erIFSS } from '../../utils/fss-utils'

interface StateProps {
  startRegistreringStatus: StartRegistreringData
}

type Props = RouteComponentProps<MatchProps> & InjectedIntlProps & StateProps

class Banner extends React.Component<Props> {
  settBannerOverskriftId (): string {
    const registreringType = this.props.startRegistreringStatus.registreringType
    const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING

    if (erIFSS()) return visSykefravaerSkjema ? 'banner-overskrift-sykefravaer-manuell' : 'banner-overskrift-ordinaer-manuell'

    return visSykefravaerSkjema ? 'banner-overskrift-sykefravaer' : 'banner-overskrift-ordinaer'
  }

  skalVises (): boolean {
    const pathname = this.props.location.pathname.toString()

    return !(pathname.includes(START_PATH) &&
            (this.props.startRegistreringStatus.underOppfolging === false))
  }

  bannerOverskriftId = this.settBannerOverskriftId()

  render () {
    return (!this.skalVises()) ? (null) : (
      <div className='registrering-banner'>
        <Systemtittel tag='h1'>
          {this.props.intl.messages[this.bannerOverskriftId]}
        </Systemtittel>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  startRegistreringStatus: state.registreringStatus.data
})

export default connect(mapStateToProps)(withRouter(injectIntl(Banner)))
