import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

interface OwnProps {
    to: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>; // tslint:disable-line
}

class RedirectAll extends React.PureComponent<OwnProps> {

    render() {

        const { to, component } = this.props;

        return (
            <>
                <Route component={component} />
                <Redirect to={to} />
            </>
        );
    }

}

export default RedirectAll;