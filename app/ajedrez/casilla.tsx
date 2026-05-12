'use client'

export default function Casilla(props: any) {
  function moverPieza(){
    console.log("Click!")
  }


    const file = props.file;
    const rank = props.rank;
    const fileIndex = props.fileIndex
    const isWhite = (fileIndex + rank) % 2 !== 0;
    const id = `${file}${rank}`;
    let clases = "text-emerald-500 text-xl ";
    if (isWhite) {
        clases += "bg-white"
    }

    let pieza = ""


    if (rank == 2) {
        pieza = "Peon"
    }


    let texto = ""

    if (pieza == "Peon") {
        texto = "PEON"
    }


    return <div key={id} id={id} className={clases} data-pieza={pieza} data-movido={false} onClick={moverPieza}> {texto} </div>;
}