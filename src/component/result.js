import React from 'react'

import PeopleList from './people-list.js'
import PersonCard from './person-card.js'

const containResult = 'contain-result'
class Result extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className={containResult}>
        <PeopleList people-header={this.props['people-header']}></PeopleList>
        <hr/>
        <PersonCard></PersonCard>
      </section>
    )
  }
}


export default Result
