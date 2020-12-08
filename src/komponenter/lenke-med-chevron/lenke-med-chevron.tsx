import * as React from "react";
import { HoyreChevron } from "nav-frontend-chevron";
import classNames from "classnames";

import "./lenke-med-chevron.less";

interface Props {
  path: string;
  className?: string;
  target?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default class LenkeMedChevron extends React.Component<Props> {
  render() {
    const { className, path, target, children, onClick } = this.props;
    return (
      <div className={classNames("nav-frontend-lenker", className)}>
        <a href={path} className="lenke" target={target} onClick={onClick}>
          {children}
        </a>
        <HoyreChevron />
      </div>
    );
  }
}
