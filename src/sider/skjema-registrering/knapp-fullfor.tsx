import * as React from 'react'
import { Normaltekst } from 'nav-frontend-typografi'
import KnappBase from 'nav-frontend-knapper'
import { getIntlMessage } from '../../utils/utils'
import ReactIntl from 'react-intl'

interface Props {
  disabled?: boolean
  onClick: () => void
  intl: ReactIntl.InjectedIntl
}

function KnappFullfor ({ disabled, onClick, intl }: Props) {
  return (
    <KnappBase
      type='hoved'
      className='knapp-neste'
      disabled={disabled}
      onClick={onClick}
      data-testid='neste'
    >
      <Normaltekst>{getIntlMessage(intl.messages, 'fullfor-knapp')}</Normaltekst>
    </KnappBase>

  )
}

export default KnappFullfor
