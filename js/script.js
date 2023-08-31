const DATA_URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265';


function obtenerDatos(){ 
    fetch(DATA_URL)
    .then(response => response.json())
    .then(data => mostrarLista(data))
    .catch(error=>alert(error));
}

function mostrarLista(lista) {    
    let datos = '';
    for (let i = 0; i < lista.length; i++) {
        datos += `<tr>
                    <td>${lista[i].nombre}</td>
                    <td>${lista[i].apellido}</td>
                    <td>${lista[i].grupo}</td>
                    <td>${lista[i].sala}</td>
                </tr>`;
    };
    document.getElementById("listaDatos").innerHTML = datos;
};

function agregarDatos(){
    
    let nom = document.getElementById('nombre').value;
    let ape = document.getElementById('apellido').value;
    let gru = document.getElementById('grupo').value;
    let sal = document.getElementById('sala').value;

    fetch(DATA_URL,
        {method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            nombre:nom,
            apellido: ape,
            grupo: gru,
            sala: sal,
        })}).then(alert('Se agregó con éxito'));
};

document.addEventListener("DOMContentLoaded", ()=>{
    
    const btnBorrarLista = document.getElementById('borrarLista');
    const btnVerLista = document.getElementById('verLista');
    const btnAgregarElem = document.getElementById('agregar');
    const btnBorrarElem = document.getElementById('');

    btnAgregarElem.addEventListener('click',()=>{agregarDatos()})
    btnVerLista.addEventListener('click',()=>{obtenerDatos(DATA_URL)});
});
