import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { useTranslation } from 'react-i18next'

interface Props {
    handleKontakMegClicked: () => void;
}

const KontaktMegMelding = ({ handleKontakMegClicked }: Props) => {
    const { t } = useTranslation()

    return (
        <Panel border>
            <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
                {t('utvandret-kontakt-meg.tittel')}
            </Systemtittel>
            <Normaltekst className="blokk-s">
                {t('utvandret-kontakt-meg.del1-innhold')}
                <br />
                {t('utvandret-kontakt-meg.del2-innhold')}
            </Normaltekst>
            <Normaltekst className="blokk-m">
                {t('utvandret-kontakt-meg.del3-innhold')}
            </Normaltekst>
            <div className="blokk-s">
                <Hovedknapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={handleKontakMegClicked}>
                    {t('utvandret-kontakt-meg.knapp')}
                </Hovedknapp>
            </div>
            <Normaltekst className="blokk-s">
                {t('utvandret-kontakt-meg.del4-innhold')}
                <br />
                {t('utvandret-kontakt-meg.del5-innhold')}
            </Normaltekst>
            <Normaltekst className="blokk-m">
                {t('utvandret-kontakt-meg.del6-innhold')}
            </Normaltekst>
        </Panel>
    );
}

export default KontaktMegMelding;