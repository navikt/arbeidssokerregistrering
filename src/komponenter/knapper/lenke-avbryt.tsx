import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';
import { AVBRYT_PATH } from '../../utils/konstanter';
import { FormattedMessage } from 'react-intl';

interface LenkeAvbrytProps {
    classname?: string;
    tekstId?: string;
    wrapperClassname?: string;
}

function LenkeAvbryt({classname, tekstId = 'avbryt-lenke-registrering', wrapperClassname}: LenkeAvbrytProps) {
    return (
        <div className={classnames('lenke-avbryt-wrapper', wrapperClassname)}>
            <Link className={classnames('lenke lenke-avbryt typo-element', classname)} to={AVBRYT_PATH}>
                <FormattedMessage id={tekstId}/>
            </Link>
        </div>
    );
}

export default LenkeAvbryt;
