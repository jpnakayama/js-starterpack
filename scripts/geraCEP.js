const selectEstados = document.getElementById('estado')
const selectCidades = document.getElementById('cidade')
const logradouroInput = document.getElementById('logradouro')
const btnPesquisar = document.getElementById('btn-enviar')
const btnAtualizar = document.getElementById('btn-refresh')
const tabelaCEP = document.getElementById('tabela-cep')
const listagemCEP = document.getElementById('listagem-cep')

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(response => response.json())
  .then(response => {
    return response.sort((a, b) => a.sigla > b.sigla ? 1 : -1)
  })
  .then(data => {
    data.forEach(estado => {
      const optionEstado = document.createElement('option')
      optionEstado.value = estado.sigla
      optionEstado.textContent = estado.sigla
      selectEstados.appendChild(optionEstado)     
    })

    async function obterCidade(estado) {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const cidades = await response.json();
      
      return cidades;
    }
        
    selectEstados.addEventListener('change', async(evento) => {
      let estadoSelecionado = evento.target.value
      
      const listaDeCidades = await obterCidade(estadoSelecionado)
      
      listaDeCidades.forEach(cidade => {
        const optionCidade = document.createElement('option')
        optionCidade.value = cidade.nome
        optionCidade.text = cidade.nome
        selectCidades.appendChild(optionCidade)
      })      
    })

    btnPesquisar.addEventListener('click', async(evento) => {
      evento.preventDefault()
      
      let estadoEscolhido = estado.value
      let cidadeEscolhida = cidade.value
      let logradouroEscolhido = logradouroInput.value

      await fetch(`https://viacep.com.br/ws/${estadoEscolhido}/${cidadeEscolhida}/${logradouroEscolhido}/json/`)
      .then(response => response.json())  
      .then(data => {
          data.forEach(item => {
            const linhaItem = document.createElement('tr')
            const itemBairro = document.createElement('td')
            itemBairro.innerHTML = item.bairro
            const itemCEP = document.createElement('td')
            itemCEP.innerHTML = item.cep
            listagemCEP.appendChild(linhaItem)
            linhaItem.appendChild(itemBairro)
            linhaItem.appendChild(itemCEP)
          })
        })
        
      tabelaCEP.style.display = 'block'
      btnPesquisar.style.display = 'none'
      btnAtualizar.style.display = 'block'
    })
  })

