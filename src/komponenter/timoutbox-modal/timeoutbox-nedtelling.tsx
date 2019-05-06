import * as React from 'react';
import * as moment from 'moment';
import LogginnIgjen from './logginn-igjen';
import LastinnPaaNytt from './lastinn-paa-nytt';

/*
*
* Kommer en ny brukerhistorier som tar i bruk denne
*
* */

interface TimeoutboxNedtellingProps {
    utlopsTidspunkt?: string;
}

class TimeoutboxNedtelling extends React.Component<TimeoutboxNedtellingProps> {
    private rerender;
    componentWillMount() {
        this.rerender = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    render() {
        const sekunderIgjen = moment(this.props.utlopsTidspunkt).diff(
            moment(),
            'seconds'
        );
        const durationLeft = moment.duration(sekunderIgjen, 'seconds');
        const tidIgjen = moment.utc(durationLeft.asMilliseconds()).format('mm:ss');
        const visLoggInn = sekunderIgjen <= 0;

        if (visLoggInn) {
            clearInterval(this.rerender);
        }

        return (
            <div className="timeoutbox-nedtelling">
                {
                    visLoggInn
                        ? <LogginnIgjen/>
                        : <LastinnPaaNytt tidIgjen={tidIgjen}/>
                }
            </div>
        );
    }
}

export default TimeoutboxNedtelling;