import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { FormattedMessage } from 'react-intl';
import { frontendLogger } from '../../metrikker/metrics-utils';

const months = {
  0: 'januar',
  1: 'februar',
  2: 'mars',
  3: 'april',
  4: 'mai',
  5: 'juni',
  6: 'juli',
  7: 'august',
  8: 'september',
  9: 'oktober',
  10: 'november',
  11: 'desember'
}

function createDate (date) {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

function formatPeriode (startdato, sluttdato) {
  const dateOne = [`${startdato.getDate()}.`]
  if (startdato.getMonth() !== sluttdato.getMonth()) {
    dateOne.push(months[startdato.getMonth()])
  }
  if (startdato.getFullYear() !== sluttdato.getFullYear()) {
    dateOne.push(startdato.getFullYear())
  }
  return `${dateOne.join(' ')} - ${sluttdato.getDate()}. ${months[sluttdato.getMonth()]} ${sluttdato.getFullYear()}`
}

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
      meldingsId = 'sok-na';
    } else {
      meldingsId = 'sok-periode';
      meldingsPeriode = formatPeriode(fristStart, fristSlutt);
    }
    this.setState({ meldingsId: meldingsId, meldingsPeriode: meldingsPeriode });
    frontendLogger('kvittering.kalkulator.bruk', { dagerTilFristFelt: dagerTilFrist })
  }

  render () {
    return (
      <div>
        <Input label={'Siste arbeidsdag:'} type="date" onChange={this.regnUtPeriode}/>
        {this.state.meldingsId !== '' ? <FormattedMessage id={this.state.meldingsId} values={{periode: this.state.meldingsPeriode}}/> : null}
      </div>
    );
  } 
}

export default Kalkulator;