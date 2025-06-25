const consultarCep = () => {
  const cep = document.getElementById("cep").value;

  let uri = `https://cep.awesomeapi.com.br/json/${cep}`;

  console.log(`Uri:  ${uri}`);

  fetch(uri)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      document.getElementById("logradouro").value = json.address;
      document.getElementById("ddd").value = json.ddd;
      document.getElementById("bairro").value = json.district;
      document.getElementById("uf").value = json.state;
    });
};
