import * as React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { amplitudeLogger } from '../../metrikker/amplitude-utils';

interface Props {
  formidlingsgruppe: string;
  servicegruppe: string;
  geografisktilknytning: string;
}

function plaster (props: Props) {
  const { formidlingsgruppe, servicegruppe, geografisktilknytning } = props;

  const handleClickKontaktMeg = event => {
    const kvittering = document.getElementById('kontaktMegKvittering');
    const melding = document.getElementById('kontaktMegMeldingWrapper');
    if (melding && kvittering) {
        melding.className = 'hidden';
        kvittering.className = 'blokk-s';
        amplitudeLogger('registrering.allerede-registrert.click.kontakt-meg', { formidlingsgruppe, servicegruppe, geografisktilknytning })
    }
  };

 const handleClickContact = event => {
    const melding = document.getElementById('kontaktMegMelding');
    const knapp = document.getElementById('kontaktMegKnapp');
    if (melding && knapp && event.target.id === 'kontaktMegAnnet') {
        melding.className = 'blokk-s';
        knapp.className = 'hidden';
    }
    if (melding && knapp && event.target.id === 'kontaktMegDagpenger') {
        melding.className = 'hidden';
        knapp.className = 'knapp';
    }
  };

  return (
    <Row className="">
        <Column xs="12" sm="8" className="allerede-registrert__boks">
            <div className="allerede-registrert__boks-innhold venstrejustert">
                <Normaltekst className="blokk-s">Vi ser at du prøver å registrere deg som arbeidssøker.</Normaltekst>
                <Normaltekst className="blokk-s"><strong>Hvis du prøver å registrere deg fordi du ønsker å søke dagpenger, må du ta kontakt med NAV.</strong></Normaltekst>
                <div className="blokk-s" id="kontaktMegMeldingWrapper">
                    <Fieldset legend="">
                        <Radio label={'Ja, jeg skal søke dagpenger og vil bli kontaktet av en veileder'} name="kontaktmeg" id="kontaktMegDagpenger" onChange={handleClickContact} />
                        <Radio label={'Jeg ønsker å snakke med en veileder uavhengig av dagpenger'} id="kontaktMegAnnet" onChange={handleClickContact} name="kontaktmeg" />
                    </Fieldset>
                    <Normaltekst className="hidden" id="kontaktMegMelding">
                        Hvis du ønsker å snakke om noe annet enn dagpenger, må du ringe 55 55 33 33.
                    </Normaltekst>
                    <div className="midtjustert">
                        <Knapp className="hidden" id="kontaktMegKnapp" onClick={handleClickKontaktMeg}>Send inn henvendelsen</Knapp>
                    </div>
                </div>
                <div className="hidden" id="kontaktMegKvittering">
                    <Alertstripe type="info">
                        <Normaltekst>Din henvendelse er mottatt</Normaltekst>
                        <Normaltekst>Forventet svartid på denne henvendelsen er 2 arbeidsdager.</Normaltekst>
                    </Alertstripe>
                </div>
            </div>
        </Column>
    </Row>
  )
};

export default plaster;
