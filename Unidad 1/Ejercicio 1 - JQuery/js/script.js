var people = new Array();

function saveForm() {
    if (typeof(Storage) !== undefined) {
        $("div:not([id=header]).row").each(function(i) {
            var p = {
                surname: $("[name=surname]", $(this)).val(),
                name: $("[name=name]", $(this)).val(),
                relationship: $("[name=relationship]", $(this)).val(),
                birthdate: $("[name=birthdate]", $(this)).val(),
                live: $("[name=live]", $(this)).val(),
                ocupation: $("[name=ocupation]", $(this)).val(),
                email: $("[name=email]", $(this)).val()
            };
            people.push(p);
        });
        console.log(people);
        localStorage.people = JSON.stringify(people);
    }
}

jQuery(document).ready(function() {
    if (typeof(Storage) !== undefined && localStorage.people !== undefined) {
        var people = JSON.parse(localStorage.people);
        people.forEach(p => {
            addRow(p.surname, p.name, p.relationship, p.birthdate, p.live, p.ocupation, p.email);
        });
    }
});

function addRow(surname, name, relationship, birthdate, live, ocupation, email) {
    var template = $("<div class=\"row\">\
            <div class=\"col\">\
                <input value=\"" + surname + "\" name=\"surname\" class=\"form-control\" type=\"text\" maxlength=40 required>\
            </div>\
            <div class=\"col\">\
                <input value=\"" + name + "\" name=\"name\" class=\"form-control\" type=\"text\" maxlength=100 required>\
            </div>\
            <div class=\"col\">\
                <select name=\"relationship\" id=\"relationship\" required>\
                    <option value=\"\">Seleccione</option>\
                    <option value=\"father\" " + ((relationship == "father") ? "selected" : "") + ">Padre</option>\
                    <option value=\"mother\" " + ((relationship == "mother") ? "selected" : "") + ">Madre</option>\
                    <option value=\"brother\" " + ((relationship == "brother") ? "selected" : "") + ">Hermano/a</option>\
                    <option value=\"son\" " + ((relationship == "son") ? "selected" : "") + ">Hijo/a</option>\
                    <option value=\"spouse\" " + ((relationship == "spouse") ? "selected" : "") + ">C&oacute;nyugue</option>\
                </select>\
            </div>\
            <div class=\"col\">\
                <input value=" + birthdate + " name=\"birthdate\" class=\"form-control\" type=\"number\" maxlength=4 required>\
            </div>\
            <div class=\"col\">\
                <div class=\"radio\">\
                    <label>S&iacute;<input type=\"radio\" name=\"live\" value=\"yes\" " + ((live == "yes") ? "checked" : "") + " required></label>\
                    <label>No<input type=\"radio\" name=\"live\" value=\"no\" " + ((live == "no") ? "checked" : "") + " required></label>\
                </div>\
            </div>\
            <div class=\"col\">\
                    <select value\" name=\"ocupation\" id=\"ocupation\" required>\
                        <option value=\"\">Seleccione</option>\
                        <option value=\"employee\"" + ((ocupation == "employee") ? "selected" : "") + ">Empleado</option>\
                        <option value=\"businnesman\"" + ((ocupation == "businnesman") ? "selected" : "") + ">Empresario</option>\
                        <option value=\"independent\"" + ((ocupation == "independent") ? "selected" : "") + ">Independiente</option>\
                        <option value=\"retired\"" + ((ocupation == "retired") ? "selected" : "") + ">Jubilado</option>\
                        <option value=\"doesnt work\"" + ((ocupation == "doesnt work") ? "selected" : "") + ">No trabaja</option>\
                    </select>\
            </div>\
            <div class=\"col\">\
                <input type=\"email\" value=\"" + email + "\" name=\"email\" class=\"form-control\" >\
            </div>\
            <div class=\"col\">\
                <img src=\"./src/delete_icon.png\" class=\"img-thumbnail\" style=\"height: 40px\">\
            </div>\
        </div>")

    $("#table").append(template);
}

function clean() {
    localStorage.clear();
    location.reload(true);
}

/*
    FALTA CHEQUEAR QUE ALGUNOS DE LOS CAMPOS DE LOS INPUT NO ENTRAN CORRECTAMENTE
*/