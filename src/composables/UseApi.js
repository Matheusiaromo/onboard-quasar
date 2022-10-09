import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const response = await api.get(url)
      return response.data.data
    } catch (err) {
      throw new Error(err)
    }
  }

  const postFile = async (endpoint, formData) => {
    return api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
  }

  const listFilter = async (params) => {
    try {
      const response = await api.get(url + params)
      return response.data.data
    } catch (err) {
      throw new Error(err)
    }
  }

  const single = async (id) => {
    try {
      const response = await api.get(`${url}/${id}`)
      return response.data.data
    } catch (err) {
      throw new Error(err)
    }
  }

  const post = async (form) => {
    try {
      const response = await api.post(url, form)
      return response.data.data
    } catch (err) {
      throw new Error(err)
    }
  }

  const update = async (form, id) => {
    try {
      const response = await api.patch(`${url}/${id}`, form)
      return response.data.data
    } catch (err) {
      throw new Error(err)
    }
  }

  return {
    list,
    post,
    update,
    single,
    listFilter,
    postFile
  }
}

