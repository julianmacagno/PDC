var people = new Array();
var rowsCounter = 0;

function deleteOne(handler) {
    var choosedRow = $("#" + handler.id).closest(".row");
    var name = choosedRow.find("input[name=name]").val();
    var surname = choosedRow.find("input[name=surname]").val();
    var relationship = choosedRow.find("select[name=relationship]").val();
    
    if (localStorage.people !== undefined) {
        people = JSON.parse(localStorage.people);
        for (var i = 0; i < people.length; i++) {
            if(people[i].surname == surname && people[i].name == name && 
                people[i].relationship == relationship) {
                    people.splice(i,1);
                    break;
            }
        }
        localStorage.people = JSON.stringify(people);
        location.reload(true);
    }
}

function saveForm() {
    var rowsCounterTemp = 0;
    if (typeof(Storage) !== undefined) {
        people = []; 
        var validFields = true;
        $("div:not([id=header]).row").each(function(i) {
            var p = {
                surname: $("[name=surname]", $(this)).val(),
                name: $("[name=name]", $(this)).val(),
                relationship: $("[name=relationship]", $(this)).val(),
                birthdate: $("[name=birthdate]", $(this)).val(),
                live: $("[name=live" + rowsCounterTemp + "]:checked", $(this)).val(),
                ocupation: $("[name=ocupation]", $(this)).val(),
                email: $("[name=email]", $(this)).val()
            };

            //controlar que los campos no queden vacios
            if(p.surname !== "" && p.name !== "" && p.relationship !== "" && p.birthdate > 0 && p.birthdate !== "" && ((p.ocupation !== "" && p.email != "" && p.live == "yes") || p.live == "no")) {
                //controla que la persona no este en la TABLA
                for (var i = 0; i < people.length; i++) {
                    if(people[i].surname == p.surname && people[i].name == p.name && 
                        people[i].relationship == p.relationship) {
                            validFields = false; //se pone el falso para que no se envie
                            alert("El usuario " + p.surname + " " + p.name + " ya esta en la tabla");
                            return false;
                    }
                }
                if(validFields)
                    people.push(p); //comentar para volver a la funcionalidad que controla
            }
            else {
                validFields = false;
                alert("Ningun campo debe contener valores vacios o invalidos.");
                return false;
            }
            rowsCounterTemp++;
        });
        //Si no hubo un problema con los datos, agregar y enviar el email
        if(validFields) {
            localStorage.people = JSON.stringify(people);
            window.location.href = "mailto:julianmacagno_97@hotmail.com?subject=Test&body=" + JSON.stringify(people);
        }
    }
    else
        alert("No se puede guardar a las personas. El navegador no es compatible.");
}

function radioClick(handler) {
    var changedRadio = $("input[name=" + handler.name + "]:checked");
    var ocupationSelect = changedRadio.closest(".row").find("select[name=ocupation]");
    var emailInput = changedRadio.closest(".row").find("input[name=email]");
    
    if (changedRadio.val() == "no") {
        emailInput.attr("disabled", true);
        emailInput.val("");
        ocupationSelect.attr("disabled", true);
        ocupationSelect.children("#select").attr("selected", true);
    }
    else if (changedRadio.val() == "yes") {
        emailInput.attr("disabled", false);
        ocupationSelect.attr("disabled", false);
    }
}

function addRow(surname, name, relationship, birthdate, live, ocupation, email) {
    var color = "";
    if(rowsCounter % 2 == 1)
    color = "white";
    else
    color = "#E9E9E9";
    
    var template = $("\
    <div class=\"row\" style=\"background-color: " + color + "\">\
        <div class=\"col\">\
            <input value=\"" + surname + "\" name=\"surname\" class=\"form-control\" type=\"text\" maxlength=40\">\
        </div>\
        <div class=\"col\">\
            <input value=\"" + name + "\" name=\"name\" class=\"form-control\" type=\"text\" maxlength=100\">\
        </div>\
        <div class=\"col\">\
            <select name=\"relationship\" id=\"relationship\" class=\"form-control\"\">\
                <option value=\"\">Seleccione</option>\
                <option value=\"father\" " + ((relationship == "father") ? "selected" : "") + ">Padre</option>\
                <option value=\"mother\" " + ((relationship == "mother") ? "selected" : "") + ">Madre</option>\
                <option value=\"brother\" " + ((relationship == "brother") ? "selected" : "") + ">Hermano/a</option>\
                <option value=\"son\" " + ((relationship == "son") ? "selected" : "") + ">Hijo/a</option>\
                <option value=\"spouse\" " + ((relationship == "spouse") ? "selected" : "") + ">C&oacute;nyugue</option>\
            </select>\
        </div>\
        <div class=\"col\">\
            <input value=" + birthdate + " name=\"birthdate\" class=\"form-control\" type=\"number\" maxlength=4\">\
        </div>\
        <div class=\"col\">\
            <div class=\"radio\">\
                <label\"> S&iacute;\
                    <input type=\"radio\" name=\"live" + rowsCounter + "\" value=\"yes\" " + ((live == "yes" | live == "") ? "checked" : "") + " onclick=\"radioClick(this)\">\
                </label>\
                <label\"> No\
                    <input type=\"radio\" name=\"live" + rowsCounter + "\" value=\"no\" " + ((live == "no") ? "checked" : "") + " onclick=\"radioClick(this)\">\
                </label>\
            </div>\
        </div>\
        <div class=\"col\">\
            <select value\" name=\"ocupation\" id=\"ocupation\" class=\"form-control\"\" " + ((live == "no") ? "disabled" : "") + ">\
                <option id=\"select\" value=\"\">Seleccione</option>\
                <option value=\"employee\"" + ((ocupation == "employee") ? "selected" : "") + ">Empleado</option>\
                <option value=\"businnesman\"" + ((ocupation == "businnesman") ? "selected" : "") + ">Empresario</option>\
                <option value=\"independent\"" + ((ocupation == "independent") ? "selected" : "") + ">Independiente</option>\
                <option value=\"retired\"" + ((ocupation == "retired") ? "selected" : "") + ">Jubilado</option>\
                <option value=\"doesnt work\"" + ((ocupation == "doesnt work") ? "selected" : "") + ">No trabaja</option>\
            </select>\
        </div>\
        <div class=\"col\">\
            <input type=\"email\" value=\"" + email + "\" name=\"email\" class=\"form-control\"\" " + ((live == "no") ? "disabled" : "") + ">\
        </div>\
        <div class=\"col\">\
            <img id=\"deleteRow" + rowsCounter + "\" src=\"./src/delete_icon.png\" class=\"img-thumbnail\" onclick=\"deleteOne(this)\" style=\"height: 40px\">\
        </div>\
    </div>");
    rowsCounter++;
    $("#table").append(template);
}

jQuery(document).ready(function() {
    if (typeof(Storage) !== undefined && localStorage.people !== undefined) {
        people = JSON.parse(localStorage.people);
        people.forEach(p => {
            addRow(p.surname, p.name, p.relationship, p.birthdate, p.live, p.ocupation, p.email);
        });
    }
});

function clean() {
    localStorage.clear();
    location.reload(true);
}

/*preguntar si se deja la opcion de controlar repeticiones asi como esta (no pudiendo modificar 
    las personas que ya estan cargadas y teniendo el problema de que si modificamos nombre 
    apellido u ocupacion se agrega una persona nueva porque no coincide con las que ya estan 
    cargadas O renovar el storage cada vez que apretamos el mailto)*/