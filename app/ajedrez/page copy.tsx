'use client'

import React from 'react';


export default function Ajedrez() {
  const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  let piezaSeleccionada: HTMLElement | null;

  //Borrar la pieza seleccionada y todas las casillas marcadas como accesible
  function limpiarAccesibles(){
    let contenedorPrincipal = document.querySelector('#contenedorPrincipal')
    if (!contenedorPrincipal){
      return
    } 
    let children = contenedorPrincipal.children;
    for (let contador = 0; contador<children.length; contador++){
      let seleccionado = children[contador] as HTMLElement;
      seleccionado.dataset.accesible = "false"
      let marcador = seleccionado.querySelector("span");
      if(marcador){
        console.log(seleccionado.textContent)
        seleccionado.removeChild(marcador);
      }
    }
    piezaSeleccionada = null;


  }
 //Funcion para dado un array de posiciones, asignarlas como accesibles
  function marcarAccesibles(arrayPiezas: HTMLElement[], seleccion: HTMLElement){

    console.log(arrayPiezas);



      arrayPiezas.map((casilla) => {
        let marcador = document.createElement("span")
        marcador.textContent = "x"
        casilla.append(marcador);
        casilla.dataset.accesible = "true"
        piezaSeleccionada = seleccion;    
      })
  }


//EN CLICK
  function moverPieza(e: Event){
    let seleccion = e.currentTarget as HTMLElement
    if (!seleccion){
      return
    }
    console.log(seleccion.id)


    //Si has clicado en una casilla a la que te pueds mover
    if(seleccion.dataset.accesible=="true" && piezaSeleccionada!=null){
      seleccion.dataset.pieza=piezaSeleccionada.dataset.pieza;
      let piezaImagen = piezaSeleccionada.querySelector('img');
      if (!piezaImagen){
        return
      }
      seleccion.append(piezaImagen);
      piezaSeleccionada.dataset.pieza = "";
      seleccion.dataset.accesible = "false";
      limpiarAccesibles();
      //Acabo la ejecucion para que no me marque la siguiente casilla como accesible immediatamente
      return
    }

    //Si no has clicado en una casilla a la que te puedes mover
    else{
      limpiarAccesibles();
    }


    if(seleccion.dataset.pieza=="Peon"){
      console.log("Peon!")
      
      let posiciones = [];

      if(seleccion.dataset.movido=="false"){
        console.log("No movido!")
        let sumado = Number(seleccion.id[1])+2
        let casillaFutura = seleccion.id[0] + sumado
        let elemento = document.querySelector('#'+casillaFutura) as HTMLElement
        posiciones.push(elemento);
      }

      let sumado = Number(seleccion.id[1])+1
      let casillaFutura = seleccion.id[0] + sumado
      let elemento = document.querySelector('#'+casillaFutura) as HTMLElement
      posiciones.push(elemento);

      marcarAccesibles(posiciones, seleccion)
    }

  }






  return (
    <div className="h-200 w-200 grid grid-rows-8 grid-cols-8 *:aspect-square" id="contenedorPrincipal">
      {/* FILAS */}
      {ranks.map((rank) => (
        // CONTENEDOR YA QUE REACT SOLO PUEDE DEVOLVER UN ELEMENTO
        <React.Fragment key={rank}>
          {/* CASILLAS */}
          {files.map((file) => {

            const fileIndex = files.indexOf(file) + 1; // 1..8
            const isWhite = (fileIndex + rank) % 2 !== 0;
            const id = `${file}${rank}`;
            let clases = "text-emerald-500 text-xl ";
            if (isWhite){
              clases+="bg-white"
            }

            let pieza = ""


            if (rank==2){
              pieza="Peon"
            }


            let piezaImagen = ""

            if (pieza=="Peon"){
              piezaImagen = "peonBlanco"
            }


            return <div key={id} id={id} className={clases} data-accesible={false} data-pieza={pieza} data-movido={false} onClick={moverPieza}> {piezaImagen && <img src={"/ajedrez/"+piezaImagen+".png"}></img>}  </div>;
          })}
        </React.Fragment>
      ))}
    </div>



  );
  
}