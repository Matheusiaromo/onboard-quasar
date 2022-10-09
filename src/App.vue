<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import useAuth from 'src/services/auth'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup(){

    const { refresh } = useAuth()
    const user = useUserStore()
    const router = useRouter()

    onMounted( () =>{
      if(window.localStorage.token){
        refresh(window.localStorage.refreshToken).then(
          response => {
            window.localStorage.token = `Bearer ${response.data.data.access_token}`
            window.localStorage.refreshToken = response.data.data.refresh_token
            user.getUser()
            router.push({
             name: "home"
            })
          }
        ).catch(err => {
          console.log(err)
          user.userLogout()
          router.push({name: "login"})
        })
      } else {
        router.push({name: "login"})
      }
    })


    return {

    }
  }



})
</script>
