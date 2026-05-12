'use client'

import React from 'react';


export default function Ajedrez() {
  const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  function moverPieza(e: Event){
    let seleccion = e.currentTarget as HTMLElement
    if (!seleccion){
      return
    }
    console.log(seleccion.id)

    if(seleccion.dataset.pieza=="Peon"){
      console.log("Peon!")
      
      if(seleccion.dataset.movido=="false"){
        console.log("No movido!")
      }

    }

  }

  return (
    <div className="h-200 w-200 grid grid-rows-8 grid-cols-8 *:aspect-square">
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


            return <div key={id} id={id} className={clases} data-pieza={pieza} data-movido={false} onClick={moverPieza}> {piezaImagen && <img src={"/ajedrez/"+piezaImagen+".png"}></img>}  </div>;
          })}
        </React.Fragment>
      ))}
    </div>



  );
  
}