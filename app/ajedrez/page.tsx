'use client'

import React, { useState } from 'react';


export default function Ajedrez() {
  const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const [piezaSeleccionada, setPiezaSeleccionada] = useState<interfazTablero | null>(null);

  interface interfazTablero {
    posicion: string;
    movido: boolean;
    accesible: boolean;
    pieza: string;
    colorCasilla: string;
    color: string;
  }

  let objetoTablero: interfazTablero[] = []

  ranks.map((rank) => {
    files.map((file) => {
      let colorCasilla = ""

      const fileIndex = files.indexOf(file) + 1; // 1..8
      let posicionCombinada = rank + fileIndex;
      if (posicionCombinada % 2 != 0) {
        colorCasilla = "bg-white"
      }

      let pieza = ""
      let color = ""

      if (rank == 2) {
        pieza = "peonBlanco"
        color = "blanco"
      }
      if (rank == 7) {
        pieza = "peonNegro"
        color = "negro"
      }




      objetoTablero.push({
        posicion: (file + rank),
        movido: false,
        accesible: false,
        pieza: pieza,
        colorCasilla: colorCasilla,
        color: color
      })
    })
  })


  const [tablero, modificarTablero] = useState(objetoTablero);

  //Borrar la pieza seleccionada y todas las casillas marcadas como accesible
function limpiarAccesibles() {
  modificarTablero(prevTablero =>
    prevTablero.map(casilla => ({
      ...casilla,          // copy all existing properties
      accesible: false,    // overwrite the one you want to change
    }))
  );
}
  //Funcion para dado un array de posiciones, asignarlas como accesibles
function marcarAccesibles(arrayPiezas: interfazTablero[], seleccion: interfazTablero) {
  modificarTablero(prevTablero =>
    prevTablero.map(casilla => ({
      ...casilla,
      accesible: arrayPiezas.some(p => p.posicion === casilla.posicion)
    }))
  );
  setPiezaSeleccionada(seleccion);    
}

  //Encapsulo esta funcion para no tener que escribir el find completo cada vez.
  function buscarPieza(casillaUsuario: string) {    
    let casilla = tablero.find((elemento) => {
      return elemento.posicion == casillaUsuario;
    })
    return casilla
  }

  //Funcion para modificar la posicion de una pieza
  function actualizarPosicion(casillaSeleccionada: interfazTablero){

    modificarTablero(prevTablero =>
    prevTablero.map(casilla => {
      if(casilla.posicion==casillaSeleccionada.posicion && piezaSeleccionada){
        return{
          ...casilla,
          pieza: piezaSeleccionada.pieza,
          movido: true,
          color: piezaSeleccionada.color
        }
      }
      if( piezaSeleccionada && casilla.posicion==piezaSeleccionada.posicion){
        return{
          ...casilla,
          pieza: "",
          color: ""
        }
      }
      //EN CASO DE QUE NO ENCUENTRE NADA NO HACE NADA
      return{
        ...casilla
      }
    })
  );



      // casilla.pieza = piezaSeleccionada.pieza;
      // casilla.piezaImagen = piezaSeleccionada.piezaImagen
      // piezaSeleccionada.pieza = "";
      limpiarAccesibles();
  }

  //EN CLICK
  function moverPieza(casillaUsuario: string) {    
    let seleccion
    let casilla = buscarPieza(casillaUsuario);
    
    if (!casilla) {
      return
    }
    seleccion = casilla



    //Si has clicado en una casilla a la que te pueds mover
    if (casilla.accesible == true && piezaSeleccionada != null) {
      console.log("YAYYAY")
      actualizarPosicion(casilla)

      //Acabo la ejecucion para que no me marque la siguiente casilla como accesible immediatamente
      return
    }

    //Si no has clicado en una casilla a la que te puedes mover
    else {
      console.log("naynay")
      console.log(casilla)
      limpiarAccesibles();
    }








    //PEON BLANCO

    if (casilla.pieza == "peonBlanco") {

      let posiciones = [];

      console.log(casilla)

      if (casilla.movido == false) {
        let sumado = Number(casilla.posicion[1]) + 2
        let casillaFutura = casilla.posicion[0] + sumado


        let elemento = buscarPieza(casillaFutura);


      if (elemento != null && elemento.pieza=="") {
          posiciones.push(elemento);
        }

      }

      let sumado = Number(casilla.posicion[1]) + 1
      let casillaFutura = casilla.posicion[0] + sumado
      let elemento = buscarPieza(casillaFutura);

      if (elemento != null && elemento.pieza=="" ) {
        posiciones.push(elemento);
      }



        let posicionBase = files.indexOf(casilla.posicion[0]);
        let izquierda = posicionBase-1
        let derecha = posicionBase+1;
        let diagonalIzquierda =  files[izquierda] + sumado
        let diagonalDerecha = files[derecha] + sumado;

        let posicionDiagonalIzquierda = buscarPieza(diagonalIzquierda)
        let posicionDiagonalDerecha = buscarPieza(diagonalDerecha)

        if (posicionDiagonalIzquierda && posicionDiagonalIzquierda.pieza!="" && posicionDiagonalIzquierda.color=="negro"){
          posiciones.push(posicionDiagonalIzquierda);
        }
        if (posicionDiagonalDerecha && posicionDiagonalDerecha.pieza !="" && posicionDiagonalDerecha.color=="negro"){
          posiciones.push(posicionDiagonalDerecha);
        }


      if (!posiciones) {
        return
      }
      marcarAccesibles(posiciones, seleccion)
    }
    //PEON NEGRO

    if (casilla.pieza == "peonNegro") {

      let posiciones = [];

      console.log(casilla)

      if (casilla.movido == false) {
        let sumado = Number(casilla.posicion[1]) - 2
        let casillaFutura = casilla.posicion[0] + sumado


          let elemento = buscarPieza(casillaFutura);


      if (elemento != null && elemento.pieza=="") {
          posiciones.push(elemento);
        }

      }

      let sumado = Number(casilla.posicion[1]) - 1
      let casillaFutura = casilla.posicion[0] + sumado
      let elemento = buscarPieza(casillaFutura);

      if (elemento != null && elemento.pieza=="") {
        posiciones.push(elemento);
      }

        let posicionBase = files.indexOf(casilla.posicion[0]);
        let izquierda = posicionBase-1
        let derecha = posicionBase+1;
        let diagonalIzquierda =  files[izquierda] + sumado
        let diagonalDerecha = files[derecha] + sumado;

        let posicionDiagonalIzquierda = buscarPieza(diagonalIzquierda)
        let posicionDiagonalDerecha = buscarPieza(diagonalDerecha)

        if (posicionDiagonalIzquierda && posicionDiagonalIzquierda.pieza!="" && posicionDiagonalIzquierda.color=="blanco"){
          posiciones.push(posicionDiagonalIzquierda);
        }
        if (posicionDiagonalDerecha && posicionDiagonalDerecha.pieza!="" && posicionDiagonalDerecha.color=="blanco"){
          posiciones.push(posicionDiagonalDerecha);
        }

        console.log(posiciones)

      if (!posiciones) {
        return
      }
      marcarAccesibles(posiciones, seleccion)
    }


  }






  return (
    <div className="h-200 w-200 grid grid-rows-8 grid-cols-8 *:aspect-square" id="contenedorPrincipal">
      {tablero.map((casilla) => (
        <div key={casilla.posicion} id={casilla.posicion} className={`text-emerald-500 text-7xl ` + casilla.colorCasilla} data-accesible={false} data-pieza={casilla.pieza} data-movido={false} onClick={((e) => moverPieza(casilla.posicion))}> {casilla.pieza && <img src={"/ajedrez/" + casilla.pieza + ".png"}></img>} {casilla.accesible == true && <div>x</div>} </div>
      ))}
    </div>



  );

}