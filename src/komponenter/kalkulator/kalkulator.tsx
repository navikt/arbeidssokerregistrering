import React from 'react';
import { Input } from 'nav-frontend-skjema';

class Kalkulator extends React.Component<{}, { sisteArbeidsdag: string }> {
  constructor(props) {
    super(props);
    this.state = {sisteArbeidsdag: ''};
    this.regnUtPeriode = this.regnUtPeriode.bind(this);
  }
  
  regnUtPeriode (e) {
    e.preventDefault();
    const dato = e.target.value;
    const fristStart = new Date(dato);
    const fristSlutt = new Date(dato);
    fristStart.setDate(fristStart.getDate() - 7);
    fristSlutt.setDate(fristSlutt.getDate() - 1);
    this.setState({ sisteArbeidsdag: `${fristStart} - ${fristSlutt}`});
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