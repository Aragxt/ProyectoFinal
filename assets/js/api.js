var mun = [];
var ver= [];

//Consumo de la API
fetch('https://www.datos.gov.co/resource/sqeg-ns6a.json')

//Then necesita una promesa, y esa promesa se resuelve con una respuesta convertida a json
.then(datos_obtenidos => datos_obtenidos.json())

// datos_obtenidos es el resultado de la promesa respuesta, la cual fue convertida a un json
.then(function transformar (datos_obtenidos) {

//Iteramos sobre cada dato
datos_obtenidos.forEach(function agregar (datos_obtenidos) 
{
    //Si los datos son diferentes de vacío
    if (datos_obtenidos.estrato != undefined && datos_obtenidos.vertimiento_basico != undefined) 
    {
        mun.push(datos_obtenidos.estrato);
        ver.push(datos_obtenidos.vertimiento_basico);
    }
});


//Variables para las gráficas
var graf1 = 
{
    y: ver,
    x: mun,
    type: 'bar',

    transforms: [
        {
          type: 'groupby',
          groups: mun,
          styles: [
            {target: "1", value: {marker: {color: 'yellow'}}},
            {target: "2", value: {marker: {color: 'silver'}}},
            {target: "3", value: {marker: {color: 'red'}}},
            {target: "4", value: {marker: {color: 'green'}}},
        ]
       }]
};

var datosGraficas = [graf1];

//Estilos de la gráfica
var layout = 
{
   
    title: 'Consumo de agua por estratos',
    xaxis: 
    {
        title: 'Estrato'
    },
    yaxis: 
    {
        title: 'Vertimiento básico'
    }

};

Plotly.newPlot('myDiv', datosGraficas, layout);
});
