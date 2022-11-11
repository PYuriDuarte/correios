

/*const pesquisarCep = () => {
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url).then(response => response.json()).then(console.log)
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);*/

const limparFormulario = (endereco) => {
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const pesquisarCep = async () => {
  
  limparFormulario();

  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  
  if(cepValido(cep)){

    const dados = await fetch(url);
    const endereco = await dados.json();

    if(endereco.hasOwnProperty('erro')){
      swal({
        title: "ERRO!",
        text: "CEP não existe.",
        icon: "error",
      });
    } else{
      preencherFormulario(endereco);
    }
  } else {
    swal({
      title: "INVÁLIDO!",
      text: "CEP não encontrado, tente novamente.",
      icon: "info",
    });
  }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);


