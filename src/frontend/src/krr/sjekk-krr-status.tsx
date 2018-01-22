import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { selectKrr } from '../ducks/krr';
import { Data as KrrData } from '../ducks/krr';
import ReservertKrr from './reservert-krr';

interface OwnProps {
    krrData: KrrData;
    children: React.ReactNode;
    className?: string;
}

type Props = OwnProps & InjectedIntlProps;

function SjekkKrrStatus({ krrData, children, intl, className}: Props) {
    if (krrData.reservertIKrr) {
        return <ReservertKrr intl={intl}/>;
    }
    return <div className={className}>{children}</div>;
}

const mapStateToProps = (state) => ({
    krrData: selectKrr(state).data
});

export default connect(mapStateToProps)(
    injectIntl(SjekkKrrStatus)
);