import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { list, post, update, single, listFilter, postFile } = useApi("/items/posts")

  return {
    list,
    post,
    update,
    single,
    listFilter,
    postFile
  }
}
