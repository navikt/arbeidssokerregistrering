import React from 'react';
import { Input } from 'nav-frontend-skjema';

function createDate (date) {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}
class Kalkulator extends React.Component<{}, { sisteArbeidsdag: string }> {
  constructor(props) {
    super(props);
    this.state = {sisteArbeidsdag: ''};
    this.regnUtPeriode = this.regnUtPeriode.bind(this);
  }
  
  regnUtPeriode (e) {
    e.preventDefault();
    let melding = '';
    const now = new Date();
    const iDag = createDate(now);
    const dato = new Date(e.target.value);
    const fristStart = createDate(dato);
    const fristSlutt = createDate(dato);
    fristStart.setDate(fristStart.getDate() - 7);
    fristSlutt.setDate(fristSlutt.getDate() - 1);
    const dagerTilFrist = (fristSlutt.getTime() - iDag.getTime())/86400000;
    if (dagerTilFrist < 7) {
      melding = `Du bør søke i dag ${dagerTilFrist}`;
    } else {
      melding = `Du bør søke i perioden ${dagerTilFrist} ${fristStart} - ${fristSlutt}`;
    }
    this.setState({ sisteArbeidsdag: `${melding}`});
  }

  render () {
    return (
      <div>
        <Input label={'Siste arbeidsdag:'} type="date" onChange={this.regnUtPeriode}/>
        {this.state.sisteArbeidsdag}
      </div>
    );
  } 
}

export default Kalkulator;