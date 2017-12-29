import axios from 'axios';

const generateAuthHeader = () => (
  {Authorization: `Bearer ${window.localStorage["api_token"]}`}
)

const requests = {
  get: url =>
    axios({
      method: 'get',
      url,
      headers: generateAuthHeader()
    }),
  put: (url, data) =>
    axios({
      method: 'patch',
      url,
      headers: generateAuthHeader(),
      data
    })
}

const Article = {
  get: id =>
    requests.get(`/api/v1/articles/${id}`),
  update: (id, article) =>
    requests.put(`/api/v1/articles/${id}`, {article})
}

const Restaurant = {
  getAll: () =>
    requests.get('/api/v1/restaurants')
      .then(r => r.data.restaurants)
}

export default {
  Article,
  Restaurant
}

