import * as React from "react";
import classNames from "classnames";
import "./avhuket-li.less";

interface Props {
  children: React.ReactFragment;
  key?: string;
  classname?: string;
}

function AvhuketLI({ children, key, classname }: Props) {
  return (
    <li className={classNames("li__avhuket", classname)} key={key}>
      {children}
    </li>
  );
}

export default AvhuketLI;
