const selectEstados = document.getElementById('estado')
const seletctCidades = document.getElementById('cidade')

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
    
selectEstados.addEventListener('change', async(event) => {
  let estadoSelecionado = event.target.value
  console.log(estadoSelecionado)

  const cidades = await obterCidade(estadoSelecionado)

  cidades.forEach(cidade => {
    const optionCidade = document.createElement('option')
    optionCidade.value = cidade.nome
    optionCidade.text = cidade.nome
    seletctCidades.appendChild(optionCidade)
    })
  })
  })


