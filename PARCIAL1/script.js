'use strict';

// Ejemplo de la estructura de un disco:
/*Al hacer clic en el botón "Cargar nuevo disco" se debe disparar la función Cargar que solicita al usuario la siguiente información de un disco:
Nombre del disco.
Autor o banda del disco.
Código numérico único del disco:
Si el usuario ingresa un código numérico que ya fue cargado, se deberá pedir otro código (hasta ingresar uno que no haya sido utilizado anteriormente).
Todas las pistas del disco, donde cada pista tiene un nombre y una duración:
La cantidad de pistas a ingresar NO debe ser fija.
No se debe preguntar cuántas pistas hay que cargar, el dato se desconoce.
Al finalizar la carga de una pista, se debe confirmar si se desea ingresar otra más.
Cuando el usuario decide dejar de cargar pistas, finaliza la acción de la función.
En todo caso debe validarse que los datos ingresados sean válidos:
El nombre del disco, autor/banda y nombre de la pista no pueden quedar vacíos.
El código numérico único del disco no puede ser menor a 1, ni mayor a 999.
La duración de cada pista debe estar entre 0 y 7200 (segundos) inclusive.
Al hacer clic en el botón "Mostrar discos", la función Mostrar debe mostrar cada disco con su nombre, autor/banda, código único y todas las pistas con sus respectivos datos: nombre y duración.
Hay que destacar visualmente con rojo las duraciones mayores a 180. */

let datosDisco = [];
let contadorDiscos = 0;

class TodoDisco {
  constructor() {
    this.nombre = '';
    this.autor = '';
    this.todasLasPistas = [];
    this.cantidadPistas = 0;
    this.duracionTotal = 0; // Nueva propiedad para almacenar la duración total del disco
  }

  validarString(msg) {
    let str;
    do {
      str = prompt(msg).trim();
    } while (!isNaN(str));
    return str;
  }

  validarCodigo() {
    let codigo;
    do {
      codigo = parseInt(prompt("Ingrese código del disco"));

      if (isNaN(codigo)) {
        alert("Error, debe ingresar un número válido.");
        continue;
      }

      if (codigo < 1 || codigo > 999) {
        alert("El código debe estar entre 1 y 999. Por favor, ingrese otro código.");
      }

      if (datosDisco.find(d => d.codigo === codigo)) {
        alert("El código ya fue ingresado, por favor ingrese otro código");
      }
    } while (isNaN(codigo) || codigo < 1 || codigo > 999 || datosDisco.find(d => d.codigo === codigo));

    this.codigo = codigo;
  }

  guardarPista(pista) {
    this.todasLasPistas.push(pista);
    this.cantidadPistas++;
  }

  promedioDisco() {
    if (this.todasLasPistas.length === 0) {
      return 0;
    }

    const duracionPromedio = this.duracionTotal / this.todasLasPistas.length;
    return duracionPromedio;
  }
  
  static duraciondiscomayor() {
    
        const duraciones = datosDisco.map(disc => disc.duracionTotal);

        const duracionMaxima = Math.max(...duraciones);
        
        for (let disc of datosDisco) {
              
        if (disc.duracionTotal === duracionMaxima) {
          return duracionMaxima;
              }
            }
          }

  pistamasLarga() {
    if (this.todasLasPistas.length === 0) {
      return null;
    }

    let pistalarga = this.todasLasPistas[0];
    for (let i = 1; i < this.todasLasPistas.length; i++) {
      if (this.todasLasPistas[i].duracion > pistalarga.duracion) {
        pistalarga = this.todasLasPistas[i];
      }
    }
    return pistalarga;
  }
}

class Pista {
  constructor() {
    this.nombre = "";
    this.duracion = 0;
  }

  validarNombrePista(msg) {
    let string;
    do {
      string = prompt(msg).trim();
    } while (!isNaN(string));
    return string;
  }

  validarPista() {
    let pista;
    do {
      pista = parseInt(prompt("Ingrese duración de la pista en segundos"));

      if (isNaN(pista)) {
        alert("Error, debe ingresar un número válido.");
        continue;
      }

      if (pista < 1 || pista > 7200) {
        alert("La duración debe estar entre 1 y 7200 segundos. Por favor, ingrese una duración correcta.");
      }

    } while (isNaN(pista) || pista < 1 || pista > 7200);

    return pista;
  }
}


