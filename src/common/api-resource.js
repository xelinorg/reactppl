import util from './util.js'
function ApiResource(option){
  const opt = option || {}
  this.base = opt.base || 'localhost'
  this.path = opt.path || '/'
  this.param = opt.param || {}
  this.protocol = opt.protocol || 'https://'
}

ApiResource.prototype.get = function(option){
  return new Promise((resolve, reject) => {
    const opt = option || {}
    const path = opt.path || this.path
    const param = reduceParam(opt.param)
    opt.method = 'GET'
    opt.path = this.protocol.concat(this.base, path, param)
    opt.resolve = resolve
    opt.reject = reject
    return makeRequest(opt)
  })
}

function reduceParam(param) {
  return Object.keys(param).reduce((acc, curr, idx, arr) => {
    if (idx > 0) {
      acc = acc.concat('&')
    }
    acc = acc.concat(curr, '=', param[curr])
    return acc
  }, '?')
}

function makeRequest(option) {
  const httpRequest = new XMLHttpRequest()

  if (!httpRequest) {
    return option.reject('No XMLHttpRequest on ApiResource module')
  }

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        try {
          if (httpRequest.responseText === '') {
            return option.reject('XMLHttpRequest response is empty', httpRequest)
          }
          const nativePayload = util.toJson(httpRequest.responseText)
          return option.resolve(nativePayload)
        } catch (err) {
          console.log('XMLHttpRequest could not parse response to json');
          return option.reject(err)
        }
      }
    }
  }

  httpRequest.onerror = function(error){
    console.log('XMLHttpRequest onerror ApiResource module')
    return option.reject(error)
  }
  httpRequest.onabort = function(error){
    console.log('XMLHttpRequest onabort error ApiResource module')
  }
  httpRequest.onprogress = function () {
    console.log('XMLHttpRequest onprogress', httpRequest.status)
  }
  httpRequest.ontimeout = function(error) {
    console.log('XMLHttpRequest ontimeout error ApiResource module', error)
  }
  httpRequest.open(option.method, option.path, true)
  if (option.method.toLowerCase() === 'post') {
    httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    return httpRequest.send(JSON.stringify(option.payload))
  }
  httpRequest.send()
}

export default ApiResource
