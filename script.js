/*     
    
____________________________________
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
document.addEventListener("DOMContentLoaded", () => {

    var lista = []
    var total = 0;

    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {

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

    const $botonAgregar = document.querySelector("#btnAgregar");
    $botonAgregar.addEventListener("click", () => {
        var nombre = document.getElementById("IdNombre").value;
        var detalle = document.getElementById("idDetalle").value;
        var precio = document.getElementById("IdPrecio").value;
        var unidad = document.getElementById("IdUnidad").value;
        console.log(nombre);
        console.log(detalle);
        console.log(unidad);
        console.log(precio);

        lista.push({ nombre, detalle, unidad, precio });

        //intentar agregar elementos en el ul del DOM
        var tbody = document.querySelector("#resultado");


        tr = document.createElement('tr');

        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td3 = document.createElement('td');
        td4 = document.createElement('td');



        td1.appendChild(document.createTextNode("" + nombre));
        td2.appendChild(document.createTextNode("" + detalle));
        td3.appendChild(document.createTextNode("" + unidad));
        td4.appendChild(document.createTextNode("" + precio));


        // <input type="submit" id="editar" value="Editar">



        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);



        tbody.appendChild(tr);


        total = total + (precio * unidad)
        document.getElementById("MontoTotal").innerHTML = "$" + total;


        lista.forEach(element => {
            console.log(element);
        });

        // IdUnidad
        // IdPrecio
        // idDetalle
        // IdNombre

    });

    const $botonOcultar = document.querySelector("#btnOcultar");
    $botonOcultar.addEventListener("click", () => {
        var x = document.getElementById("formulario");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
});