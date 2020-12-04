import * as React from 'react'
import NavFrontendSpinner from 'nav-frontend-spinner'
import './innholdslaster-laster.less'

export type SpinnerStorrelse = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

interface LasterInterface {
  storrelse?: SpinnerStorrelse
  className?: string
}

function Laster ({ storrelse, className }: LasterInterface) {
  return (
    <div className={className}>
      <NavFrontendSpinner type={storrelse} />
    </div>
  )
}

export default Laster
