import * as React from 'react';
import './spa-mock.less';

interface SpaMockProps {
    name: string;
}

type Props = SpaMockProps;

const SpaMock: React.SFC<Props> = (props: SpaMockProps) => {
    return <div className="spa-mock">{props.name}</div>;
};

export default SpaMock;
