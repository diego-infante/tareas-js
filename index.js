// Selectores
const formularioTarea = document.querySelector("#formulario-tarea");
const tareaInput = document.querySelector("#tarea-input");
const listaTareas = document.querySelector("#lista-tareas");
const totalTareas = document.querySelector("#total-tareas");
const tareasCompletadas = document.querySelector("#tareas-completadas");
const tareasIncompletas = document.querySelector("#tareas-incompletas");
const mensajeErrorTarea = document.querySelector("#mensaje-error-tarea");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para agregar una nueva tarea
function agregarTarea(evento) {
  evento.preventDefault(); // Prevenir el envío del formulario

  const textoTarea = tareaInput.value.trim();
  if (textoTarea === "") {
    mensajeErrorTarea.style.display = "block";
    return;
  } else {
    mensajeErrorTarea.style.display = "none";
  }

  const nuevaTarea = {
    id: Date.now(), // Usar la marca de tiempo como un ID simple
    texto: textoTarea,
    completada: false,
  };

  tareas.push(nuevaTarea);
  guardarTareas();
  mostrarTareas();
  tareaInput.value = ""; // Limpiar el input
}

// Función para mostrar las tareas
function mostrarTareas() {
  listaTareas.innerHTML = ""; // Limpiar la lista

  tareas.forEach((tarea) => {
    const elementoTarea = document.createElement("li");
    elementoTarea.classList.add("item-tarea");

    const botonCompletar = document.createElement("button");
    botonCompletar.classList.add("boton-completar");
    botonCompletar.textContent = "✔";
    botonCompletar.addEventListener("click", () =>
      marcarComoCompletada(tarea.id)
    );

    const textoTareaElemento = document.createElement("p");
    textoTareaElemento.classList.add("texto-tarea");
    textoTareaElemento.textContent = tarea.texto;
    if (tarea.completada) {
      textoTareaElemento.classList.add("completada");
    }

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "✖";
    botonEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    elementoTarea.appendChild(botonCompletar);
    elementoTarea.appendChild(textoTareaElemento);
    elementoTarea.appendChild(botonEliminar);

    listaTareas.appendChild(elementoTarea);
  });

  actualizarContadoresTareas();
}

// Función para marcar una tarea como completada
function marcarComoCompletada(id) {
  tareas = tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
  );
  guardarTareas();
  mostrarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
  guardarTareas();
  mostrarTareas();
}

// Función para actualizar los contadores de tareas
function actualizarContadoresTareas() {
  const total = tareas.length;
  const hechas = tareas.filter((tarea) => tarea.completada).length;
  const pendientes = total - hechas;

  totalTareas.textContent = `TOTAL DE TAREAS: ${total}`;
  tareasCompletadas.textContent = `TAREAS COMPLETADAS: ${hechas}`;
  tareasIncompletas.textContent = `TAREAS INCOMPLETAS: ${pendientes}`;
}

// Función para guardar las tareas en el almacenamiento local
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Event Listeners
formularioTarea.addEventListener("submit", agregarTarea);

// Mostrar las tareas iniciales
mostrarTareas();
