// Variables
const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

const tbody = document.querySelector('#tabla tbody');
const consensoSelect = document.getElementById('consenso');
const algoritmoSelect = document.getElementById('algoritmo');


function populateSelect(selectElement, options) {
  selectElement.innerHTML = '';
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.toLowerCase().replace(/\s/g, '');
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
}

function clearTable() {
  tbody.innerHTML = '';
}

function renderCryptoData(cryptos) {
  cryptos.forEach(crypto => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = crypto.id;
    row.insertCell(1).textContent = crypto.nombre;
    row.insertCell(2).textContent = crypto.simbolo;
    
    row.addEventListener('click', () => {
      document.getElementById('nombre').value = crypto.nombre;
      document.getElementById('simbolo').value = crypto.simbolo;
      
    });
  });
}

function deleteAllCryptos() {
  if (confirm("¿Está seguro de que desea eliminar todas las monedas?")) {
    clearTable();
  }
}

function validarFormulario() {
  var verificar = true;
  var nombres = document.getElementById("nombre").value;
  var simbolo = document.getElementById("simbolo").value;

  if (!nombres || !simbolo) {
      alert("Por favor complete todos los campos correctamente.");
      verificar = false;
  }
  return verificar;
}


function mostrarSpinner() {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'flex';
}

function ocultarSpinner() {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}


window.onload = function() {

  populateSelect(consensoSelect, ['Seleccione', 'Proof of Work', 'Proof of Stake']);
  populateSelect(algoritmoSelect, ['Seleccione', 'SHA-256', 'Ethash', 'Scrypt', 'X11']);


  var formulario = document.getElementById('cryptoForm');
  formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validarFormulario()) {
        mostrarSpinner();
        setTimeout(() => {
          guardarDatos();
          ocultarSpinner();
        }, 2500); 
      }
  });

  var eliminarTodosBtn = document.getElementById('eliminarTodos');
  eliminarTodosBtn.addEventListener('click', deleteAllCryptos);
};

function guardarDatos() {
  var nombre = document.getElementById("nombre").value;
  var simbolo = document.getElementById("simbolo").value;
  var fechaCreacion = document.getElementById("fechaCreacion").value; 
  var precioActual = document.getElementById("precioActual").value; 
  var cantidadCirculacion = document.getElementById("cantidadCirculacion").value; 
  var algoritmo = document.getElementById("algoritmo").value; 
  var sitioWeb = document.getElementById("sitioWeb").value; 

  var tabla = document.getElementById('tabla').querySelector('tbody');
  var row = tabla.insertRow();
  row.insertCell(0).textContent = nombre;
  row.insertCell(1).textContent = simbolo;
  row.insertCell(2).textContent = fechaCreacion;
  row.insertCell(3).textContent = precioActual;
  row.insertCell(4).textContent = cantidadCirculacion;
  row.insertCell(5).textContent = algoritmo;
  row.insertCell(6).textContent = sitioWeb;

  // limpiar luego de guardar
  document.getElementById("nombre").value = "";
  document.getElementById("simbolo").value = "";
  document.getElementById("fechaCreacion").value = "";
  document.getElementById("precioActual").value = "";
  document.getElementById("cantidadCirculacion").value = "";
  document.getElementById("algoritmo").value = "";
  document.getElementById("sitioWeb").value = "";
}
