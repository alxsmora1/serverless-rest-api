const url = "http://localhost:5001/serverless-api-f8063/us-central1/api/pets";

const fetchPets = async () => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

const darDeAlta = async id => {
  event.target.parentElement.parentElement.remove();
  await fetch(`${url}/${id}/daralta`);
}

const tableTemplate = ({ _id, nombre, tipo, descripcion }) => `
  <tr>
  <td>${nombre}</td>
  <td>${tipo}</td>
  <td>${descripcion}</td>
  <td><button class="btn btn-primary" onclick="darDeAlta('${_id}')">Dar de alta</button></td>
  </tr>
`
const handleSubmit = async e => {
  e.preventDefault()
  const { nombre, tipo, descripcion } = e.target;
  
  const data = {
    nombre: nombre.value,
    tipo: tipo.value,
    descripcion: descripcion.value,
  }

  nombre.value = '';
  tipo.value = '';
  descripcion.value = '';

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const json = await response.json();
  const template =  tableTemplate({
    ...data,
    _id: json,
  })
  const tabla = document.getElementById('tableTemplate');
  tabla.insertAdjacentHTML('beforeend', template);

}

window.onload = async () => {
  const petForm = document.getElementById('pet-form');
  petForm.onsubmit = handleSubmit;
  const pets = await fetchPets();
  const template = pets.reduce((acc, el) =>
    acc + tableTemplate(el), ''
  ); 
  const tabla = document.getElementById('tableTemplate');
  tabla.innerHTML = template;
}
