import { defineStore } from 'pinia';
import { ref } from 'vue'
import useAuth from 'src/services/auth';

export const useUserStore = defineStore('user', () => {

  const currentUser = ref()

  const { login, me } = useAuth()
  let logado = ref(false)

  const userLogin = async (form) => {
    const data = await login(form)
    console.log(data)
    window.localStorage.token = `Bearer ${data.access_token}`
    window.localStorage.refreshToken = data.refresh_token
    console.log( window.localStorage.refreshToken)
    logado.value = false
  }

  const getUser = async () => {
    me().then(r => {
      currentUser.value = r.data.data.id
      console.log(r.data.data.id)
    })
  }

  const userLogout = () => {
    logado.value = false
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("refreshToken")
  }

  return {
    userLogin,
    logado,
    userLogout,
    getUser,
    currentUser
  }

})
