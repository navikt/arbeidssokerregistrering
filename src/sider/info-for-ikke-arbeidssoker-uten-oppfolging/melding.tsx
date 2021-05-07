import * as React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { Fieldset, Radio } from "nav-frontend-skjema";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import { uniLogger } from "../../metrikker/uni-logger";

interface BaseProps {
  formidlingsgruppe: string;
  servicegruppe: string;
  geografiskTilknytning: string;
  underOppfolging: string;
  dagerTilMaksdato: string;
}

interface OptionState {
  numberOfChoices: number;
  choices: Array<string>;
}

class Melding extends React.Component<BaseProps, OptionState> {
  constructor(props: BaseProps) {
    super(props);
    this.state = {
      numberOfChoices: 0,
      choices: [],
    };
  }

  addChoice(choice) {
    let newChoices = this.choices();
    if (newChoices.length === 0) {
      newChoices = [choice];
    } else {
      newChoices.push(choice);
    }
    this.setState({
      choices: newChoices,
    });
    return newChoices;
  }

  increaseOptions() {
    const numberOfChoices = this.optionCount();
    const newNumber = numberOfChoices + 1;
    this.setState({
      numberOfChoices: newNumber,
    });
    return newNumber;
  }

  optionCount() {
    return this.state.numberOfChoices;
  }

  choices() {
    return this.state.choices;
  }

  render() {
    const { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, dagerTilMaksdato } = this.props;

    const handleClickLog = (event) => {
      const id = event.target.id;
      const numberOfChoices = this.increaseOptions();
      const choices = this.addChoice(id).join(", ");
      uniLogger("registrering.aktivitet", {
        aktivitet: "Velger alternativ fra info for ikke arbeidssøker siden",
        formidlingsgruppe,
        servicegruppe,
        geografiskTilknytning,
        underOppfolging,
        antallDagerTilMaksdato: dagerTilMaksdato,
        numberOfChoices,
        choices,
      });
    };

    const hideAll = () => {
      const results = window.document.querySelectorAll("[id$='-result']");
      results.forEach((element) => (element.className = "hidden"));
    };

    const handleClick = (event) => {
      const id = event.target.id;
      const key = `${id}-result`;
      const result = window.document.getElementById(key);
      if (result) {
        hideAll();
        result.className = "show-result-text";
      }
      handleClickLog(event);
    };

    return (
      <div className="info-for-ikke-arbeidssoker">
        <Panel border>
          <Alertstripe type="info" className="blokk-s">
            Du er ikke registrert som arbeidssøker. Vi må hjelpe deg videre i andre kanaler.
          </Alertstripe>
          <Normaltekst>
            <strong>Hvilken situasjon er nærmest din?</strong>
          </Normaltekst>
          <Fieldset legend="" id="veiledervalg">
            <Radio
              label={"Jeg har blitt arbeidsledig eller permittert og skal søke dagpenger"}
              name="oppfolging"
              id="dagpenger"
              onChange={handleClick}
            />
            <Normaltekst className="hidden" id="dagpenger-result">
              <span>
                Hvis du ikke har sendt inn{" "}
                <a href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger">søknad om dagpenger</a> bør du gjøre
                dette før du registrerer deg.
              </span>
              <br />
              <span>Du må ringe oss på 55 55 33 33 for å registrere deg som arbeidssøker.</span>
              <br />
              <span>Vi har dessverre stor pågang nå på grunn av koronaviruset så henvendelser tar ekstra tid.</span>
              <br />
            </Normaltekst>
            <Radio
              label={"Jeg har søkt eller skal søke arbeidsavklaringspenger (AAP)"}
              name="oppfolging"
              id="aap-sok"
              onChange={handleClick}
            />
            <Normaltekst className="hidden" id="aap-sok-result">
              Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio
              label={"Jeg er sykmeldt men har ikke krav på sykepenger"}
              name="oppfolging"
              id="sykepenger-slutt"
              onChange={handleClick}
            />
            <Normaltekst className="hidden" id="sykepenger-slutt-result">
              Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={"Jeg skal opprette CV eller jobbprofil"} name="oppfolging" id="cv" onChange={handleClick} />
            <Normaltekst className="hidden" id="cv-result">
              <a
                href="https://www.arbeidsplassen.no"
                id="arbeidsplassen"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClickLog}
              >
                Gå til Arbeidsplassen.no
              </a>{" "}
              for å opprette CV og jobbprofil.
            </Normaltekst>
            <Radio
              label={"Jeg har blitt arbeidsledig eller permittert og er usikker på rettighetene mine"}
              name="oppfolging"
              id="usikker"
              onChange={handleClick}
            />
            <div className="hidden" id="usikker-result">
              <Normaltekst className="blokk-s">
                <a
                  href="https://www.nav.no/arbeid/dagpenger/permittert"
                  id="dagpenger-permittert"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClickLog}
                >
                  Dine rettigheter som permittert
                </a>
              </Normaltekst>
              <Normaltekst className="blokk-s">
                <a
                  href="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/dagpenger-nar-du-er-arbeidsledig"
                  className="blokk-s"
                  id="dagpenger-arbeidsledig"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClickLog}
                >
                  Dine rettigheter som arbeidsledig
                </a>
              </Normaltekst>
              <Normaltekst className="blokk-s">
                <a
                  href="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/lonnsgarantiordningen"
                  className="blokk-s"
                  id="dagpenger-konkurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClickLog}
                >
                  Dine rettigheter hvis du har mistet jobb på grunn av konkurs
                </a>
              </Normaltekst>
            </div>
            <Radio label={"Jeg er her av andre grunner"} name="oppfolging" id="andre" onChange={handleClick} />
            <Normaltekst className="hidden" id="andre-result">
              Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
          </Fieldset>
        </Panel>
      </div>
    );
  }
}

export default Melding;
