import axios from 'axios'
import humps from 'humps'

const generateAuthHeader = () => (
  {Authorization: `Bearer ${window.localStorage['api_token']}`}
)

const _requests = {
  get: url =>
    axios({
      method: 'get',
      url,
      headers: generateAuthHeader()
    }),
  post: (url, data) =>
    axios({
      method: 'post',
      url,
      headers: generateAuthHeader(),
      data
    }),
  put: (url, data) =>
    axios({
      method: 'patch',
      url,
      headers: generateAuthHeader(),
      data
    })
}

const requests = new Proxy(_requests, {
  get (target, propKey) {
    return propKey in target
      ? (url, data, ...args) =>
        target[propKey].apply(this, [url, humps.decamelizeKeys(data), ...args])
          .then(humps.camelizeKeys)
      : undefined
  }
})

const Article = {
  get: id =>
    requests.get(`/api/v1/articles/${id}`),
  update: (id, article) =>
    requests.put(`/api/v1/articles/${id}`, {article}),
  create: article =>
    requests.post('/api/v1/articles', {article})
}

const Restaurant = {
  getAll: () =>
    requests.get('/api/v1/restaurants')
      .then(r => r.data.restaurants)
}

const Category = {
  getAll: () =>
    requests.get('/api/v1/categories')
      .then(r => r.data.categories)
}

export default {
  Article,
  Restaurant,
  Category
}
