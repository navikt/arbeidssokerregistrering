import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Panel } from 'nav-frontend-paneler';
import Alertstripe from 'nav-frontend-alertstriper';
import { uniLogger } from '../../metrikker/uni-logger';
import IARBSRegistreringModal from '../../komponenter/iarbs-registrering-modal/iarbs-registrering-modal'

interface BaseProps {
    formidlingsgruppe: string;
    servicegruppe: string;
    geografiskTilknytning: string;
    underOppfolging: string;
    ukerSykmeldt: string;
}

interface OptionState {
    numberOfChoices: number;
    choices: Array<string>;
    visIarbsRegistreringModal: boolean;
}

class Melding extends React.Component<BaseProps, OptionState> {
    constructor(props: BaseProps) {
        super(props);
        this.state = {
            numberOfChoices: 0,
            choices: [],
            visIarbsRegistreringModal: false
        };
    }

    addChoice (choice) {
        let newChoices = this.choices()
        if (newChoices.length === 0) {
            newChoices = [choice]
        } else {
            newChoices.push(choice)
        }
        this.setState({
            choices: newChoices
        })
        return newChoices
    }

    increaseOptions() {
        const numberOfChoices = this.optionCount() 
        const newNumber = numberOfChoices + 1
        this.setState({
            numberOfChoices: newNumber,
        });
        return newNumber
    }

    optionCount() {
        return this.state.numberOfChoices;
    }

    choices() {
        return this.state.choices;
    }

    openIarbsRegistreringModal = (): void => {
        this.setState({ visIarbsRegistreringModal: true });
    }

    handleIarbsRegistreringModalClose = (): void => {
        this.setState({ visIarbsRegistreringModal: false });
    }

    render() {
        const { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, ukerSykmeldt } = this.props;

        const handleClickLog = event => {
            const id = event.target.id;
            const metricName = `registrering.ikke-arbeidssoker-utenfor-oppfolging.click.${id}`;
            const numberOfChoices = this.increaseOptions();
            const choices = this.addChoice(id).join(', ')
            uniLogger('registrering.ikke-arbeidssoker-utenfor-oppfolging.click', { numberOfChoices, choices });
            uniLogger(metricName, { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, ukerSykmeldt, numberOfChoices, choices });
        };

        const hideAll = () => {
            const results = window.document.querySelectorAll("[id$='-result']");
            results.forEach(element => element.className = 'hidden');
        };

        const handleClick = event => {
            const id = event.target.id;
            const key = `${id}-result`;
            const result = window.document.getElementById(key);
            if (id === 'dagpenger') {
                this.openIarbsRegistreringModal()
            }
            if (result) {
                hideAll();
                result.className = 'show-result-text';
            }
            handleClickLog(event);
        };

        return (
            <>
            <div className="info-for-ikke-arbeidssoker">
                <Panel border className="nav-veilederpanel">
                    <Alertstripe type="info" className="blokk-s">
                        Vi må hjelpe deg videre i andre kanaler
                    </Alertstripe>
                    <Normaltekst>
                        <strong>Hvilken situasjon er nærmest din?</strong>
                    </Normaltekst>
                    <Fieldset legend="" id="veiledervalg">
                        <Radio label={'Jeg har søkt arbeidsavklaringspenger'} name="oppfolging" id="aap-sokt" onChange={handleClick} />
                        <Normaltekst className="hidden" id="aap-sokt-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg skal søke arbeidsavklaringspenger'} name="oppfolging" id="aap-skal-soke" onChange={handleClick} />
                        <Normaltekst className="hidden" id="aap-skal-soke-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg er sykmeldt men har ikke krav på sykepenger'} name="oppfolging" id="sykepenger-slutt" onChange={handleClick} />
                        <Normaltekst className="hidden" id="sykepenger-slutt-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg skal opprette CV eller jobbprofil'} name="oppfolging" id="cv" onChange={handleClick} />
                        <Normaltekst className="hidden" id="cv-result">
                            <a href="https://www.arbeidsplassen.no" id='arbeidsplassen' target="_blank" rel="noopener noreferrer" onClick={handleClickLog} >Gå til Arbeidsplassen.no</a> for å opprette CV og jobbprofil.
                        </Normaltekst>
                        <Radio label={'Jeg har blitt arbeidsledig og skal søke dagpenger'} name="oppfolging" id="dagpenger" onChange={handleClick} />
                        <Normaltekst className="hidden" id="dagpenger-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg har blitt arbeidsledig og er usikker på rettighetene mine'} name="oppfolging" id="usikker" onChange={handleClick} />
                        <Normaltekst className="hidden" id="usikker-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Min veileder har bedt meg om å registrerer meg som arbeidssøker'} name="oppfolging" id="veileder" onChange={handleClick} />
                        <Normaltekst className="hidden" id="veileder-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg finner ikke det jeg leter etter'} name="oppfolging" id="finnerikke" onChange={handleClick} />
                        <Normaltekst className="hidden" id="finnerikke-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                        <Radio label={'Jeg er her av andre grunner'} name="oppfolging" id="andre" onChange={handleClick} />
                        <Normaltekst className="hidden" id="andre-result">
                            Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
                        </Normaltekst>
                    </Fieldset>
                </Panel>
            </div>
            <IARBSRegistreringModal 
                isOpen={this.state.visIarbsRegistreringModal}
                onRequestClose={this.handleIarbsRegistreringModalClose}
            />
            </>
        );
    }
}

export default Melding;