import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';
import { AVBRYT_PATH } from '../../utils/konstanter';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

interface LenkeAvbrytProps {
    classname?: string;
}

function LenkeAvbryt({classname}: LenkeAvbrytProps) {
    return(
        <Link className={classnames('lenke-avbryt', classname)} to={AVBRYT_PATH}>
            <Element tag="span"><FormattedMessage  id="avbryt-lenke"/></Element>
        </Link>
    );
}

export default LenkeAvbryt;