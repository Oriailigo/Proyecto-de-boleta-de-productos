/*     
__________________________________
/ Si necesitas ayuda, contáctame   \
 ------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Creado por oriana. Este encabezado debe mantenerse intacto,
excepto si este es un proyecto de un estudiante.
*/

class Producto{
    constructor(titulo,cantidad,precio){
        this.id = randHex(12);
        this.titulo = titulo;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    getId(){return this.id}
    setTitulo(titulo){this.titulo=titulo;}
    getTitulo(){return this.titulo;}
    setPrecio(precio){this.precio = precio;}
    getPrecio(){ return this.precio;}
    setCantidad(cantidad){ this.cantidad = cantidad;}
    getCantidad(){ return this.cantidad;} 
    calcularSubtotal(){ return (this.cantidad*this.precio)}
}

class Boleta {
    constructor(total,productos){
        this.total = total;
        this.productos = productos;
    }
    agregarProducto(producto){ this.productos.push(producto); }

    buscarIndiceProducto(pid){ return this.productos.findIndex(x => x.id === pid); }

    actualizarProducto(producto){
        this.productos[this.buscarIndiceProducto(producto.getId())].setCantidad(producto)
    }

    eliminarProducto(pid){
        this.productos.splice(this.buscarIndiceProducto(pid),1);
        console.log("producto eliminado");
    }

    calcularTotal(){
        this.total=0
        if (this.productos.length != 0) {
            this.productos.forEach(producto => { this.total += producto.calcularSubtotal(); });
            return this.total;
        }
        return 0;
    }
}

// --------------------------------------------------------
//------------------SECCION DE EVALUACION------------------
// --------------------------------------------------------



// prueba de la funcion agregar productos
const miboleta = new Boleta(0,[]);
// de obj JS a JSON Text
// var myJSONText = JSON.stringify(obj);
// de JSON a obj JS  Text
// var obj = JSON.parse(myJSONtext);
// console.log(miboleta.productos);


let aux = JSON.stringify(miboleta.productos);
document.addEventListener("DOMContentLoaded", function (event) {
     // Escuchamos el click del botón
     const $boton_guardar = document.querySelector("#btnCrearPdf");
     $boton_guardar.addEventListener("click", () => {
 
         const $elementoParaConvertir = document.querySelector('#comprobante'); // <-- Aquí puedes elegir cualquier elemento del DOM
         html2pdf()
             .set({
                 margin: 1,
                 filename: 'documento.pdf',
                 image: {
                     type: 'jpeg',
                     quality: 0.98
                 },
                 html2canvas: {
                     scale: 3, // A mayor escala, mejores gráficos, pero más peso
                     letterRendering: true,
                 },
                 jsPDF: {
                     unit: "in",
                     format: "a3",
                     orientation: 'portrait' // landscape o portrait
                 }
             })
             .from($elementoParaConvertir)
             .save()
             .catch(err => console.log(err));
     });

     const $boton_agregar = document.querySelector("#btnAgregar");
     $boton_agregar.addEventListener("click", agregar)
})


function agregar(){
    titulo = document.querySelector("#titulo").value
    cantidad = parseInt(document.querySelector("#cantidad").value,10);
    precio = parseInt(document.querySelector("#precio").value,10);

    nuevoProducto = new Producto(titulo,cantidad,precio);
    miboleta.agregarProducto(nuevoProducto);
    tbody = document.querySelector("#mytbody");
    fila = construirFila(nuevoProducto);
    tbody.appendChild(fila);

    document.getElementById("MontoTotal").innerHTML = "$" + miboleta.calcularTotal();
    console.log(miboleta.productos);
}
    


function construirFila(producto){
    button = document.createElement('button');
    button.innerHTML = "BORRAR";
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.onclick = borrar 

    tr = document.createElement('tr');
    tr.setAttribute("data-product-id", producto.getId());

    td1 = document.createElement('td');
    td2 = document.createElement('td');
    td3 = document.createElement('td');
    td4 = document.createElement('td');
    td5 = document.createElement('td');

    
    td1.appendChild(document.createTextNode(producto.titulo));
    td2.appendChild(document.createTextNode(producto.cantidad));
    td3.appendChild(document.createTextNode(producto.precio));
    td4.appendChild(document.createTextNode(producto.calcularSubtotal()));
    td5.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    return tr
}



//  random hex string generator
var randHex = function(len) {
    var maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1) 
        max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min,
        r   = n.toString(16);
    while ( r.length < len ) {
       r = r + randHex( len - maxlen );
    }
    return r;
  };

// BORRADO DE FILAS
function borrar(e){
    // e.target es el boton que se presionó
    // 1er parentNode es el td que contiene al boton el 2do parentNode es tr
    let p = e.target.parentNode.parentNode;    
    miboleta.eliminarProducto(p.dataset['productId']);
    p.parentNode.removeChild(p);
    document.getElementById("MontoTotal").innerHTML = "$" + miboleta.calcularTotal();
}
