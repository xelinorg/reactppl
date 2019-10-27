import noImage from './noimage.js'

const util = {
  genderParam: (gender) => {
    const option = {
      'Women': 'female',
      'Men': 'male'
    }
    return option[gender] || ''
  },
  toJson: (payload) => {
    try {
      return JSON.parse(payload)
    } catch (err) {
      console.log('util.toJson error', err)
      return err
    }
  },
  fixUsable: (memory, person, usable, mode) => {
    if (Object.keys(usable).length < 1 || !usable.Icon || !usable.Icon.URL) {
      if (!usable.Icon && mode === 'write') {
        usable.Icon = { URL: noImage }
      } else if (!usable.Icon.URL  && mode === 'write') {
        usable.Icon.URL = noImage
      }
    }
    if (memory.length > 127) memory.shift()
    mode === 'write' && (memory.push([person, usable]))
  },
  uinamesOption: (genderLength, genderIs) => {
    const param = genderLength && genderIs ? {
      amount: genderLength,
      gender: util.genderParam(genderIs)
    } :{}
    return {
      base: 'uinames.com',
      path: '/api/',
      param: param
    }
  },
  duckduckgoOption: (person) => {
    const param = person ? {
       q: person.name || person.surname,
       format: 'json'
    } : {}
    return {
      base: 'api.duckduckgo.com',
      path: '/',
      param: param
    }
  },
  getUsable: (duckduckgoRes) => {
    const related = duckduckgoRes.RelatedTopics || []
    return related.reduce((acc, curr) => {
      const hasPeople = typeof curr.Name === 'string' && curr.Name === 'People'
      const hasTopics = typeof curr.Topics === 'object' && curr.Topics.length > 0
      if (Object.keys(acc).length < 1 && hasPeople && hasTopics) {
        acc = curr.Topics[0]
      }
      return acc
    }, {})
  },
  filterPerson:  (memory, activeList, search, state) => {
    return activeList.filter(p => p.name.includes(search) || p.surname.includes(search)).reduce((acc, cur) => {
      if (acc.master.name === '' && cur.name === state.person.master.name && cur.surname === state.person.master.surname) {
        acc.master = cur
        const pfound = memory.find((p) => {
          return p[0].name === cur.name && p[0].surname === cur.surname && p[0].gender === cur.gender && p[0].region === cur.region;
        })
        if (pfound && pfound[1]) {
          acc.detail = pfound[1]
        }
      }
      return acc
    }, util.personModel())
  },
  filterPeople: (activeList, activeFilter) => {
    return activeList.filter(p => p.name.includes(activeFilter) || p.surname.includes(activeFilter))
  },
  doFilter: (setState, memory, activeList, search) => {
    setState(state=>({
      filter: search,
      people: util.filterPeople(activeList, search),
      person: util.filterPerson(memory, activeList, search, state)
    }))
  },
  personModel: () => {
    return {
      master: {
        name: ''
      },
      detail: {
        Icon: {
          URL: noImage
        }
      }
    }
  },
  memoryFind: (memory, person) => {
    const pfound = memory.find((p) => {
      return p[0].name === person.name && p[0].surname === person.surname && p[0].gender === person.gender && p[0].region === person.region;
    })
    if (pfound) {
      util.fixUsable(memory, pfound[0], pfound[1], 'read')
    }
    return pfound
  },
  doSelect: (setState, person, usable) => {
    setState(state=>({
      person: {
        master: person,
        detail: usable
      }
    }))

  },
  genderLength: () => {
    return window.location.search.replace('?', '').split('&').reduce((acc, cur) => {
      const pair = cur.split('=')
      if (pair[0] === 'pageSize' && pair[1] > 0 && pair[1] < 100) {
        acc = pair[1]
      }
      return acc
    }, 10)
  },
  debug: () => {
    return window.location.search.replace('?', '').split('&').reduce((acc, cur) => {
      const pair = cur.split('=')
      if (pair[0] === 'debug') {
        acc = '1'
      }
      return acc
    }, '')
  }
}

export default util
