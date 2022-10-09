<template>
  <q-page padding>

   <div class="row q-col-gutter-sm no-wrap">

    <div class="col-6 col-md-3">

      <q-chip square color="primary" text-color="white">
        Tecnologia
      </q-chip>

      <div class="row q-col-gutter-sm">
      <div class="col-12" v-for="(post, index) in postsTecnologia" :key="index">
        <q-card  class="my-card" @click="openModal(post.id)">

          <q-img
          :src="'https://yjghqf46.directus.app/assets/' + post.imagem"
          :ratio="16/9"
        />

          <q-card-section>
            <div class="text-p">{{post.nome}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>

    <div class="col-6 col-md-3">

      <q-chip square color="primary" text-color="white">
        Gestão
      </q-chip>

      <div class="row q-col-gutter-sm">
      <div class="col-12" v-for="(post, index) in postsGestao" :key="index">
        <q-card  class="my-card" @click="openModal(post.id)">

          <q-img
            :src="'https://yjghqf46.directus.app/assets/' + post.imagem"
            :ratio="16/9"
          />

          <q-card-section>
            <div class="text-p">{{post.nome}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>

   </div>

    <q-dialog v-model="modalStatus">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Post Atual: {{singlePost.id}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">

        <q-img
          :src="changeImage ? url : baseURL + singlePost.imagem"
          :ratio="16/9"
         />

        <input v-if="isCurrentUser === singlePost.user_created" ref="currentImg" @change="onChangeImage" type="file" />

        <q-input v-model="singlePost.nome" />

        <span class="text-h6">Programas</span>
        <div v-for="programa, key in singlePost.programas" :key="key">
          <q-checkbox :false-value="null" v-model="programa.value" :label="programa.descricao" />
        </div>

        <hr />

         <span class="text-h6">Passos</span>
        <div v-for="passo, key in singlePost.passos" :key="key">
          <q-checkbox :false-value="null" v-model="passo.value" :label="passo.descricao" />
        </div>

        <hr />

        <span class="text-h6">Pagamentos</span>
        <div v-for="pagamento, key in singlePost.pagamentos" :key="key">
          <q-checkbox :false-value="null" v-model="pagamento.value" :label="pagamento.descricao" />
        </div>

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" @click="closeModal" />
          <q-btn flat label="Salvar" v-if="isCurrentUser === singlePost.user_created" @click="updatePost(singlePost, singlePost.id)" color="primary" />
        </q-card-actions>
      </q-card>

    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import postsService from 'src/services/posts'
import { useUserStore } from 'src/stores/user'

export default defineComponent({
  name: 'IndexPage',
  setup(){

    const user = useUserStore()

    let isCurrentUser = user.currentUser

    const postsTecnologia = ref([])
    const postsGestao = ref([])

    onMounted(async () => {
      postsTecnologia.value = await getPostsPerArea("tecnologia")
      postsGestao.value = await getPostsPerArea("gestao")
    })

    const singlePost = ref([])

    let modalStatus = ref(false)

    const { single, listFilter, postFile, update } = postsService()

    const openModal = async (id) => {
      singlePost.value = await getSinglePost(id)
      modalStatus.value = true
    }

    const getSinglePost = async (id) => {
      const data = await single(id)
      return data
    }

    const getPostsPerArea = async (area) => {
      let filtro = `?filter[area]=${area}`
      const data = await listFilter(filtro)
      console.log(data)
      return data
    }

    const closeModal = () => {
      changeImage.value = false
      modalStatus.value = false
    }

    const baseURL = "https://yjghqf46.directus.app/assets/"

    const updatePost = async (form, id) => {

      const currentPost = singlePost.value

      if(changeImage.value){
        const responseFile = await uploadImage()
        currentPost["imagem"] = responseFile.data.data.id
      }

      try {
        await update(form, id)
        currentPost.value = await getSinglePost(id)
        modalStatus.value = false
        postsTecnologia.value = await getPostsPerArea("tecnologia")
        postsGestao.value = await getPostsPerArea("gestao")
        changeImage.value = false
      } catch(err){
        console.log(err)
      }
    }

    //UPLOAD FILES
    let changeImage = ref(false)
    const currentImg = ref([])
    const url = ref()

    const uploadImage = () => {
      const formData = new FormData()
      formData.append("file", currentImg.value)
      return postFile("/files", formData)
    }

    const onChangeImage = (e) => {
      console.log(e.target.files[0])
      currentImg.value = e.target.files[0]
      url.value = URL.createObjectURL(currentImg.value)
      changeImage.value = true
      console.log(changeImage.value, currentImg.value)
    }



    return {
      openModal,
      modalStatus,
      singlePost,
      postsTecnologia,
      postsGestao,
      baseURL,
      updatePost,
      onChangeImage,
      changeImage,
      url,
      closeModal,
      isCurrentUser
    }
  }
})
</script>
