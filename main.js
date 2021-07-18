async function getListService() {
  const res = await fetch("http://localhost:4800/list");
  const data = await res.json();
  return data;
}

async function createService(dni, nombre, apellido) {
  const res = await fetch("http://localhost:4800/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dni, nombre, apellido }),
  });
  const data = await res.json();
  return data;
  }

//Crear perro
async function createService2(nombredog, edad, raza) {
  const res = await fetch("http://localhost:4800/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombredog, edad, raza }),
  });
  const data = await res.json();
  return data;
}


//Drawcards
async function drawCards() {
  const books = await getListService();
  const booksContainer = document.getElementById("books-container");

  booksContainer.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const template = `
      <div class="col-6 mt-4">
        <div class="card">
          <div class="card-body">
            <h4>Nombre: ${book.nombre}</h4>
            <p>Apellido: ${book.apellido}</p>
          </div>
          <div class="card-header">DNI: ${book.dni}</div>
          <div class="card-footer">
            <button onclick="removeBook('${book.id}')" class="btn btn-danger">Eliminar</button>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalclientes">Editar</button>
            <button onclick="editBook('${book.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalperritos">Añadir Perrito</button>
          </div>
        </div>
      </div>
      `;
    booksContainer.innerHTML += template;
  }
}

//REMOVE
async function removeBookService(id) {
  const res = await fetch(`http://localhost:4800/delete/${id}`, {
    method: "delete",
  });
}
async function removeBook(id) {
  await removeBookService(id);
  await drawCards();
}

//EDIT
async function editBookservice(id) {
  console.log("editar")
  const res = await fetch(`http://localhost:4800/update/${id}`, {
    method: "edit",
  });
}


async function editBook(id) {
  await editBookservice(id);
  await drawCards();
}

async function createNewBook() {
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  await createService(dni, nombre, apellido);
  await drawCards();

  alert("Cliente Creado");
  dni.value = ""
  nombre.value = ""
}

//Modal Crear Perro
function guarda_cambios() {
  const nombredog = document.getElementById("nombre-editar");
  const edad = document.getElementById("edad-editar");
  const raza = document.getElementById("raza-editar");
  const btn = document.getElementById("btn-editar");

  if (nombredog.value && edad.value && raza.value) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
}

async function newPerro() {
  const nombredog = document.getElementById("nombre-editar").value;
  const edad = document.getElementById("edad-editar").value;
  const raza = document.getElementById("raza-editar").value;
  await createService(nombredog, edad, raza);
  await drawCards();

  alert("Perro del Cliente añadido a su ficha");
}



  // await drawCards();

  // setInterval(async () => {
  //   await drawCards();
  // }, 1000);
