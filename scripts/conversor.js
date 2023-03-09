const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

  let moedaOrigem = document.getElementById('origem').value
  let moedaSaida = document.getElementById('saida').value
  let valorInput = parseFloat(document.getElementById('valor-origem').value)


  fetch(`https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaSaida}`)
    .then(response => response.json())
    .then(data => {
      const cotacao = data[`${moedaOrigem}${moedaSaida}`]['bid'];
      const valorConvertido = valorInput * cotacao;
      
      const dataAtual = new Date
      const dataFormatada = new Intl.DateTimeFormat('pt-BR', { 
        dateStyle: 'short',
        timeStyle: 'long',
        timeZone: 'America/Sao_Paulo'
      })

      const resultado = document.getElementById('valor-conversao');
      const texto = document.getElementById('texto-conversao')

      if (moedaSaida == 'BRL') {
        const formatoReal = valorConvertido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
        resultado.innerHTML = formatoReal
      } if (moedaSaida == 'USD') {
        const formatoDolar = valorConvertido.toLocaleString('en-US', { style: 'currency', currency: 'USD'})
        resultado.innerHTML = formatoDolar
      } if (moedaSaida == 'EUR') {
        const formatoEuro = valorConvertido.toLocaleString('de-DE', { style: 'currency', currency: 'EUR'})
        resultado.innerHTML = formatoEuro
      } if (moedaSaida == 'JPY') {
        const formatoIene = valorConvertido.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY'})
        resultado.innerHTML = formatoIene
      } if (moedaSaida == 'CNY') {
        const formatoYuan = valorConvertido.toLocaleString('zn-CN', { style: 'currency', currency: 'CNY'})
        resultado.innerHTML = formatoYuan
      }  if (moedaSaida == 'BTC') {
        resultado.innerHTML = `${valorConvertido.toFixed(2)}BTC`
      }

      texto.innerHTML = `Cotação: ${cotacao} | Obtida em ${dataFormatada.format(dataAtual)}`
    })
    .catch(error => {
      const texto = document.getElementById('texto-conversao')
      texto.innerHTML = 'Não foi possível realizar a conversão'
    })
})