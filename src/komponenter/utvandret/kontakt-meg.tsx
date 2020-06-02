import * as React from 'react';
import './kontakt-meg.less';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import { uniLogger } from '../../metrikker/uni-logger';
import OppgaveOpprettet from './oppgave-opprettet';
import KontaktMegMelding from './kontakt-meg-melding';
import OppgaveErrorAlleredeOpprettet from './oppgave-error-allerede-opprettet';

const KontaktMeg = () => {

    enum OpprettOppgaveStatus {
        IKKE_STARTET = 'IKKE_STARTET',
        SUKSESS = 'SUKSESS',
        ALLEREDE_OPPRETTET = 'ALLEREDE_OPPRETTET',
    }

    interface Oppgave {
        status: OpprettOppgaveStatus;
    }

    const [oppgave, setOppgave] = React.useState<Oppgave>({
        status: OpprettOppgaveStatus.IKKE_STARTET
    });

    const opprettOppgave = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({oppgaveType: 'UTVANDRET'})
        });

        if (response.status === 200) {
            setOppgave({status: OpprettOppgaveStatus.SUKSESS});
        } else if (response.status === 403) {
            setOppgave({status: OpprettOppgaveStatus.ALLEREDE_OPPRETTET});
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

    if (oppgave.status === OpprettOppgaveStatus.SUKSESS) {
        return (
            <OppgaveOpprettet
                telefonnummerHosKrr={kontaktinfo.telefonnummerHosKrr}
                telefonnummerHosNav={kontaktinfo.telefonnummerHosNav}
            />
        );
    } else if (oppgave.status === OpprettOppgaveStatus.ALLEREDE_OPPRETTET) {
        return (
            <OppgaveErrorAlleredeOpprettet
                telefonnummerHosKrr={kontaktinfo.telefonnummerHosKrr}
                telefonnummerHosNav={kontaktinfo.telefonnummerHosNav}
            />
        );
    } else {
        return <KontaktMegMelding handleKontakMegClicked={handleKontakMegClicked}/>;
    }
}

export default KontaktMeg;
