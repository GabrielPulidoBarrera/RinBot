'use client'

import React, { useState } from 'react';


export default function Ajedrez() {
  const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const [piezaSeleccionada, setPiezaSeleccionada] = useState<interfazTablero | null>(null);
  const [menuPromocionBlanco, setMenuPromocionBlanco] = useState('hidden')
  const [menuPromocionNegro, setMenuPromocionNegro] = useState('hidden')
  const [turno, setTurno] = useState('blanco')

  interface interfazTablero {
    posicion: string;
    movido: boolean;
    accesible: boolean;
    pieza: string;
    colorCasilla: string;
    color: string;
    enPassant: boolean;
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
      if (rank== 1 && file=="A" || rank== 1 && file=="H"){
        pieza="torreBlanca"
        color="blanco"
      }
      if (rank== 8 && file=="A" || rank== 8 && file=="H"){
        pieza="torreNegra"
        color="negro"
      }
      if (rank== 1 && file=="C" || rank== 1 && file=="F"){
      pieza="alfilBlanco"
        color="blanco"
      }
      if (rank== 8 && file=="C" || rank== 8 && file=="F"){
        pieza="alfilNegro"
        color="negro"
      }
      
      if (rank== 1 && file=="B" || rank== 1 && file=="G"){
        pieza="caballoBlanco"
        color="blanco"
      }
      if (rank== 8 && file=="B" || rank== 8 && file=="G"){
        pieza="caballoNegro"
        color="negro"
      }
      if (rank== 1 && file=="D"){
        pieza="reinaBlanca"
        color="blanco"
      }
      if (rank== 8 && file=="D"){
        pieza="reinaNegra"
        color="negro"
      }
      
      if (rank== 1 && file=="E"){
        pieza="reyBlanco"
        color="blanco"
      }
      if (rank== 8 && file=="E"){
        pieza="reyNegro"
        color="negro"
      }
      



      objetoTablero.push({
        posicion: (file + rank),
        movido: false,
        accesible: false,
        pieza: pieza,
        colorCasilla: colorCasilla,
        color: color,
        enPassant: false,
      })
    })
  })


  const [tablero, modificarTablero] = useState(objetoTablero);

  //Borrar la pieza seleccionada y todas las casillas marcadas como accesible
function limpiarAccesibles() {
  console.log("Limpiando")
  modificarTablero(prevTablero =>
    prevTablero.map(casilla => ({
      ...casilla,          
      accesible: false,    
    }))
  );
}

function verPeligrosas() {
  console.log("Viendo peligrosas!")
  // tablero.map((casilla)=>{
  //   movimientoPiezas(casilla);
  // })
}


  //Funcion para dado un array de posiciones, asignarlas como accesibles
