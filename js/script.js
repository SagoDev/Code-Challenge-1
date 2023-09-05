const DATA_URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265';
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$^\s*$/, 
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    grupo: /^\d{3}$/,
    sala: /^\d{1,2}$/ 
}

function obtenerDatos(flag){ 
    fetch(DATA_URL)
    .then(response => response.json())
    .then(data => mostrarLista(data,flag))
    .catch(error=>alert(error));
}

function validarDatos(){

}
function agregarDatos(){
    let nom = document.getElementById('nombre');
    let ape = document.getElementById('apellido');
    let gru = document.getElementById('grupo');
    let sal = document.getElementById('sala');

    fetch(DATA_URL,
        {method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body:JSON.stringify({
            nombre: nom.value,
            apellido: ape.value,
            grupo: gru.value,
            sala: sal.value
        })}).then(()=>{ nom.value = '';
                        ape.value = ''; 
                        gru.value = ''; 
                        sal.value = '';
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se agregó con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
};

function mostrarLista(lista,flag) {    
    let datos = "";
    for (let i = 0; i < lista.length; i++) {
        datos += `<tr>
                    <td>${lista[i].nombre}</td>
                    <td>${lista[i].apellido}</td>
                    <td>${lista[i].grupo}</td>
                    <td>${lista[i].sala}</td>
                    <td>${`<button type="button" class="btnEliminar btn btn-outline-danger" id="${lista[i]._id}" >Eliminar</button>`}</td>`;
    };
    if(flag){        
        document.getElementById('listaDatos').innerHTML = datos;
        document.getElementById('verLista').innerHTML = "Ocultar Lista";
    }
    else{
        document.getElementById('listaDatos').innerHTML = "";
        document.getElementById('verLista').innerHTML = "Mostrar Lista";

    }    
};

function eliminarElemento(idElem){
Swal.fire({
    title: 'Estas Seguro?',
    text: "Esto no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminalo!',
    cancelButtonText: 'No, dejalo!'    
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/${idElem}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            })            
            Swal.fire(
                'Eliminado!',
                'El registro fue eliminado.',
                'success'
            )
            obtenerDatos(true);                    
        }
    })
};

document.addEventListener("DOMContentLoaded", ()=>{
    
    const btnVerLista = document.getElementById('verLista');
    const tabla = document.getElementById('tablaDatos');
    const formulario = document.getElementById('formulario');
    const inputForm = document.getElementsByClassName('form-control');
    let flagShowList = false;

    btnVerLista.addEventListener('click',()=>{
        flagShowList = !flagShowList;
        obtenerDatos(flagShowList);
    });

    tabla.addEventListener('click', (e) => {
        let boton = e.target;
        if (boton.classList.contains('btnEliminar')) {
            eliminarElemento(boton.id);
        }
    });

    formulario.addEventListener('click',(e)=>{ 
        if(e.target.classList.contains('btnAgregar')){
            agregarDatos();
        }       
        
    });
});