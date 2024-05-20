var yearElement = document.getElementById("year");
        var currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;

// CONTROL LISTA DE CRIPTOS
const tbody = document.querySelector('#tabla tbody');
tbody.innerHTML = ''; // LIMPIAR COLUMNAS


// llenar consenso
const consensoSelect = document.getElementById('consenso');
consensoSelect.innerHTML = '';
['Seleccione', 'Proof of Work', 'Proof of Stake'].forEach(option => {
  const opt = document.createElement('option');
  opt.value = option.toLowerCase().replace(/\s/g, ''); // Convert to lowercase and remove spaces
  opt.textContent = option;
  consensoSelect.appendChild(opt);
});

// LLENAR ALGORITMO
const algoritmoSelect = document.getElementById('algoritmo');
algoritmoSelect.innerHTML = '';
['Seleccione', 'SHA-256', 'Ethash', 'Scrypt', 'X11'].forEach(option => {
  const opt = document.createElement('option');
  opt.value = option.toLowerCase().replace(/\s/g, ''); // LOWER CASE Y BORRO LOS ESPACIOS
  opt.textContent = option;
  algoritmoSelect.appendChild(opt);
});

cryptos.forEach(crypto => {
  const row = tbody.insertRow();
  row.insertCell(0).textContent = crypto.id;
  row.insertCell(1).textContent = crypto.nombre;
  row.insertCell(2).textContent = crypto.simbolo;
  //EVENTO PARA CADA FILA
  row.addEventListener('click', () => {
    // POBLAR COLUMNASSSSS
    document.getElementById('nombre').value = crypto.nombre;
    document.getElementById('simbolo').value = crypto.simbolo;






  });
});

//VALIDACIONES
function validarFormulario() {
  var verificar = true;
  var nombres = document.getElementById("nombre").value;
  var simbolo = document.getElementById("simbolo").value;

  if (!nombres || !simbolo || !precio || !circulacion || !consenso || !algoritmo || !sitio) 
  {
      alert("Por favor complete todos los campos correctamente.");
      verificar = false;
  }

  if (verificar) {
    mostrarSpinner(); 
    setTimeout(function() {
      spinner.style.display = 'none';
    }, 2000);
    guardarDatos();
    ocultarSpinner(); 
  }
}
//SPINNER
function mostrarSpinner() {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'flex';
  setTimeout(function() {
      spinner.style.display = 'none';
  }, 2000);
}

function ocultarSpinner() {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}

function guardarDatos() {
  var nombres = document.getElementById("nombre").value;
  var simbolo = document.getElementById("simbolo").value;

  var tabla = document.getElementById('tabla').querySelector('tbody');
  var row = tabla.insertRow();
  row.insertCell(0).textContent = nombres;
  row.insertCell(1).textContent = simbolo;
  
  document.getElementById("nombre").value = "";
  document.getElementById("simbolo").value = "";
  
}

window.onload = function() {
  var formulario = document.getElementById('cryptoForm');
  formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      validarFormulario();
  });
};
