import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { RouteHerokuMockRegLoep }
    from '../mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep';

interface OwnProps {
    to: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>; // tslint:disable-line
}

class RedirectAll extends React.PureComponent<OwnProps> {

    render() {

        const { to, component } = this.props;

        return (
            <>
                {RouteHerokuMockRegLoep}
                <Route component={component} />
                <Redirect to={to} />
            </>
        );
    }

}

export default RedirectAll;