import * as React from 'react'
import classNames from 'classnames'
import './lukkeknapp.less'

const cls = (
  bla: boolean | undefined,
  hvit: boolean | undefined,
  hjorne: boolean | undefined,
  className: string | undefined
) => classNames('lukknapp',
  {
    'lukknapp--hvit': hvit,
    'lukknapp--bla': bla,
    'lukknapp--overstHjorne': hjorne
  },
  className
)

interface Props {
  children?: string
  bla?: boolean
  hvit?: boolean
  overstHjorne?: boolean
  className?: string
  onClick?: () => void
}

class Lukkeknapp extends React.Component<Props> {
  static defaultProps = {
    children: 'Lukk',
    bla: false,
    hvit: false,
    overstHjorne: false,
    className: ''
  }

  buttonRef: HTMLElement | null

  constructor (props: Props) {
    super(props)
    this.focus = this.focus.bind(this)
  }

  focus () {
    if (this.buttonRef) {
      this.buttonRef.focus()
    }
  }

  render () {
    const { children, bla, hvit, overstHjorne, className, ...props } = this.props
    return (
      <button
        ref={(buttonRef) => { this.buttonRef = buttonRef }}
        className={cls(bla, hvit, overstHjorne, className)}
        {...props}
      >
        <span className='text-hide'>{children}</span>
      </button>
    )
  }
}

export default Lukkeknapp
