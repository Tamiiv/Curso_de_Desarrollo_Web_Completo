// getElementById 
/*
const heading2 = document.getElementById('heading');
console.log(heading2);
*/

// querySelector va a retornar ya sea ninguno o hasta un elemento que concuerde con el selector .clase #id
// En caso de tener más de un h2, podemos especificar por ejemplo: el h2 que esté en la clase header__texto
/*
const heading = document.querySelector('.header__texto h2');
console.log(heading)
*/

// Modificamos el heading
//heading.textContent = "Nuevo Heading";


// querySelectorAll retorna 0 si el selector está mal o no hay ningún elemento, hasta todos los elementos que concuerden con el selector
/*
const enlaces = document.querySelectorAll('.navegacion a')
console.log(enlaces);
*/

// Accedo solamente al primero para modificarle el texto
//enlaces[0].textContent = "Nuevo texto para enlace"
// Modificamos para que nos redirija a google
//enlaces[0].href = 'https://google.com'
// Agregar clase
//enlaces[0].classList.add('nueva-clase')
// Eliminar clase
//enlaces[0].classList.remove('navegacion__enlace');

// Generar código HTML con createElement
//const nuevoEnlace = document.createElement('A')
// Agregar href
//nuevoEnlace.href = 'nuevo-enlace.html';
// Agregar texto
//nuevoEnlace.textContent = 'Un nuevo enlace';
// Agregar la clase
//nuevoEnlace.classList.add('navegacion__enlace');
// Agregarlo al documento
//const navegacion = document.querySelector('.navegacion');
//navegacion.appendChild(nuevoEnlace);

//console.log(nuevoEnlace)

// Evento JS
//console.log(1)

/*
window.addEventListener('load', function(){ // load espera a que el JS y los archivos que dependen del HTML estén listos
    console.log(2)
});

window.addEventListener('DOMContentLoaded', function(){ // DOMContentLoaded espera que solo cargue el HTML, pero no espera los demás archivos. Carga más rápido y solo requerimos el html
    console.log(3)
});

console.log(4)
*/

// Seleccionar elementos y asociarles un evento
/*
const btnEnviar = document.querySelector('.boton--primario');
btnEnviar.addEventListener('click', function(e){
    console.log('Enviando formulario');
    // e -> evento que se pasa en automático hacía el callback cuando registramos una función con addEventListener
    e.preventDefault();
    // target es a lo que le hemos dado click
    console.log(e.target);
});
*/ 


// Eventos de los Inputs y Textarea

const datos = {
    nombre: '',
    email: '',
    mensaje: ''
}

const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario');

nombre.addEventListener('input', leerTexto) 
email.addEventListener('input', leerTexto)
mensaje.addEventListener('input', leerTexto)
// El Evento de Submit - Es importante tener un button o input de tipo submit para enviar/ejecutar los formularios
formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // Validar formulario
    const { nombre, email, mensaje} = datos;
    if(nombre === '' || email === '' || mensaje === ''){
        mostrarAlerta('Todos los campos son obligatorios', true);
        return;
    }


    // Enviar formulario
    mostrarAlerta('Datos enviados correctamente')
});


function leerTexto(e){
    // El nombre de las propiedades de mi objeto tiene que ser igual al del id del input
    datos[e.target.id] = e.target.value;
}

function mostrarAlerta(mensaje, error = null){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;

    if(error) alerta.classList.add('error');
    else alerta.classList.add('enviado');
    
    formulario.appendChild(alerta);

    // Desaparezca después de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}