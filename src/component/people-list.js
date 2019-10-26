import React from 'react'

import StatusContext from '../context/status.js'

const equalizePeopleEmpty = 'equalize-people-empty'
const equalizePeopleFilled = 'equalize-people-filled'
const peopleHeader = 'people-header'
const peopleHeaderClass = 'people-list-header'
class PeopleList extends React.Component {
  constructor(props) {
    super(props)
  }

  createTable(context) {
    const table = []
    const body = []
    const header = this.props[peopleHeader].reduce((acc, curr) => {
      acc.push(<th key={curr} className={peopleHeaderClass}>{curr}</th>)
      return acc
    }, [])

    table.push(<thead key='thead'><tr key={peopleHeader}>{header}</tr></thead>)

    context.people.forEach(person => {
      const rowKey = person.name.concat(person.surname, person.region)
      const selectedKey = context.person.master.name.concat(context.person.master.surname, context.person.master.region)
      body.push(
        <tr key={rowKey} onClick={this.selectPerson(context, person)} data-selected={selectedKey === rowKey}>
        <td>{person.name}</td>
        <td>{person.surname}</td>
        <td>{person.gender}</td>
        <td>{person.region}</td>
        </tr>
      )
    })

    table.push(<tbody key='tbody'>{body}</tbody>)
    return table
  }

  selectPerson(context, person) {
    return (event) => {
      context.selectPerson(person)
    }
  }

  render() {
    return (

      <StatusContext.Consumer>
      {(ctx)=>(
        <section>
          <table className={ctx.people.length > 0 ? equalizePeopleFilled : equalizePeopleEmpty}>
            {this.createTable(ctx)}
          </table>
        </section>
      )}
      </StatusContext.Consumer>
    )
  }
}


export default PeopleList
