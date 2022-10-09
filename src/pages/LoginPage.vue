<template>

  <q-page padding class="flex flex-center">

     <q-form
          v-if="!user.logado"
          @submit="onSubmit"
          class="column q-gutter-md"
          style="min-width: 300px;"
        >

        <q-input
          outlined
          type="email"
          v-model="form.email"
          label="Email *"
        />

        <q-input
          outlined
          type="password"
          v-model="form.password"
          label="Password*"
        />

        <div>
            <q-btn label="Acessar" type="submit" color="primary"/>
        </div>

    </q-form>

    <q-form v-else>

      <span>Você já está conectado.</span>

      <div>
        <q-btn label="Continuar" :to="{name: 'home'}" color="primary"/>
      </div>

    </q-form>

  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

export default defineComponent({
  setup() {
    const form = ref({
      email: "",
      password: ""
    })

    const router = useRouter()
    const user = useUserStore()

    const onSubmit = async () => {
      await user.userLogin(form.value)
      await user.getUser()
      user.logado = true
      router.push({
        name: "home"
      })

    }

    return {
      form,
      onSubmit,
      user
    }
  },
})
</script>

