document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();

}


function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function(){
        if  (sobreFestival.getBoundingClientRect().top < 0  ){
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll')
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = document.querySelector(e.target.attributes.href.value);
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({behavior:'smooth'})
        })
    })
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="../../../build/img/thumb/${i}.webp" type="image/webp">
        <img width="200px" heigth="300px" loading="lazy" width="200" height="300" src="../../../build/img/thumb/${i}.webp" alt="imagen vocalista">`
        galeria.appendChild(imagen);
        imagen.onclick = function(){
            mostrarImagen(i)
        }
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="../../../build/img/grande/${id}.webp" type="image/webp">
    <img width="200px" heigth="300px" loading="lazy" width="200" height="300" src="../../../build/img/grande/${id}.webp" alt="imagen vocalista">`




    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        body.removeChild(overlay);
        
    }
    //Boton para cerrar
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        body.removeChild(overlay);
    }

    overlay.appendChild(cerrarModal);



    //Agregarlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')

}


