/* 
Nombre: Jolman Gordillo
Misiones: 1, 2, 3, 4, 5 y Bonus
Descripcion: Gestion de pedidos dinamica 
*/

$(document).ready(function() {

    // --- MISION 1: SELECCION DE ELEMENTOS ---
    $("h2").css("color", "#d35400"); // Seleccion por etiqueta
    $(".btn-cta").css("border", "2px solid YELLOW"); // Seleccion por clase
    $("#titulo-pedidos").css("text-transform", "uppercase"); // Seleccion por ID
    $("li:odd").css("background-color", "#f9f9f9"); // Selector avanzado (impares)


    // --- MISION 5: JQUERY UI (Datepicker) ---
    // Inicializa el calendario en el input de fecha
    $("#fecha-pedido").datepicker();


    // --- MISION 2 y 3: EVENTOS Y DOM ---
    
    // Funcion para agregar elemento (Mision 2: .append)
    function agregarArepa() {
        let nombre = $("#input-arepa").val();
        let fecha = $("#fecha-pedido").val();

        if (nombre !== "") {
            let nuevoItem = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center" style="display:none">
                    <span><strong>${nombre}</strong> - Entrega: ${fecha} :D</span>
                    <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
                </li>
            `);
            
            $("#lista-pedidos").append(nuevoItem);
            
            // MISION 4: ANIMACION (fadeIn)
            nuevoItem.fadeIn(500); 
            
            $("#input-arepa").val("").focus(); // Limpiar y dar foco
            
        }else{
             $(".form-control").css("border", "2px solid red"); // Seleccion por clase
        }
    }

    // Evento de Raton (Mision 3)
    $("#btn-agregar").on("click", function() {
        agregarArepa();
    });

    // Evento de Teclado (Mision 3)
    $("#input-arepa").on("keypress", function(e) {
        if (e.which == 13) { // Tecla Enter
            agregarArepa();
        }
    });

    // Evento de Formulario/Foco (Mision 3)
    $("#input-arepa").on("focus", function() {
        $(this).css("background-color", "#fffde7");
    });


    // --- PUNTO BONUS: EVENTO DELEGADO ---
    // Eliminar elementos creados dinamicamente (Mision 2: .remove)
    $("#lista-pedidos").on("click", ".btn-eliminar", function() {
        // MISION 4: ANIMACION (slideUp antes de borrar)
        $(this).parent().slideUp(300, function() {
            $(this).remove(); 
        });
    });


    // --- MISION 4: ANIMACION PERSONALIZADA (.animate) ---
    // Animacion al pasar el raton sobre el banner
    $(".banner-pedido-bootstrap").on("mouseenter", function() {
        $(this).animate({
            paddingTop: "50px",
            paddingBottom: "50px",
            fontSize: "1.2rem"
        }, 400);
    }).on("mouseleave", function() {
        $(this).animate({
            paddingTop: "20px",
            paddingBottom: "20px",
            fontSize: "1rem"
        }, 400);
    });

});