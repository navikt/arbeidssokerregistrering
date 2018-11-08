import * as React from 'react';
import * as classnames from 'classnames';
import './knapperad.less';

interface KnapperadProps {
    children: Array<React.ReactElement<Element>>;
    classname?: string;
}

function Knapperad({ children, classname }: KnapperadProps) {
    return(
        <div className={classnames('knapperad', classname)}>
            {children}
        </div>
    );
}

export default Knapperad;
