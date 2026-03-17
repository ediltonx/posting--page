const form = document.querySelector('#post-form')
const titulo = document.querySelector('#titulo')
const conteudo = document.querySelector('#conteudo')
const postsList = document.querySelector('#posts-list')
const errorMessage = document.querySelector('#error-message')

function formatarDataHora(data) {
  return data.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function criarElementoPost(post) {
  const artigo = document.createElement('article')
  artigo.className = 'post-card'

  const cabecalho = document.createElement('div')
  cabecalho.className = 'post-card-header'

  const tituloPost = document.createElement('h3')
  tituloPost.textContent = post.title

  const dataPost = document.createElement('span')
  dataPost.className = 'post-date'
  dataPost.textContent = formatarDataHora(post.createdAt)

  const conteudoPost = document.createElement('p')
  conteudoPost.textContent = post.body

  cabecalho.appendChild(tituloPost)
  cabecalho.appendChild(dataPost)
  artigo.appendChild(cabecalho)
  artigo.appendChild(conteudoPost)

  return artigo
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const data = {
    title: titulo.value,
    body: conteudo.value,
    userId: 1
  }

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const postCriado = {
        title: json.title,
        body: json.body,
        createdAt: new Date()
      }

      const novoPost = criarElementoPost(postCriado)
      postsList.prepend(novoPost)
      postsList.classList.remove('hidden')
      errorMessage.classList.add('hidden')
      form.reset()
    })
    .catch(function (error) {
      console.error('Erro ao criar o post:', error)
      errorMessage.textContent = 'Erro ao enviar o post. Tente novamente.'
      errorMessage.classList.remove('hidden')
    })
})
