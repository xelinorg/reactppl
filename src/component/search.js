import React from 'react'

import ButtonBar from './button-bar.js'
import StatusContext from './context/status.js'

const userInput = 'user-input'
const searchHash = 'search'
const textType = 'text'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.inputValueChange.bind(this)
    this.state = {
      value: ''
    }
  }

  inputValueChange(event){
    if (this.state.value !== event.target.value) {
      this.setState({value: event.target.value})
      this.props['on-value-change'](event.target.value)
    }
  }

  resetFilter(context) {
    return () => {
      context.resetFilter(this.setState({value: ''}))
    }
  }

  render() {
    return (
      <section className={userInput}>
        <ButtonBar gender-option={this.props['gender-option']}></ButtonBar>
        <StatusContext.Consumer>
        {(ctx)=>(
          <form>
          <input name={searchHash} type={textType} value={this.state.value} onChange={this.onValueChange} placeholder={searchHash}/>
          <span>&nbsp;</span>
          {ctx.gender && ctx.people.length < ctx.listLength && <label htmlFor={searchHash} onClick={this.resetFilter(ctx)}>{ctx.people.length} out of {ctx.listLength}</label>}
          </form>
        )}
        </StatusContext.Consumer>
      </section>
    )
  }
}

export default Search
