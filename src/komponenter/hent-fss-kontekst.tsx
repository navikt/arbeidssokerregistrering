import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../reducer';
import Loader from './loader/loader';
import { settFssKontekst, Data as FssKontekstData  } from '../ducks/fss-kontekst';
import { hentBrukerIKontekst, hentEnhetIKontekst, oppdaterAktivBruker } from '../ducks/api';
import { hentKontekstFraUrl } from '../utils/fss-utils';

interface HentFssKontekstState {
    provdHenteKontekst?: boolean;
}

interface DispatchProps {
    settKontekst: (data: FssKontekstData) => void;
}

type Props = DispatchProps;

export class HentFssKontekst extends React.Component<Props, HentFssKontekstState> {

    constructor(props: Props) {
        super(props);
        this.state = { provdHenteKontekst: false };
        this.hentKontekstFraModia();
    }

    mergeResults = (results) => {
        const mergedResult = {};

        results.forEach(res => {
            Object.keys(res)
                .filter(key => res[key] != null)
                .forEach(key => mergedResult[key] = res[key]);
        });

        return mergedResult;
    }

    hentKontekstFraModia = () => {
        Promise.all([hentEnhetIKontekst(), hentBrukerIKontekst()])
            .then((results) => {
                const kontekstFraModia: FssKontekstData = this.mergeResults(results);
                const kontekstFraUrl = hentKontekstFraUrl();
                const kontekst: FssKontekstData = {};

                if (kontekstFraUrl.aktivBruker && kontekstFraUrl.aktivBruker !== kontekstFraModia.aktivBruker) {
                    oppdaterAktivBruker(kontekstFraUrl.aktivBruker);
                    kontekst.aktivBruker = kontekstFraUrl.aktivBruker;
                } else {
                    kontekst.aktivBruker = kontekstFraModia.aktivBruker;
                }

                kontekst.aktivEnhet = kontekstFraUrl.aktivEnhet
                    ? kontekstFraUrl.aktivEnhet : kontekstFraModia.aktivEnhet;

                this.props.settKontekst(kontekst);
            })
            .catch(() => {

                const kontekstFraUrl = hentKontekstFraUrl();
                if (kontekstFraUrl.aktivBruker && kontekstFraUrl.aktivEnhet) {
                    this.props.settKontekst(kontekstFraUrl);
                }

            })
            .then(() => {
                this.setState({ provdHenteKontekst: true });
            });
    }

    render() {
        const {children} = this.props;
        const { provdHenteKontekst } = this.state;

        if (!provdHenteKontekst) {
            return <Loader/>;
        }

        return children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    settKontekst: (data: FssKontekstData) => dispatch(settFssKontekst(data)),
});

export default connect(null, mapDispatchToProps)(HentFssKontekst);
