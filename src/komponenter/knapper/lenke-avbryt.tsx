import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';
import { AVBRYT_PATH } from '../../utils/konstanter';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

interface LenkeAvbrytProps {
    classname?: string;
    tekstId?: string;
}

function LenkeAvbryt({classname, tekstId = 'avbryt-lenke-registrering'}: LenkeAvbrytProps) {
    return(
        <Link className={classnames('lenke-avbryt', classname)} to={AVBRYT_PATH}>
            <Element tag="span"><FormattedMessage  id={tekstId}/></Element>
        </Link>
    );
}

export default LenkeAvbryt;