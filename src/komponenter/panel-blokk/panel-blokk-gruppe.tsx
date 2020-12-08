import * as React from "react";
import classNames from "classnames";
import ResponsivSide from "../side/responsiv-side";

interface PanelBlokkProps {
  children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
  knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
  className?: string;
}

function PanelBlokkGruppe({ knappAksjoner, children, className }: PanelBlokkProps) {
  const knappAksjonerComponent = knappAksjoner ? <div className="panel-blokk__knapperad">{knappAksjoner}</div> : null;

  return (
    <ResponsivSide>
      <div className={classNames("blokk", className)}>{children}</div>
      {knappAksjonerComponent}
    </ResponsivSide>
  );
}

export default PanelBlokkGruppe;