function cargarDisco() {
  let disco = new TodoDisco();
  disco.nombre = disco.validarString("Ingrese el nombre del disco");
  disco.autor = disco.validarString("Ingrese el nombre del autor o banda del disco");
  disco.validarCodigo();

  let pista;
  do {
    pista = new Pista();
    pista.nombre = pista.validarNombrePista("Ingrese el nombre de la pista");
    pista.duracion = pista.validarPista();
    disco.guardarPista(pista);
    disco.duracionTotal += pista.duracion; // Calcula la duración total del disco actual

    
  } while (confirm("¿Desea cargar otra pista?"));

  datosDisco.push(disco);
  contadorDiscos++;
}

function mostrarDisco() {
  const infoDiv = document.getElementById('info');
  infoDiv.innerHTML = '';

  const contador = document.createElement('p');
  contador.textContent = `Cantidad de discos cargados: ${contadorDiscos}`;
  infoDiv.appendChild(contador);
  
  const duracioon = document.createElement('p');
  duracioon.textContent = `La duración mas alta entre todos sus discos es: ${TodoDisco.duraciondiscomayor()}`;
  infoDiv.appendChild(duracioon);

  datosDisco.forEach((disco) => {
    const discoTitulo = document.createElement('h3');
    discoTitulo.textContent = 'Datos del disco:';
    infoDiv.appendChild(discoTitulo);

    const nombreDisco = document.createElement('p');
    nombreDisco.textContent = `Nombre del disco: ${disco.nombre}`;
    infoDiv.appendChild(nombreDisco);

    const autorDisco = document.createElement('p');
    autorDisco.textContent = `Autor o banda: ${disco.autor}`;
    infoDiv.appendChild(autorDisco);

    const codigoDisco = document.createElement('p');
    codigoDisco.textContent = `Código del disco: ${disco.codigo}`;
    infoDiv.appendChild(codigoDisco);

    const cantidadPistas = document.createElement('p');
    cantidadPistas.textContent = `Cantidad de pistas: ${disco.cantidadPistas}`;
    infoDiv.appendChild(cantidadPistas);

    const promedio = disco.duracionTotal / disco.cantidadPistas; // Cambia el cálculo del promedio
    const promedio2 = document.createElement('p');
    promedio2.textContent = `Duración promedio: ${promedio.toFixed(2)} segundos`;
    infoDiv.appendChild(promedio2);

    const pistalarga = disco.pistamasLarga();
    if (pistalarga) {
      const pistalargaelement = document.createElement('p');
      pistalargaelement.textContent = `Pista más larga: ${pistalarga.nombre}, Duración: ${pistalarga.duracion} segundos`;
      infoDiv.appendChild(pistalargaelement);
    }

    const sumaDuracionTotal = document.createElement('p');
    sumaDuracionTotal.textContent = `Duración total del Disco: ${disco.duracionTotal} segundos`;
    infoDiv.appendChild(sumaDuracionTotal);

    const pistasTitulo = document.createElement('h4');
    pistasTitulo.textContent = 'Lista de pistas:';
    infoDiv.appendChild(pistasTitulo);

    const pistasUl = document.createElement('ul');

    disco.todasLasPistas.forEach((pista) => {
      const pistaLi = document.createElement('li');
      const duracionPista = pista.duracion.toString();

      let duracionMaxima = 0;
      let albumDestacado = null;
      

      pistaLi.textContent = `Nombre: ${pista.nombre}, Duración: ${duracionPista} segundos`;
      
       const duracionSpan = document.createElement('span');
      duracionSpan.textContent = `${duracionPista} segundos`;
      duracionSpan.style.fontSize = "20px";

      if (duracionPista >= 180){
                duracionSpan.style.color = "red";
      }      
     

    pistaLi.textContent = `Nombre: ${pista.nombre}, Duración: `;
    pistaLi.appendChild(duracionSpan);

         if (pista.duracion > duracionMaxima) {
      duracionMaxima = pista.duracion;
      albumDestacado = pista;
    }
      
      pistasUl.appendChild(pistaLi);
    });

    infoDiv.appendChild(pistasUl);


  });
}

