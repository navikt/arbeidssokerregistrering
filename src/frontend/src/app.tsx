import * as React from 'react';
import {Provider} from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import RegistrerDeg from './registrerdeg';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <div>
                        <RegistrerDeg
                            className="registrerdeg"
                            tittelId="overskrift-registrerdeg"
                            beskrivelseId="beskrivelse-registrerdeg"
                            knappId="knapp-registrerdeg"
                        />
                    </div>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
