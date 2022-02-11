const api = {
  _baseURL: 'https://us-central1-ss-devops.cloudfunctions.net/',
  _headers: {

  },
  get: function (uri, config = {}) {
    return new Promise((resolve, reject) => {
      fetch(`${this._baseURL}${uri}`, { headers: this._headers, ...config })
        .then(body => {
          return body.json()
        })
        .then(data => {
          if (!data.StatusCode) {
            return resolve(data)
          }
          throw data
        })
        .catch(error => {
          return reject(error)
        })
    })
  }
}