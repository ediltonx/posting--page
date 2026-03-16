const form = document.querySelector('#post-form')
const titulo = document.querySelector('#titulo')
const conteudo = document.querySelector('#conteudo')
const renderizadorTitulo = document.querySelector('#renderizador-titulo')
const renderizadorConteudo = document.querySelector('#renderizador-conteudo')
const postResult = document.querySelector('#post-result')
const errorMessage = document.querySelector('#error-message')

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
      renderizadorTitulo.textContent = data.title
      renderizadorConteudo.textContent = data.body
      postResult.classList.remove('hidden')
      errorMessage.classList.add('hidden')
    })
    .catch(function (error) {
      console.error('Erro ao criar o post:', error)
      errorMessage.textContent = 'Erro ao enviar o post. Tente novamente.'
      errorMessage.classList.remove('hidden')
    })
})
