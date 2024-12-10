// Show the form
function showDemandas() {
    hideAllForms();
    $('#formDemandas').fadeIn();
}

function showPromociones() {
    hideAllForms();
    $('#formPromociones').fadeIn();
}

function showConsulta() {
    hideAllForms();
    $('#formConsultaGral').fadeIn();
}

function hideAllForms() {
    $('#formDemandas').hide();
    $('#formPromociones').hide();
    $('#formConsultaGral').hide();
}

function fadeOutAllForms() {
    $('#formDemandas').fadeOut();
    $('#formPromociones').fadeOut();
    $('#formConsultaGral').fadeOut();
}

$(document).ready(function () {
    var activeNavItem = $(".sidebar .nav-link");

    //new DataTable('#ejemplo', {
    //    scrollX: true,
    //    scrollY: 200
    //});

    $.getJSON("./json/expediente.json", function (expedientesData) {
        console.log(expedientesData);

        $("#grid").kendoGrid({
            dataSource: {
                data: null, //expedientesData,
                schema: {
                    model: {
                        fields: {
                            Expediente: { type: "number" },
                            Actor: { type: "string" },
                            Fecha: { type: "string" },
                            Cuantia: { type: "number" },
                            Materia: { type: "string" },
                            Usuario: { type: "string" },
                            Enviado: { type: "string" },
                            Recibido: { type: "string" }
                        }
                    }
                },
                pageSize: 10
            },
            height: 310,
            scrollable: true,
            sortable: true,
            columns: [
                {
                    field: "﻿Expediente", format: "{0:c}", width: "130px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Actor", format: "{0:c}", width: "817px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Fecha", width: "130px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Cuantia", title: "Cuantía", width: "130px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Materia", format: "{0:c}", width: "500px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Usuario", format: "{0:c}", width: "300px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Enviado", format: "{0:c}", width: "200px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                },
                {
                    field: "Recibido", format: "{0:c}", width: "200px", headerAttributes: {
                        "class": "table-header-cell !k-justify-content-center",
                        style: "font-size: 16px; font-weight: bold;"
                    }
                }
            ]
        });
    });



    activeNavItem.on("click", function () {
        $(".sidebar").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    //$('#example').DataTable({
    //    processing: true,
    //    serverSide: true,
    //    ajax: { url: "http://127.0.0.1:5500/json/expediente.json", dataSrc: "" },
    //    buttons: false,
    //    searching: false,
    //    paging: false,
    //    layout: { bottomStart: null }
    //});

    //$('#example').dataTable().destroy(); 

    var expedienteTable = $('#example').DataTable({
        ajax: { url: "http://127.0.0.1:5500/json/expediente.json", dataSrc: "" }
        //, autoWidth: false
        //, pageLength: 10
        //, info: false
        //, responsive: true
        //, scrollX: true
        //, scrollY: 330 /*muestra 7 registros*/
        //, deferRender: true
        //, processing: true
        //, stateSave: true
        //, searching: false
        //, paging: false
        , columns: [
            { "data": "﻿Expediente" },
            { "data": "Actor" },
            { "data": "Fecha" },
            { "data": "Cuantia" },
            { "data": "Materia" },
            { "data": "Usuario" },
            { "data": "Enviado" },
            { "data": "Recibido" }
        ]
        /*        , fixedHeader: false*/


    });

    //expedienteTable.columns.adjust().draw();


    $.getJSON("./json/clac_leyes.json", function (leyesData) {
        console.log(leyesData);

        //Ordenar por ley alfabéticamente
        leyesData = leyesData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(leyesData, function (i, option) {
            $('#leyesList').append($('<option/>').attr("value", option.cve_ley).text(option.descripcion));
        });

    });
    $(function () {
        $("#leyesList").change(function () {
            //Actualizar clave en el campo texto
            $('#leyesTextInput').val(this.value);
        });
    });

    $.getJSON("./json/clac_materias.json", function (materiasData) {
        console.log(materiasData);

        //Ordenar por materia alfabéticamente
        materiasData = materiasData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(materiasData, function (i, option) {
            $('#materiasList').append($('<option/>').attr("value", option.cve_materia).text(option.descripcion));
        });
    });
    $(function () {
        $("#materiasList").change(function () {
            //Actualizar clave en el campo texto
            $('#materiaTextInput').val(this.value);
        });
    });

    $.getJSON("./json/clac_tipos_materia.json", function (tiposMateriaData) {
        console.log(tiposMateriaData);

        //Ordenar por tipo de materia alfabéticamente
        tiposMateriaData = tiposMateriaData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(tiposMateriaData, function (i, option) {
            $('#tiposMateriaList').append($('<option/>').attr("value", option.cve_tipomateria).text(option.descripcion));
        });
    });
    $(function () {
        $("#tiposMateriaList").change(function () {
            //Actualizar clave en el campo texto
            $('#tiposMateriaTextInput').val(this.value);
        });
    });

    //Cascading dropdown list
    //Filtrar tipos mediante la promoción seleccionada previamente
    $.getJSON("./json/clac_promociones.json", function (promocionesData) {
        console.log(promocionesData);

        //Ordenar promociones alfabéticamente
        promocionesData = promocionesData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(promocionesData, function (i, option) {
            $('#promoList').append($('<option/>').attr("value", option.cve_promocion).text(option.descripcion));
        });
    });

    $(function () {
        $("#promoList").change(function () {
            //Actualizar clave en el campo texto
            $('#promoTextInput').val(this.value);

            //const tipos = $(tiposPromoData).filter(t => t.cve_promocion == this.value);

            var tiposPromoData = $.getJSON("./json/clac_tipos_promocion.json");
            //const products = Array.from(productData);
            //const tipos = $(tiposPromoData).filter(t => t.cve_promocion == this.value);
            console.clear();
            //console.log(tiposPromoData);
            //tiposPromoData.forEach(element => {
            //    const tipo = "<option val='" + element.state + "</option>";
            //    $(tiposPromoList).append(tipo);


            $(tiposPromoData).each(function (index, element) {
                console.log(element);
            });

        });
    });
    $.getJSON("./json/clac_tipos_promocion.json", function (tiposPromoData) {
        console.log(tiposPromoData);

        //Ordenar por subtipo de promoción alfabéticamente
        tiposPromoData = tiposPromoData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(tiposPromoData, function (i, option) {
            $('#tiposPromoList').append($('<option/>').attr("value", option.cve_tipopromocion).text(option.descripcion));
        });
    });
    $(function () {
        $("#tiposPromoList").change(function () {
            //Actualizar clave en el campo texto
            $('#tiposPromoTextInput').val(this.value);
        });
    });
    $.getJSON("./json/clac_autsuperiores.json", function (promoventeData) {
        console.log(promoventeData);

        //Ordenar por promovente alfabéticamente
        promoventeData = promoventeData.sort((a, b) => {
            if (a.descripcion < b.descripcion) {
                return -1;
            }
        });

        $.each(promoventeData, function (i, option) {
            $('#promoventeList').append($('<option/>').attr("value", option.cve_autsuperior).text(option.descripcion));
        });
    });
    $(function () {
        $("#promoventeList").change(function () {
            //Actualizar clave en el campo texto
            $('#promoventeTextInput').val(this.value);
        });
    });
    $('form').submit(function (e) {
        e.preventDefault();
        var expFilter = $("#expTextInput").val();
        console.clear();
        
        $.getJSON("./json/expediente.json", function (expedientesData) {

            /*expedientesData = expedientesData.filter(d => d.Expediente.includes("77")) ;*/
            console.log(expFilter);
            console.log(expedientesData);

            //for (var i = 0; i <= expedientesData.lenght; i++) {
            //    console.log(i);
            //};
            
            //const arr1 = expedientesData.filter(d => d.Expediente == expFilter);
            //console.log("expFilter", arr1);

            //let jsonObj;
            //try {
            //    jsonObj = JSON.parse(JSON.stringify(expedientesData)).filter(d => d.Expediente == "1 / 18 - 28-01 - 6");
            //} catch (e) {
            //    jsonObj = expedientesData
            //}

            //console.log(expFilter);
            //console.log(jsonObj);
        });
    });
});

$(function () {
    $('#datepicker').datepicker();
});
$(function () {
    $('#datepicker1').datepicker();
});
$(function () {
    $('#datepicker2').datepicker();
});
$(function () {
    $('#datepicker3').datepicker();
});
$(function () {
    $('#datepicker4').datepicker();
});
$(function () {
    $('#datepicker5').datepicker();
});
