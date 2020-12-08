import * as React from "react";
import classNames from "classnames";
import "./knapperad.less";

interface KnapperadProps {
  children: Array<React.ReactElement<Element>>;
  classname?: string;
}

function Knapperad({ children, classname }: KnapperadProps) {
  return <div className={classNames("knapperad", classname)}>{children}</div>;
}

export default Knapperad;
