import React from 'react'
import StatusContext from '../context/status.js'

const gender = 'gender'
const activeClass = 'make-active'
const inactiveClass = 'make-inactive'

class GenderButton extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(context) {
    return (event) => {
      context.toggleGender(this.props[gender])
    }
  }

  isActive(predicate) {
    return this.props[gender] === predicate
  }

  render() {
    return (
      <StatusContext.Consumer>
      {(ctx)=>(
        <button onClick={this.handleClick(ctx)} className={this.isActive(ctx.gender) ? activeClass : inactiveClass}>{this.props[gender]}</button>
      )}
      </StatusContext.Consumer>
    )
  }
}

export default GenderButton
