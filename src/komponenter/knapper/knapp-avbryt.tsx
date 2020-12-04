import * as React from 'react'
import KnappBase from 'nav-frontend-knapper'
import { Normaltekst } from 'nav-frontend-typografi'
import { FormattedMessage } from 'react-intl'

interface Props {
  onClick: () => void
  classname?: string
}

function KnappAvbryt ({ classname, onClick }: Props) {
  return (
    <KnappBase
      type='standard'
      className={classname}
      onClick={onClick}
    >
      <Normaltekst><FormattedMessage id='knapp-avbryt' /></Normaltekst>
    </KnappBase>
  )
}

export default KnappAvbryt
