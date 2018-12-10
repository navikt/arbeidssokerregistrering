import * as React from 'react';
import { INNGANGSSPORSMAL_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import './startside-sykmeldt.less';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { parse } from 'query-string';

type Props = RouteComponentProps<any>; // tslint:disable-line

class StartsideSykmeldt extends React.Component<Props> {

    componentWillMount() {

        const { history, location } = this.props;
        const erFraSykefravaer = parse(location.search).fraSykefravaer;

        if (erFraSykefravaer) {
            history.push(INNGANGSSPORSMAL_PATH);
        }

    }

    render() {
        return (
            <section className="startside-sykmeldt">
                <Link to={INNGANGSSPORSMAL_PATH} className="knapp knapp--hoved">Start</Link>
                <LenkeAvbryt tekstId="avbryt-lenke" wrapperClassname="no-anim"/>
            </section>
        );
    }

}

export default withRouter(StartsideSykmeldt);
