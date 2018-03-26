import * as React from 'react';
import * as classnames from 'classnames';

interface Props {
    children: React.ReactFragment;
    key?: string;
    classname?: string;
}

function AvhuketLI({children, key, classname}: Props) {
    return(
        <li className={classnames('li__avhuket', classname)} key={key}>{children}</li>
    );
}

export default AvhuketLI;