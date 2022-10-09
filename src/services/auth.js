import { api } from "src/boot/axios";

export default function useAuth(){
  const login = async (form) => {
      try {
        const response = await api.post('/auth/login', form)
        return response.data.data
      } catch (err) {
        console.log("erro no auth js")
      }
  }

  const refresh = (refreshtoken) => {
    return api.post('/auth/refresh', {
      "refresh_token" : refreshtoken
    })
  }

  const me = () => {
    return api.get('/users/me')
  }

  return {
    login,
    refresh,
    me
  }
}
