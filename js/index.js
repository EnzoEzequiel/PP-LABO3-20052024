import { Crypto } from "./Crypto.js";
import { escribirStorage, leerStorage, objectToJson } from "./local-storage.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

const items = await leerStorage() || [];

const frm = document.getElementById("form-item");
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminarTodo = document.getElementById("btnEliminarTodo");
const btnModificar = document.getElementById("btnModificar");

document.addEventListener("DOMContentLoaded", () => {
  manejadorTabla();
  console.log("dom content load luego de manejador de tabla");
  btnGuardar.addEventListener("click", manejadorCargarRegistro);
  btnModificar.addEventListener("click", manejadorModificar);
  btnEliminarTodo.addEventListener('click', manejadorEliminarTodo);
  document.addEventListener("click", manejadorClick);
});


function manejadorEliminarTodo() {
  if (confirm("¿Desea ELIMINAR TODOS los cryptos?")) {
    items.length = 0;
    try {
      escribirStorage("cryptos", objectToJson(items)); // Actualiza el almacenamiento
      manejadorTabla();
      actualizarFormulario()
    } catch (error) {
      console.error("Error al eliminar todos los cryptos:", error);
    }
    actualizarFormulario();
    document.getElementsByName("id")[0].setAttribute("id", '0'); // Reseteamos el id del formulario
  }
}


function manejadorClick(e) {
  if (e.target.matches(".btn-editar") || e.target.matches(".btn-eliminar")) {
    e.preventDefault();
  }
  if (e.target.matches(".btn-editar")) {
    const trElement = e.target.closest("tr"); 
    const id = parseFloat(trElement.dataset.id);
    const cryptoSeleccionado = items.find(c => c.id === id);

    if (cryptoSeleccionado) {
      console.log("Crypto Seleccionado:", cryptoSeleccionado);
    } else {
      console.log("No se encontró ningún Crypto con el ID especificado.");
    }

    document.getElementsByName("id")[0].setAttribute("id", cryptoSeleccionado.id);
    document.getElementById("nombre").value = cryptoSeleccionado.nombre;
    document.getElementById("simbolo").value = cryptoSeleccionado.simbolo;
    document.getElementById("precio").value = cryptoSeleccionado.precio;
    document.getElementById("consenso").value = cryptoSeleccionado.consenso;
    document.getElementById("circulacion").value = cryptoSeleccionado.circulacion;
    document.getElementById("algoritmo").value = cryptoSeleccionado.algoritmo;
    document.getElementById("sitioWeb").value = cryptoSeleccionado.sitioWeb;
    
  } 
  else if (e.target.matches(".btn-eliminar")) 
    {
      if (confirm("¿Desea ELIMINAR el crypto seleccionado?")) 
      {
        const id = parseFloat(e.target.closest("tr").dataset.id);
        const itemsActualizado = items.filter(p => p.id !== id);

        try {
          escribirStorage("Cryptos", objectToJson(itemsActualizado));
          items.length = 0;
          itemsActualizado.forEach(item => items.push(item));
          manejadorTabla();
          actualizarFormulario();
        } catch (error) {
          console.error("Error al eliminar el crypto:", error);
        }
      }
  } 
}

function manejadorCargarRegistro(e) {
  e.preventDefault();
  console.log("entro a manejador de cargas de registros");
  const nombre = document.getElementById("nombre").value;
  const simbolo = document.getElementById("simbolo").value;

  const precio = document.getElementById("precio").value;
  const consenso = document.getElementById("consenso").value;
  const circulacion = document.getElementById("circulacion").value;
  const algoritmo = document.getElementById("algoritmo").value;
  const sitioWeb = document.getElementById("sitioWeb").value;
  console.log("termino de leer values");
  
  if (validarParametros(nombre, simbolo, precio, consenso, circulacion, algoritmo, sitioWeb)) {
    const fechaCreacion = new Date().toISOString();
    console.log(sitioWeb);
    console.log(nombre);
    const nuevaCrypto =new Crypto ( nombre, simbolo,fechaCreacion, precio, consenso, circulacion, algoritmo, sitioWeb );
    console.log('crypto dado de alta correctamente');
    items.push(nuevaCrypto);
    escribirStorage('Cryptos', objectToJson(items));
    manejadorTabla();
    actualizarFormulario();
  } else {
    alert("La criptomoneda no pasó las validaciones");
  }
}


function manejadorTabla(e) {
  mostrarSpinner()
  delay(2000).then(() => {
    const tabla = createTable(items)
    const contenedor = document.getElementById("container-table");
    renderTabla(tabla, contenedor);
    console.log("renderizo tabla");
    ocultarSpinner();
  });
}

/*
Limpiamos la tabla y le escribimos todos los 
*/
function renderTabla(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild)
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}


function createTable(items) {
  console.log("entro a crear tabla");
  const tabla = document.createElement('table');
  tabla.classList.add('my-table');

  if (items.length > 0) {
    tabla.appendChild(createThead(Object.keys(items[0])));
    const tbody = createTbody(items);
    tabla.appendChild(tbody);
  } else {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'No hay cryptos disponibles';

    tr.appendChild(th);
    thead.appendChild(tr);
    tabla.appendChild(thead);
  }
  return tabla;
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function createTbody(items) {
  const tbody = document.createElement("tbody");
  items.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === 'id') {
        tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }
    const tdButtons = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");
    tdButtons.appendChild(btnEditar);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    tdButtons.appendChild(btnEliminar);

    tr.appendChild(tdButtons);

    tbody.appendChild(tr);
  });
  return tbody;
}




function createThead() {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  if (items.length > 0) {
    const keys = Object.keys(items[0]);
    keys.forEach(key => {
      if (key !== 'id') {
        const th = document.createElement("th");
        th.textContent = key;
        th.textContent = th.textContent.toUpperCase();
        tr.appendChild(th);
      }
    });
  } else {
    const th = document.createElement('th');
    th.textContent = 'No hay cryptos disponibles';
    tr.appendChild(th);
  }

  thead.appendChild(tr);
  return thead;
}

function actualizarFormulario() {
  frm.reset();
}

function manejadorModificar() {
  const idSeleccionado = parseFloat(document.getElementsByName("id")[0].getAttribute("id"));
  const cryptoSeleccionadoIndex = items.findIndex(c => c.id === idSeleccionado);

  if (cryptoSeleccionadoIndex !== -1) {
    const nombre = document.getElementById("nombre").value;
    const simbolo = document.getElementById("simbolo").value;
    const precio = document.getElementById("precio").value;
    const consenso = document.getElementById("consenso").value;
    const circulacion = document.getElementById("circulacion").value;
    const algoritmo = document.getElementById("algoritmo").value;
    const sitioWeb = document.getElementById("sitioWeb").value;

    items[cryptoSeleccionadoIndex] = new Crypto(nombre, simbolo, precio, consenso, circulacion, algoritmo, sitioWeb );

    try {
      escribirStorage("Cryptos", objectToJson(items));
      manejadorTabla();
      actualizarFormulario();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  } else {
    console.log("No se encontró ninguna criptomoneda con el ID especificado.");
  }
};



function validarParametros(nombre, simbolo, precio, consenso, circulacion, algoritmo, sitioWeb) {
  return (
    nombre.length > 2 &&
    simbolo.length > 0 &&
    precio > 0 &&
    consenso.length > 0 &&
    circulacion > 0 &&
    algoritmo.length > 0 &&
    sitioWeb.length > 0
  );
}

