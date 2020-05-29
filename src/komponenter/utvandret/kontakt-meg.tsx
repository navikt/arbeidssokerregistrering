import * as React from 'react';
import './kontakt-meg.less';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import { uniLogger } from '../../metrikker/uni-logger';
import OppgaveOpprettet from './oppgave-opprettet';
import KontaktMegMelding from './kontakt-meg-melding';

const KontaktMeg = () => {

    interface Oppgave {
        id: number;
        tildeltEnhetsnr: string;
        oppgaveType: string;
    }

    const [oppgave, setOppgave] = React.useState<Oppgave>({
        id: -1,
        tildeltEnhetsnr: '',
        oppgaveType: ''
    });

    const opprettOppgave = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({ oppgaveType: 'UTVANDRET' })
        });

        if (response.status === 200) {
            const data = await response.json();
            setOppgave({ id: data.id, tildeltEnhetsnr: data.tildeltEnhetsnr, oppgaveType: data.oppgaveType });
        }
    };

    interface Kontaktinfo {
        telefonnummerHosKrr: string | null;
        telefonnummerHosNav: string | null;
    }
    const [kontaktinfo, setKontaktinfo] = React.useState<Kontaktinfo>({
        telefonnummerHosKrr: null,
        telefonnummerHosNav: null
    });

    const hentKontaktinfo = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'get',
        });

        if (response.status === 200) {
            const data = await response.json();
            uniLogger('registrering.utvandret.kontaktmeg.telefonnummer', {
                krr: data.telefonnummerHosKrr ? 'true' : 'false',
                nav: data.telefonnummerHosNav ? 'true' : 'false'
            });
            setKontaktinfo({
                telefonnummerHosKrr: data.telefonnummerHosKrr,
                telefonnummerHosNav: data.telefonnummerHosNav
            });
        }
    };

    const handleKontakMegClicked = () => {
        uniLogger('registrering.utvandret.kontaktmeg');
        opprettOppgave('/veilarbregistrering/api/oppgave');
        hentKontaktinfo('/veilarbregistrering/api/person/kontaktinfo');
    };

    if (oppgave.id === -1) {
        return <KontaktMegMelding handleKontakMegClicked={handleKontakMegClicked}/>;
    } else {
        return (
            <OppgaveOpprettet
                telefonnummerHosKrr={kontaktinfo.telefonnummerHosKrr}
                telefonnummerHosNav={kontaktinfo.telefonnummerHosNav}
            />
        );
    }
}

export default KontaktMeg;
