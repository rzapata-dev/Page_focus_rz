const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const 
 banner= document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const botonIniciarPausar = document.querySelector('#start-pause');
const inputMusicaEnfoque = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

const iconoPauseOplay=document.querySelector('.app__card-primary-butto-icon');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

const bubblesContainer = document.querySelector('.bubbles-container');


musica.loop = true;

inputMusicaEnfoque.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos=1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos=300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos=900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {
    mostrarTiempo()
    botones.forEach(function (botonContexto){
        botonContexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    
    banner.setAttribute('src', `/imagenes/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
            `;
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('¡Tiempo finalizado!');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent="Pausar";

    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();

};

botonIniciarPausar.addEventListener('click', iniciarOpausar);

function iniciarOpausar() {
    iconoPauseOplay.setAttribute('src',`/imagenes/pause.png`);
    if(idIntervalo){
        
        audioPausa.play();
       //
       // .setAttribute('src', `/imagenes/${contexto}.png`);
       
        reiniciar();
        iconoPauseOplay.setAttribute('src',`/imagenes/play_arrow.png`);
        return;
        
    }
 
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
   
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent="Comenzar";
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000) 
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo()
// Generar burbujas de forma aleatoria

function crearBurbujas() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Tamaño aleatorio entre 5 y 20px para más burbujas
    const size = Math.random() * 15 + 5;  // Cambié el rango de tamaño
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Posición horizontal aleatoria
    bubble.style.left = `${Math.random() * 100}%`;

    // Duración de la animación aleatoria (más corto para más burbujas rápidas)
    const duration = Math.random() * 3 + 3; // Entre 3 y 6 segundos
    bubble.style.animationDuration = `${duration}s`;

    // Agrega la burbuja al contenedor
    bubblesContainer.appendChild(bubble);

    // Eliminar burbuja después de la animación
    setTimeout(() => {
        bubble.remove();
    }, duration * 1000); // Convertir a milisegundos
}

// Crear burbujas de manera continua
setInterval(crearBurbujas, 300); // Aumenté la frecuencia para más burbujas