function mostrarInformacion() {
  let codigoSeleccionado = prompt("Ingrese el código a mostrar:");

  let discoEncontrado = null;

  for (let disco of datosDisco) {
    if (disco.codigo === parseInt(codigoSeleccionado)) {
      discoEncontrado = disco;
      break;
    }
  }

  if (discoEncontrado !== null) {
    let html = '';
    html += `<p>Cantidad de discos cargados: ${contadorDiscos}</p>`;
    html += `<p>Información del disco con código ${codigoSeleccionado}</p>`;
    html += `<p>Nombre del disco: ${discoEncontrado.nombre}</p>`;
    html += `<p>Autor o banda: ${discoEncontrado.autor}</p>`;
    html += `<p>Código del disco: ${discoEncontrado.codigo}</p>`;
    html += `<p>Cantidad de pistas: ${discoEncontrado.cantidadPistas}</p>`;
    html += `<p>Duración promedio: ${discoEncontrado.promedioDisco().toFixed(2)} segundos</p>`;

    const pistaMasLarga = discoEncontrado.pistamasLarga();
    if (pistaMasLarga) {
      html += `<p>Pista más larga: ${pistaMasLarga.nombre}, Duración: ${pistaMasLarga.duracion} segundos</p>`;
    }

    html += `<p>Duración total de todas las pistas: ${discoEncontrado.todasLasPistas.reduce((total, pista) => total + pista.duracion, 0)} segundos</p>`;

    html += '<h4>Lista de pistas:</h4>';
    html += '<ul>';
    discoEncontrado.todasLasPistas.forEach((pista) => {
      html += `<li>Nombre: ${pista.nombre}, Duración: ${pista.duracion} segundos</li>`;
    });
    html += '</ul>';

    document.getElementById('info').innerHTML += html;
  } else {
    alert("El código no es válido o no ha sido agregado previamente.");
  }
}

function recomendaciones() {
    let codigo = prompt("Ingrese un Número del 1 al 4 para acceder a nuestra recomendaciones");
    let codigoValido = false;
    do {
      if (codigo === '1') {
        document.getElementById('imagen').src = 'img/harrys_h.jpg';
        document.getElementById('harryshouse').textContent = `Nombre del disco: Harry's House - Codigo : 1` ;
        document.getElementById('harrystiles').textContent = 'Nombre de la artista: Harry Styles';
        //aparecen errores con la musica
        document.getElementById('spotify').innerHTML = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5r36AJ6VOJtp00oxSkBZ5h?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
        codigoValido = true;

        

      } else if (codigo === '2') {
        document.getElementById('image').src = 'img/stromae.jpg';
        document.getElementById('racinecarree').textContent = 'Nombre del disco: Racine carrée - Codigo : 2';
        document.getElementById('stromae').textContent = 'Nombre del artista: Stromae';
        document.getElementById('musica').innerHTML = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/6uyslsVGFsHKzdGUosFwBM?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
        codigoValido = true;

      } else if (codigo === '3') {
        document.getElementById('imag').src = 'img/billie_happier.webp';
        document.getElementById('happierthanever').textContent = ' Nombre del disco: Happier than Ever Codigo : 3' ;
        document.getElementById('billieilish').textContent = 'Nombre de la artista: Billie Ilish';
        document.getElementById('music').innerHTML = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/0JGOiO34nwfUdDrD612dOp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
        codigoValido = true;

      } else if (codigo === '4') {

        document.getElementById('ima').src = 'img/pangea.jpg';
      
        document.getElementById('pangea').textContent = 'Nombre del disco: Pangea disco : 4';
        document.getElementById('losmesoneros').textContent = 'Nombre del autor: Los mesoneros';
        document.getElementById('mus').innerHTML = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4ZXSSk6W16s3Jn7EXOnVFU?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
        codigoValido = true;

      } else {
        alert('Código no válido. Por favor, ingrese un código válido (3290, 9892, 1693 o 5912).');
        codigo = prompt("Ingrese un código:");
      }
    } while (!codigoValido);
    
  }



/*let disco = {
  Nombre: prompt('El lado oscuro de la Programación'),
  Autor: 'Los Programadores Anónimos',
  Codigo: 1,
  Pistas: [
    {
      Nombre: 'Esa cajita loca llamada variablecita',
      Duracion: 200,
    },
    {
      Nombre: 'Nunca quise ser un NaN',
      Duracion: 180,
    },
    {
      Nombre: 'No quiero programar',
      Duracion: 90,
    },
    {
      Nombre: 'Bajo presión',
      Duracion: 240,
    },
    {
      Nombre: 'La odisea de las variables privadas',
      Duracion: 120,
    },
    {
      Nombre: 'Sr. Programador',
      Duracion: 720,
    },
  ],
};

// Discos:
let discos = [];

// Función Cargar:
const Cargar = () => {
  // Cositas:
};

// Función Mostrar:
const Mostrar = () => {
  // Variable para ir armando la cadena:
  let html = '';

  // Cositas:

  // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
  document.getElementById('info').innerHTML = html; // <--- ahí es acá
}; */