function marcarAccesibles(arrayPiezas: string[], seleccion: interfazTablero) {
  if(arrayPiezas.length>0){

//    console.log(arrayPiezas);
  }
  modificarTablero(prevTablero =>

    
    prevTablero.map(casilla => {
      // console.log("CASILLAS")
      // console.log(arrayPiezas);
    if(arrayPiezas.includes(casilla.posicion)){
       return{
        ...casilla,
        accesible: true,
      }
    }
      return{
        ...casilla,
        accesible: false,
      }
    })
  );
  setPiezaSeleccionada(seleccion);    
}



  //Encapsulo esta funcion para no tener que escribir el find completo cada vez.
  function buscarCasilla(casillaUsuario: string) {    
    let casilla = tablero.find((elemento) => {
      return elemento.posicion == casillaUsuario;
    })
    return casilla
  }




  //Funcion para modificar la posicion de una pieza
  function actualizarPosicion(casillaSeleccionada: interfazTablero){
    let enPassantEstado=false;
    let capturaEnPassant = ""
    let passantEjecutado = false
    let enrocando = false
    let nuevaPosicionTorre: interfazTablero
    let torre: interfazTablero

    

    //Verificacion de si esta en passant o no

        if(piezaSeleccionada && piezaSeleccionada.pieza=="peonBlanco" || piezaSeleccionada && piezaSeleccionada.pieza=="peonNegro"){
          let cambio = Number(casillaSeleccionada.posicion[1]) - Number(piezaSeleccionada.posicion[1])
          if (cambio>=2 || cambio <=-2 ){
            enPassantEstado=true
            passantEjecutado=true
          } 
//En el caso de que se en passant, donde esta la pieza a la que le ha hecho en passant
          if(piezaSeleccionada.posicion[0]!= casillaSeleccionada.posicion[0] && piezaSeleccionada.posicion[1]!= casillaSeleccionada.posicion[1]){
            if(piezaSeleccionada.pieza=="peonBlanco"){
              let atras = Number(casillaSeleccionada.posicion[1])-1
              capturaEnPassant = casillaSeleccionada.posicion[0]+atras
            }
            if(piezaSeleccionada.pieza=="peonNegro"){
              let atras = Number(casillaSeleccionada.posicion[1])+1
              capturaEnPassant = casillaSeleccionada.posicion[0]+atras
            }

          }
          
        }


        //Verificar si es enroque

        if(piezaSeleccionada && piezaSeleccionada.pieza=="reyBlanco" || piezaSeleccionada && piezaSeleccionada.pieza=="reyNegro"  ){
          let indexOriginal = files.indexOf(piezaSeleccionada.posicion[0]);
          let indexBuscado = files.indexOf(casillaSeleccionada.posicion[0]);
          if (indexOriginal-indexBuscado>=2 || indexOriginal-indexBuscado<=-2){
            enrocando=true;
            if (indexOriginal-indexBuscado<=-2){
              let posibleTorre = buscarCasilla(files[indexBuscado+1]+piezaSeleccionada.posicion[1])
              if (!posibleTorre){
                return
              }
              torre = posibleTorre
              if (torre?.pieza.includes("torre")){
                let posiblePosicion = buscarCasilla(files[indexBuscado-1]+piezaSeleccionada.posicion[1])
                if (posiblePosicion){
                  nuevaPosicionTorre = posiblePosicion
                }
              }
            }
            else{
              let posibleTorre = buscarCasilla(files[indexBuscado-1]+piezaSeleccionada.posicion[1])
              if (!posibleTorre){
                return
              }              
              torre = posibleTorre
              if (torre?.pieza.includes("torre")){
                let posiblePosicion = buscarCasilla(files[indexBuscado+1]+piezaSeleccionada.posicion[1])
                if (posiblePosicion){
                  nuevaPosicionTorre = posiblePosicion
                }              
              }
            }
 
          
          }
        }
    if(turno == "blanco"){
      setTurno('negro');
    }
    else{
      setTurno('blanco');
    }









    modificarTablero(prevTablero =>
    prevTablero.map(casilla => {


      
      
      
      if(casilla.posicion==casillaSeleccionada.posicion && piezaSeleccionada){ //Si encuentra la casilla que has clicado, mueves hacia allí
        //Si es un peon llegando a la ultima fila, promociona.
        if(piezaSeleccionada.pieza=="peonBlanco" && Number(casillaSeleccionada.posicion[1])==8){
          setMenuPromocionBlanco('block')
        }
        if(piezaSeleccionada.pieza=="peonNegro"  && Number(casillaSeleccionada.posicion[1])==1 ){
          setMenuPromocionNegro('block')
        }

        return{
          ...casilla,
          pieza: piezaSeleccionada.pieza,
          movido: true,
          color: piezaSeleccionada.color,
          enPassant: enPassantEstado
        }
      }

      //Si es la pieza donde deberia ir la torre en el enroque, mueve la torre.
      if(nuevaPosicionTorre!=null && casilla.posicion == nuevaPosicionTorre.posicion){
        return{
          ...casilla,
          pieza: torre.pieza,
          color: torre.color,
          movido: true,
        }
      }

      //si es la casilla donde estaba la torre, lo borra.

      if(torre!=null && casilla.posicion == torre.posicion){
        return{
          ...casilla,
          pieza: "",
          color: "",
          enPassant: false
        }
      }



      if( piezaSeleccionada && casilla.posicion==piezaSeleccionada.posicion || casilla.posicion==capturaEnPassant){ //Si encuentra tu posicion antigua, la borra
        if (capturaEnPassant!=""){
          capturaEnPassant==""
        }
        return{
          ...casilla,
          pieza: "",
          color: "",
          enPassant: false
        }
      }
      //EN CASO DE QUE NO ENCUENTRE NADA NO HACE NADA
      return{
        ...casilla,
        enPassant: false
      }
    })

    
    
  );
  

    limpiarAccesibles();

    verPeligrosas();
  }










  
  //EN CLICK
  function moverPieza(casillaUsuario: string) {   
            

    let casilla = buscarCasilla(casillaUsuario);
    
    if (!casilla) {
      return
    }


         console.log(casilla)
     console.log("OTROS DATOS")


    //Si has clicado en una casilla a la que te pueds mover
    if (casilla.accesible == true && piezaSeleccionada != null) {
      actualizarPosicion(casilla)

      //Acabo la ejecucion para que no me marque la siguiente casilla como accesible immediatamente
      return
    }

    //Si no has clicado en una casilla a la que te puedes mover
    else {

      limpiarAccesibles();
    }


    
    
    if(casilla.color!=turno && casilla.color!=""){
      return
    }
    
    movimientoPiezas(casilla)


    
  }


