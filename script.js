const consultarCep = () => {
  const cep = document.getElementById("cep").value;
  const uri = `https://cep.awesomeapi.com.br/json/${cep}`;

  console.log(`Uri:  ${uri}`);

  fetch(uri)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      const uf = json.state;
      const cidade = json.city;

      document.getElementById("logradouro").value = json.address;
      document.getElementById("ddd").value = json.ddd;
      document.getElementById("bairro").value = json.district;
      document.getElementById("uf").value = uf;

      carregarEstado(uf);
      carregarCidadesPorUF(uf, cidade);
    });
};

const carregarCidadesPorUF = (uf, cidadeSelecionada = "") => {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

  fetch(url)
    .then((response) => response.json())
    .then((cidades) => {
      const select = document.getElementById("localidade");
      select.innerHTML = '<option disabled selected>Selecione uma cidade</option>';

      cidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.text = cidade.nome;

        if (cidade.nome.toLowerCase() === cidadeSelecionada.toLowerCase()) {
          option.selected = true;
        }

        select.appendChild(option);
      });
    });
};

const carregarEstado = (ufSelecionada) => {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

  fetch(url)
    .then((response) => response.json())
    .then((estados) => {
      const select = document.getElementById("uf");
      select.innerHTML = '<option disabled selected>Selecione uma estado</option>';

      estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.nome;
        option.text = estado.nome;

        if (estado.sigla.toLowerCase() === ufSelecionada.toLowerCase()) {
          option.selected = true;
        }

        select.appendChild(option);
      });
    });
};