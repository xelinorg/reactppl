import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import {PageHeader, Search, Result} from './component'
import StatusContext from './component/context/status'
import {ApiResource, util} from './common'

// reporting
let uinamesSuc = 0, uinamesErr = 0, duckduckgoSuc = 0 , duckduckgoErr = 0, memoryHit = 0

// runtime
const memory = []
let activeList
let debug = util.debug()
const genderLength = util.genderLength()

// static
const pageHeader = 'React People'
const genderOption = ['Men', 'Women']
const peopleHeader = ['First Name', 'Last Name', 'Gender', 'Region']

const uinamesOpt = util.uinamesOption()

const duckduckgoOpt = util.duckduckgoOption()

const uinamesAPI = new ApiResource(uinamesOpt)

const duckduckgoAPI = new ApiResource(duckduckgoOpt)

class App extends React.Component {

  constructor(props){
    super(props);

    this.toggleGender= (genderIs) => {
      // if is a change fetch and update state else do nothing
      const option = util.uinamesOption(genderLength, genderIs)
      uinamesAPI.get(option).then(
        uinRes => {
          uinamesSuc++
          activeList = uinRes
          this.setState(state=>({
            gender: genderIs,
            people: util.filterPeople(activeList, state.filter),
            person: util.personModel()
          }))
        },
        uinErr => {
          uinamesErr++
          console.log(uinErr)
        }
      )
    }

    this.filterPeople = (search) => {
      util.doFilter(this.setState.bind(this), memory, activeList, search)
    }

    this.resetFilter = () => {
      util.doFilter(this.setState.bind(this),  memory, activeList, '')
    }

    this.selectPerson = (person) => {
      // if has been visited return from memory
      const pfound = util.memoryFind(memory, person)
      if (pfound) {
        memoryHit++
        return this.setState(state=>({
          person: {
            master: pfound[0],
            detail: pfound[1]
          }
        }))
      }
      // we have to make the call
      const option = util.duckduckgoOption(person)
      duckduckgoAPI.get(option).then(
        ddgRes => {
          duckduckgoSuc++
          const usable = util.getUsable(ddgRes)
          util.fixUsable(memory, person, usable, 'write')
          util.doSelect(this.setState.bind(this), person, usable)
        },
        ddgErr => {
          duckduckgoErr++
          util.doSelect(this.setState.bind(this), person, null)
          console.log(ddgErr)
        }
      )
    }
    // app state
    this.state = {
      toggleGender: this.toggleGender,
      selectPerson: this.selectPerson,
      resetFilter: this.resetFilter,
      listLength: genderLength,
      gender: '',
      filter: '',
      people: [],
      person: util.personModel()
    }
  }

  render() {
    return (
      <StatusContext.Provider value={this.state}>
        <PageHeader page-header={pageHeader}></PageHeader>
        <Search on-value-change={this.filterPeople} gender-option={genderOption}></Search>
        <Result people-header={peopleHeader}></Result>
        {debug && (<ul className="debug">
          <li>memory: length {memory.length} hit {memoryHit}</li>
          <li>uinames: success {uinamesSuc} error {uinamesErr}</li>
          <li>duckduckgo: success {duckduckgoSuc} error {duckduckgoErr}</li>
        </ul>)}
      </StatusContext.Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('appRoot'));
