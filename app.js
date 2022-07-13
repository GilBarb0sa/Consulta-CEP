var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run (event) {
   event.preventDefault()

   var zipCode = zipCodeField.value
   
   zipCode =zipCode.replace(' ','')
   zipCode =zipCode.replace('.','')
   zipCode =zipCode.replace('-','')
   zipCode = zipCode.trim()       //retirar o espaçamento na stringer no começo ou no final

   axios
     .get('https://viacep.com.br/ws/' + zipCode + '/json/')      //requisição para um servidor
     .then(function (response) {
        if (response.data.erro) {
          throw new Error('CEP Inválido')
       }

      content.innerHTML = ''           // não duplica a informação
      creatLine(response.data.logradouro)
      creatLine(response.data.bairro)
      creatLine(response.data.localidade + '/' + response.data.uf)
      })      
     .catch(function (error) {
      content.innerHTML = ''
      creatLine('Ops, algo deu errado!')
      })
}
function creatLine(text) {
   var line = document.createElement('p')
       var text = document.createTextNode(text)
       line.appendChild(text)
       content.appendChild(line)
}


