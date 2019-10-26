import React from 'react'

import GenderButton from './gender-button.js'

const arrangeBar = 'arrange-bar'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props)
  }

  createBarButton = (genderOption) => {
    return genderOption.reduce((acc, curr) => {
      acc.push(<GenderButton gender={curr} key={curr}></GenderButton>)
      return acc
    }, [])
  }

  render() {
    return (
      <section className={arrangeBar}>
        {this.createBarButton(this.props['gender-option'])}
      </section>
    )
  }
}

export default ButtonBar
