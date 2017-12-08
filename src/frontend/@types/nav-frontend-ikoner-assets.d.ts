declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    interface IkonProps {
        kind: string;
        size: number | string;
        style?: string;
        className: string;
    }

    export class Ikon extends React.Component<IkonProps, {}> {

    }

    export default Ikon;
}