function movimientoPiezas(casilla: interfazTablero){




    
    //TORRE
    
  function movimientoTorre(casilla: interfazTablero){

        
      
      let columna = files.indexOf(casilla.posicion[0]);
      let fila = Number(casilla.posicion[1]);
      

          //derecha


          for (let contador = 1; contador<8; contador++){
            let pieza = buscarCasilla(files[columna+contador]+fila)
            if (pieza && pieza.color!=casilla.color){
              posiciones.push(pieza.posicion)
              if(pieza.color!="" && pieza.color!=casilla.color){
                break
              }
            }
            else{
              break
            }            
          }

          //Izquieda

          for (let contador = 1; contador<8; contador++){
            let pieza = buscarCasilla(files[columna-contador]+fila)
            if (pieza && pieza.color!=casilla.color){
              posiciones.push(pieza.posicion)
              if(pieza.color!="" && pieza.color!=casilla.color){
                break
              }
            }
            else{
              break
            }             
          }


          //Arriba

          for (let contador = 1; contador<8; contador++){
            let pieza = buscarCasilla(casilla.posicion[0]+(fila+contador))
            if (pieza && pieza.color!=casilla.color){
              posiciones.push(pieza.posicion)
               if(pieza.color!="" && casilla.color!=pieza.color){
                break
              }
           }          
            else{
              break
            }               
          }

          //Abajo

          for (let contador = 1; contador<8; contador++){
            let pieza = buscarCasilla(casilla.posicion[0]+(fila-contador))
            if (pieza && pieza.color!=casilla.color){
              posiciones.push(pieza.posicion)
              if(pieza.color!="" && pieza.color!=casilla.color){
                break
              }
            }         
            else{
              break
            }                 
          }

          
        }



//ALFIL

function movimientoAlfil(casilla: interfazTablero){


      let fila = files.indexOf(casilla.posicion[0]);
      let columna = Number(casilla.posicion[1]);

      let valido = true
      let contador = 0;
      //arriba derecha
      for (let contador = 1; contador<7; contador++){
        let casillaBuscada = buscarCasilla(files[fila+contador]+(columna+contador))
        if(casillaBuscada && casillaBuscada.color!=casilla.color){
          posiciones.push(casillaBuscada.posicion)
          if (casillaBuscada.color!="" && casillaBuscada.color!=casilla.color){
            break
          }          
        }
        else{
          break
        }
      }

      //arriba izquierda
      for (let contador = 1; contador<7; contador++){
        let casillaBuscada = buscarCasilla(files[fila-contador]+(columna+contador))
        if(casillaBuscada && casillaBuscada.color!=casilla.color){
          posiciones.push(casillaBuscada.posicion)
          if (casillaBuscada.color!="" && casillaBuscada.color!=casilla.color){
            break
          }
        }
        else{
          break
        }
      }

      //abajo derecha
      for (let contador = 1; contador<7; contador++){
        let casillaBuscada = buscarCasilla(files[fila+contador]+(columna-contador))
        if(casillaBuscada && casillaBuscada.color!=casilla.color){
          posiciones.push(casillaBuscada.posicion)
          if (casillaBuscada.color!="" && casillaBuscada.color!=casilla.color){
            break
          }
        }
        else{
          break
        }
      }

      //abajo izquierda
      for (let contador = 1; contador<7; contador++){
        let casillaBuscada = buscarCasilla(files[fila-contador]+(columna-contador))
        if(casillaBuscada && casillaBuscada.color!=casilla.color){
          posiciones.push(casillaBuscada.posicion)
          if (casillaBuscada.color!="" && casillaBuscada.color!=casilla.color){
            break
          }
        }
        else{
          break
        }
      }

}










      let posiciones = [];

    //PEON BLANCO

    if (casilla.pieza == "peonBlanco") {



      if (casilla.movido == false) {
        let sumado = Number(casilla.posicion[1]) + 2
        let casillaFutura = casilla.posicion[0] + sumado


        let elemento = buscarCasilla(casillaFutura);


      if (elemento != null && elemento.pieza=="") {
          posiciones.push(elemento.posicion);
        }

      }

      let sumado = Number(casilla.posicion[1]) + 1
      let casillaFutura = casilla.posicion[0] + sumado
      let elemento = buscarCasilla(casillaFutura);

      if (elemento != null && elemento.pieza=="" ) {
        posiciones.push(elemento.posicion);
      }



        let posicionBase = files.indexOf(casilla.posicion[0]);
        let izquierda = posicionBase-1
        let derecha = posicionBase+1;
        let diagonalIzquierda =  files[izquierda] + sumado
        let diagonalDerecha = files[derecha] + sumado;

        let posicionDiagonalIzquierda = buscarCasilla(diagonalIzquierda)
        let posicionDiagonalDerecha = buscarCasilla(diagonalDerecha)

        if (posicionDiagonalIzquierda && posicionDiagonalIzquierda.pieza!="" && posicionDiagonalIzquierda.color=="negro"){
          posiciones.push(posicionDiagonalIzquierda.posicion);
        }
        if (posicionDiagonalDerecha && posicionDiagonalDerecha.pieza !="" && posicionDiagonalDerecha.color=="negro"){
          posiciones.push(posicionDiagonalDerecha.posicion);
        }

        let posicionIzquierda = buscarCasilla(files[izquierda]+casilla.posicion[1])

        if(posicionIzquierda?.enPassant==true && posicionIzquierda.pieza=="peonNegro"){
          if(posicionDiagonalIzquierda){
            posiciones.push(posicionDiagonalIzquierda.posicion);
          }
        }

        let posicionDerecha = buscarCasilla(files[derecha]+casilla.posicion[1])

        if(posicionDerecha?.enPassant==true && posicionDerecha.pieza=="peonNegro"){
          if(posicionDiagonalDerecha){
            posiciones.push(posicionDiagonalDerecha.posicion);
          }
        }



    }
    //PEON NEGRO

    if (casilla.pieza == "peonNegro") {


      if (casilla.movido == false) {
        let sumado = Number(casilla.posicion[1]) - 2
        let casillaFutura = casilla.posicion[0] + sumado


          let elemento = buscarCasilla(casillaFutura);


      if (elemento != null && elemento.pieza=="") {
          posiciones.push(elemento.posicion);
        }

      }

      let sumado = Number(casilla.posicion[1]) - 1
      let casillaFutura = casilla.posicion[0] + sumado
      let elemento = buscarCasilla(casillaFutura);

      if (elemento != null && elemento.pieza=="") {
        posiciones.push(elemento.posicion);
      }

        let posicionBase = files.indexOf(casilla.posicion[0]);
        let izquierda = posicionBase-1
        let derecha = posicionBase+1;
        let diagonalIzquierda =  files[izquierda] + sumado
        let diagonalDerecha = files[derecha] + sumado;

        let posicionDiagonalIzquierda = buscarCasilla(diagonalIzquierda)
        let posicionDiagonalDerecha = buscarCasilla(diagonalDerecha)

        if (posicionDiagonalIzquierda && posicionDiagonalIzquierda.pieza!="" && posicionDiagonalIzquierda.color=="blanco"){
          posiciones.push(posicionDiagonalIzquierda.posicion);
        }
        if (posicionDiagonalDerecha && posicionDiagonalDerecha.pieza!="" && posicionDiagonalDerecha.color=="blanco"){
          posiciones.push(posicionDiagonalDerecha.posicion);
        }


        let posicionIzquierda = buscarCasilla(files[izquierda]+casilla.posicion[1])



        if(posicionIzquierda?.enPassant==true && posicionIzquierda.pieza=="peonBlanco"){
          if(posicionDiagonalIzquierda){
            posiciones.push(posicionDiagonalIzquierda.posicion);
          }
        }

        let posicionDerecha = buscarCasilla(files[derecha]+casilla.posicion[1])

        if(posicionDerecha?.enPassant==true  && posicionDerecha.pieza=="peonBlanco"){
          if(posicionDiagonalDerecha){
            posiciones.push(posicionDiagonalDerecha.posicion);
          }

        }
      


    }





    //CABALLO

    if (casilla.pieza=="caballoBlanco" || casilla.pieza=="caballoNegro"){


      let fila = files.indexOf(casilla.posicion[0]);
      let columna = Number(casilla.posicion[1]);

      let arrayFilas = [-2, -1, +1, +2]
      let arrayColumnas = [-2, -1, +1, +2]

      arrayColumnas.map((filaActual) => {
        arrayFilas.map((columnaActual) => {

          if (filaActual+columnaActual==3 || filaActual+columnaActual==-3 || filaActual+columnaActual==-1 || filaActual+columnaActual==+1 ){

            let pieza = buscarCasilla(files[fila+filaActual]+(columnaActual+columna))

            if (pieza){
              if(pieza.color!=casilla.color){
                posiciones.push(pieza.posicion)
              }
            }

          }

        })
      })


    }

    //ALFIL

    if (casilla.pieza=="alfilBlanco" || casilla.pieza=="alfilNegro"){

      movimientoAlfil(casilla)

    }

    //TORRE

    if (casilla.pieza=="torreBlanca" || casilla.pieza=="torreNegra"){
      movimientoTorre(casilla)

    }

    //REINA

    if (casilla.pieza=="reinaBlanca" || casilla.pieza=="reinaNegra"){
      movimientoAlfil(casilla)
      movimientoTorre(casilla)
    }

    //REY

    if (casilla.pieza=="reyBlanco" || casilla.pieza =="reyNegro"){ 
      let columnas = [1, 0, -1];
      let filas = [1, 0, -1]
      let columnaOriginal = files.indexOf(casilla.posicion[0]);

      columnas.map((columna) => {
        filas.map((fila) => {
          let casillaBuscada = buscarCasilla(files[columnaOriginal+columna]+(Number(casilla.posicion[1])+fila))
          if (casillaBuscada && casillaBuscada.color!=casilla.color){
            posiciones.push(casillaBuscada.posicion);
          }
        })
      })






      //Enroque

      if(casilla.movido==false){

        //izquierda
        let unoIzquierda = buscarCasilla(files[columnaOriginal-1]+casilla.posicion[1]);
        let dosIzquierda = buscarCasilla(files[columnaOriginal-2]+casilla.posicion[1]);
        let tresIzquierda = buscarCasilla(files[columnaOriginal-3]+casilla.posicion[1]);
        let torreIzquierda = buscarCasilla(files[columnaOriginal-4]+casilla.posicion[1]);
        if(!unoIzquierda || !dosIzquierda || !tresIzquierda || !torreIzquierda){
          return
        }
        
        if(unoIzquierda.pieza=="" && dosIzquierda.pieza==""  && tresIzquierda.pieza=="" && torreIzquierda.pieza.includes("torre") && torreIzquierda.color==piezaSeleccionada?.color && torreIzquierda.movido==false){
          posiciones.push(tresIzquierda.posicion);
        }
        
        
        //Derecha
        let unoDerecha = buscarCasilla(files[columnaOriginal+1]+casilla.posicion[1]);
        let dosDerecha = buscarCasilla(files[columnaOriginal+2]+casilla.posicion[1]);
        let torreDerecha = buscarCasilla(files[columnaOriginal+3]+casilla.posicion[1]);
        
        if(!unoDerecha || !dosDerecha || !torreDerecha){
          return
        }


        if(unoDerecha.pieza=="" && dosDerecha.pieza==""  && torreDerecha.pieza.includes("torre") && torreIzquierda.color==piezaSeleccionada?.color && torreDerecha.movido==false){
          
          posiciones.push(dosDerecha.posicion)
        }
      }


    }

    //ENVIAR POSICIONES

    if (!posiciones) {
      return
    }

    marcarAccesibles(posiciones, casilla)

}





  function ascenderPeon(pieza: string){
    modificarTablero(prevTablero =>
    prevTablero.map(casilla => {
      if(Number(casilla.posicion[1])==8 && casilla.pieza=="peonBlanco" || Number(casilla.posicion[1])==1 && casilla.pieza=="peonNegro"){
        return{
          ...casilla,
          pieza: pieza
        }

      }
      return{
        ...casilla
      }
    }))
    setMenuPromocionBlanco('hidden')
    setMenuPromocionNegro('hidden')

}




  return (
    <div className="flex" id="contenedorPrincipal">
      <div>
      <span>Turno de {turno}</span>
      <div className="h-200 w-200 grid grid-rows-8 grid-cols-8 *:aspect-square" id="contenedorTablero">
        {tablero.map((casilla) => (
          <div key={casilla.posicion} id={casilla.posicion} className={`text-emerald-500 text-7xl text-center ` + casilla.colorCasilla} data-accesible={false} data-pieza={casilla.pieza} data-movido={false} onClick={((e) => moverPieza(casilla.posicion))}> {casilla.pieza && <img src={"/ajedrez/" + casilla.pieza + ".png"}></img>} {casilla.accesible == true && <div>x</div>} </div>
        ))}
      </div>
        </div>

        <div className={`text-center justify-center m-auto grow flex `+menuPromocionBlanco} id="promociones">

          <div className='grid grid-cols-1 grid-rows-4 border-2 border-emerald-300 *:border-2 *:border-emerald-300 border-collapse ' id="menuPromocionBlanca">
          
            <div onClick={((e) => ascenderPeon("alfilBlanco"))}><img src="/ajedrez/alfilBlanco.png"></img></div>
            <div onClick={((e) => ascenderPeon("caballoBlanco"))} ><img src="/ajedrez/caballoBlanco.png"></img></div>
            <div onClick={((e) => ascenderPeon("torreBlanca"))} ><img src="/ajedrez/torreBlanca.png"></img></div>
            <div onClick={((e) => ascenderPeon("reinaBlanca"))} ><img src="/ajedrez/reinaBlanca.png"></img></div>

          </div>

        </div>
        <div className={`text-center justify-center m-auto grow flex `+menuPromocionNegro} id="promociones">

          <div className='grid grid-cols-1 grid-rows-4 border-2 border-emerald-300 *:border-2 *:border-emerald-300 border-collapse ' id="menuPromocionNegra">
          
            <div onClick={((e) => ascenderPeon("alfilNegro"))}><img src="/ajedrez/alfilNegro.png"></img></div>
            <div onClick={((e) => ascenderPeon("caballoNegro"))} ><img src="/ajedrez/caballoNegro.png"></img></div>
            <div onClick={((e) => ascenderPeon("torreNegra"))} ><img src="/ajedrez/torreNegra.png"></img></div>
            <div onClick={((e) => ascenderPeon("reinaNegra"))} ><img src="/ajedrez/reinaNegra.png"></img></div>

          </div>

        </div>
        <button onClick={verPeligrosas}>hola</button>

      </div>



  );

}

// IDEA: EN CADA CASILLA LE COLOCAS SI ES PELIGROSA O NO.