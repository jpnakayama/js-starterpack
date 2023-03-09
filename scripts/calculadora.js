let pesoInput = document.getElementById('peso')
let alturaInput = document.getElementById('altura')
let imcSpan = document.getElementById('resultado-imc')
let faixaSpan = document.getElementById('faixa-imc')
let divResultado = document.getElementById('resultado-calculo')


function calculaIMC() {

  let peso = parseInt(pesoInput.value)
  let altura = parseInt(alturaInput.value)

  let imc = (peso * 10000/ (altura*altura)).toFixed(2)

  imcSpan.innerHTML = `Seu IMC é ${imc}`

  if(imc < 18.5) {
    faixaSpan.innerHTML = 'Faixa de IMC: Baixo peso';
  } else if(imc >= 18.6 && imc < 24.99) {
    faixaSpan.innerHTML = 'Faixa de IMC: Peso normal';    
  } else if(imc >= 25 && imc < 29.99) {
    faixaSpan.innerHTML = 'Faixa de IMC: Sobrepeso';    
  } else if(imc >= 30 && imc < 34.99) {
    faixaSpan.innerHTML = 'Faixa de IMC: Obesidade grau I';    
  } else if(imc >= 35 && imc < 39.99) {
    faixaSpan.innerHTML = 'Faixa de IMC: Obesidade grau II';    
  } else {
    faixaSpan.innerHTML = 'Faixa de IMC: Obesidade grau III';    
  }

  divResultado.style.display = 'flex'

  pesoInput.value = ''
  alturaInput.value = ''
}
