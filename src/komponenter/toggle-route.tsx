import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

interface OwnProps {
    isOn: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>; //tslint:disable-line
    redirectTo: string;
}

class ToggleRoute extends React.Component<OwnProps> {

    render() {
        const {isOn, redirectTo, ...props} = this.props;
        return isOn ? <Route {...props}/> : <Redirect to={redirectTo}/>;
    }

}

export default ToggleRoute;
