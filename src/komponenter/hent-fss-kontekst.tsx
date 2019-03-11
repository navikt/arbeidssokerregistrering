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

    hentKontekstFraModia = () => {
        Promise.all([hentEnhetIKontekst(), hentBrukerIKontekst()])
            .then((results) => {
                const kontekstFraModia: FssKontekstData = results.reduce((acc, res) => Object.assign(acc, res));
                const kontekstFraUrl = hentKontekstFraUrl();

                if (kontekstFraUrl.aktivBruker && kontekstFraUrl.aktivBruker !== kontekstFraModia.aktivBruker) {
                    oppdaterAktivBruker(kontekstFraUrl.aktivBruker);
                    kontekstFraModia.aktivBruker = kontekstFraUrl.aktivBruker;
                }

                this.props.settKontekst(kontekstFraModia);
            })
            .catch(() => {

                const kontekstFraUrl = hentKontekstFraUrl();
                if (kontekstFraUrl.aktivBruker && kontekstFraUrl.aktivEnhet) {
                    this.props.settKontekst(kontekstFraUrl);
                    this.state = {provdHenteKontekst: true};
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
