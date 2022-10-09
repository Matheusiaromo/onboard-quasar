import useApi from 'src/composables/UseApi'

export default function atividadeService () {
  const { single, listFilter } = useApi("/items/atividades")

  return {
    single,
    listFilter,
  }
}


