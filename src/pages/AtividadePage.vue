<template>
  <q-page padding>

   <div class="row q-col-gutter-sm no-wrap">

    <div class="col-6 col-md-3">

      <q-chip square color="primary" text-color="white">
        Coluna1
      </q-chip>

      <div class="row q-col-gutter-sm">
      <div class="col-12" v-for="(atividade, index) in atividadeC1" :key="index">
        <q-card  class="my-card" @click="openModal(atividade.id)">

          <q-img
          :src="'https://yjghqf46.directus.app/assets/' + atividade.imagem"
          :ratio="16/9"
        />

          <q-card-section>
            <div class="text-p">{{atividade.titulo}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>

    <div class="col-6 col-md-3">

      <q-chip square color="primary" text-color="white">
        Coluna2
      </q-chip>

      <div class="row q-col-gutter-sm">
      <div class="col-12" v-for="(atividade, index) in atividadeC2" :key="index">
        <q-card  class="my-card" @click="openModal(atividade.id)">

          <q-img
          :src="'https://yjghqf46.directus.app/assets/' + atividade.imagem"
          :ratio="16/9"
        />

          <q-card-section>
            <div class="text-p">{{atividade.titulo}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>

   </div>

    <q-dialog v-model="modalStatus">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Atividade Atual: {{singleAtividade.id}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">

        <q-img
          :src="baseURL + singleAtividade.imagem"
          :ratio="16/9"
         />

        <q-input type="text" v-model="singleAtividade.titulo" />

        <div id="content" v-html="singleAtividade.conteudo"></div>

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Fechar" v-close-popup  color="primary" />
        </q-card-actions>
      </q-card>

    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import atividadeService from 'src/services/atividade'

export default defineComponent({
  name: 'AtividadePage',
  setup(){

    const atividadeC1 = ref([])
    const atividadeC2 = ref([])

    onMounted(async () => {
      atividadeC1.value = await getAtividadePerArea("coluna", "coluna1")
      atividadeC2.value = await getAtividadePerArea("coluna", "coluna2")
    })

    const singleAtividade = ref([])

    let modalStatus = ref(false)

    const { single, listFilter } = atividadeService()

    const openModal = async (id) => {
      singleAtividade.value = await getSingleAtividade(id)
      modalStatus.value = true
    }

    const getSingleAtividade = async (id) => {
      const data = await single(id)
      return data
    }

    const getAtividadePerArea = async (field, value) => {
      let filtro = `?filter[${field}]=${value}`
      const data = await listFilter(filtro)
      console.log(data)
      return data
    }

    const baseURL = "https://yjghqf46.directus.app/assets/"

    return {
      openModal,
      modalStatus,
      singleAtividade,
      atividadeC1,
      atividadeC2,
      baseURL,
    }
  }
})
</script>


<style>
#content img {
  width: 100%;
}

#content h1 {
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
}

#content h2 {
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
}

#content hr {
  margin-top: 20px;
  margin-block: 20px;
}

#content video {
  width: 100%;
  height: auto;
}
</style>
