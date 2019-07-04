import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { frontendLogger } from '../../metrikker/metrics-utils';
import formatPeriode from './formater-periode'
import createDate from './create-date'
import './kalkulator.less';

class Kalkulator extends React.Component<{}, { meldingsId: string, meldingsPeriode: string }> {
  constructor(props) {
    super(props);
    this.state = {
      meldingsId: '',
      meldingsPeriode: ''
    };
    this.regnUtPeriode = this.regnUtPeriode.bind(this);
  }

  componentDidMount () {
    frontendLogger('kvittering.kalkulator.visning')
  }
  
  regnUtPeriode (e) {
    e.preventDefault();
    let meldingsId = '';
    let meldingsPeriode = '';
    const now = new Date();
    const iDag = createDate(now);
    const dato = new Date(e.target.value);
    const fristStart = createDate(dato);
    const fristSlutt = createDate(dato);
    fristStart.setDate(fristStart.getDate() - 7);
    fristSlutt.setDate(fristSlutt.getDate() - 1);
    const dagerTilFrist = (fristSlutt.getTime() - iDag.getTime())/86400000;
    if (dagerTilFrist < 7) {
      meldingsId = 'kalkulator-resultat-sok-na';
    } else {
      meldingsId = 'kalkulator-resultat-sok-periode';
      meldingsPeriode = formatPeriode(fristStart, fristSlutt);
    }
    this.setState({ meldingsId: meldingsId, meldingsPeriode: meldingsPeriode });
    frontendLogger('kvittering.kalkulator.bruk', { dagerTilFristFelt: dagerTilFrist })
  }

  render () {
    return (
      <div className="blokk-m">
        <Ekspanderbartpanel border apen tittel={'Når bør du søke Dagpenger?'}>
          <Normaltekst>
            <FormattedMessage id="kalkulator-ingress" />
          </Normaltekst>
          <Input label={<FormattedMessage id={'kalkulator-datofelt-label'} />} type="date" bredde="M" onChange={this.regnUtPeriode}/>
          {this.state.meldingsId !== '' ? <AlertStripe type={this.state.meldingsId === 'kalkulator-resultat-sok-na' ? 'advarsel' : 'info'}><FormattedMessage id={this.state.meldingsId} values={{periode: this.state.meldingsPeriode}}/></AlertStripe> : null}
        </Ekspanderbartpanel>
      </div>
    );
  } 
}

export default Kalkulator;