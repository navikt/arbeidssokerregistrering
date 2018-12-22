import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { RouteHerokuMock } from
        '../mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep';

interface OwnProps {
    to: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>; // tslint:disable-line
}

class RedirectAll extends React.PureComponent<OwnProps> {

    render() {

        const { to, component } = this.props;

        return (
            <>
                {RouteHerokuMock}
                <Route component={component} />
                <Redirect to={to} />
            </>
        );
    }

}

export default RedirectAll;