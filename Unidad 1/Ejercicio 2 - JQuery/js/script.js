var checkboxCheckedCounter = 0;

function checkEmtpyFields() {
    var emptyFields = false;
    var data = {};

    //chequea los inputs principales, pone el color que corresponda y extrae los datos de los mismos para enviar por email
    $("[required][type!=radio]").each(function() {
        if($(this).val() == ""){
            emptyFields = true;
            $(this).css("border-color", "#F00");
            $(this).css("border-width", "2px");
        }
        else {
            $(this).css("border-color", "rgb(206, 212, 218)");
            $(this).css("border-width", "1px");
        }
        var label = $(this).closest(".row.border").find("label");
        data[$(label).text()] = $(this).val();
    });

    //checkea los radios de sexo, pone el color correspondiente y extrae los datos para enviar por email
    var radiosChecked = false;
    $("input[type=radio]").each(function(){
        if($(this).prop("checked")) {
            radiosChecked = true;
            var label = $(this).closest("label");
            data["sexo"] = $(label).text();
        }
    });
    if(!radiosChecked) {
        $("#iLabelF").css("color", "#F00");
        $("#iLabelM").css("color", "#F00");
    }
    else {
        $("#iLabelF").css("color", "#000");
        $("#iLabelM").css("color", "#000");
    }

    //checkea los checkbox, alerta si no selecciono modalidad, setea color correspondiente y extrae los datos
    var modalityNotSelected = false;
    var checkboxes = [];
    $("input[type=checkbox]:checked").each(function() {
        //si no se eligio modalidad, corta
        if($(this).siblings("select").find("option:selected").text() == "") {
            modalityNotSelected = true;
            alert("Debe elegir una modalidad para cada carrera seleccionada");
            return false;
        }
        else { //sino, agregalos a la lista
            var career = {
                nombre: $(this).siblings("label").text(),
                modalidad: $(this).siblings("select").find("option:selected").text()
            };
            checkboxes.push(career);        
        }
    });
    data["careers"] = checkboxes;

    if(!checkboxCheckedCounter || modalityNotSelected)
        $("#container-carreras").css("background-color", "rgb(255, 125, 125)");
    else
        $("#container-carreras").css("background-color", "rgb(255, 255, 255)");

    //si faltan datos obligatorios, alerta al respecto. Sino, envia la informacion por email
    if(emptyFields || !checkboxCheckedCounter || !radiosChecked)
        alert("Debe llenar todos los campos obligatorios");
    else {
        window.location.href = "mailto:julianmacagno_97@hotmail.com?subject=Ejercicio2&body=" + JSON.stringify(data);
    }
}

//controla y cuenta los checkbox seleccionados, si son mas de 5 alerta y setea el disabled de los selects segun si estan o no chequeados. de a uno por vez
function checkboxClicked(handler) {
    var select = $(handler).siblings("select"); //buscamos el select hno del checkbox
    if($(handler).prop("checked")) //contamos la cant de seleccionados
        checkboxCheckedCounter++;
    else
        checkboxCheckedCounter--;
    
    if(checkboxCheckedCounter > 5) {
        alert("No puede seleccionar mas de 5 carreras de interés");
        $(handler).prop("checked", false);
        checkboxCheckedCounter--;
    }
    else //invertimos el valor de disabled
        select.prop("disabled", !select.prop("disabled")); 
}
