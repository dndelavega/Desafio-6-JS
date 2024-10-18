const api = "https://mindicador.cl/api";
const btn = document.getElementById('btnConvertir');
const pesos = document.getElementById('pesosDisplay');
const res= document.getElementById('resultadoDisplay');
let grafico = document.getElementById("grafico");
let myChart


const buscarMoneda = async (monedas) => {
    try {
        const res = await fetch(`${api}/${monedas}`);
        const data = await res.json();
        const valorHoy = data.serie[0].valor;
        const datosFechaValor = data.serie.splice(0, 10);

        operacion(valorHoy, monedas);
        ordenarPorFechas(datosFechaValor);

    } catch (error) {
        alert("Ocurrió un error, inténtalo nuevamente o más tarde");
    };

};

btn.addEventListener('click', () => {

    const option = document.getElementById('selectPesos').value;
    buscarMoneda(option);
});

const operacion = (dato, moneda) => {

    const valorInput = document.getElementById('inputPesos').value
    let operacionValor
    let valorModificado

    if (moneda === "dolar") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(3)} DOLARES`
    }
    else if (moneda === "euro") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(3)} EUROS`
    }
    else if (moneda === "uf") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(3)} UF`
    }
    else if (moneda === "utm") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(3)} UTM`
    }
    else if (moneda === "bitcoin") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(3)} Bitcoin`
    }

    pesos.innerHTML = ` ${valorInput} CLP hoy `;
    res.innerHTML = `equivalen a ${valorModificado}`;

};

const estructuraFecha = (date) => {

    date = new Date(date);
    const anio = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dias = date.getDate();
    return `${dias}-${mes}-${anio}`;

};

const ordenarPorFechas = (datos) => {

    const datoOrdenado = datos.sort((a, b) => {
        if (a.fecha < b.fecha) {
            return -1;
        }
        if (a.fecha > b.fecha) {
            return 1;
        }
        return 0;
    }
    );

    const ordenFechas = datoOrdenado.map(c => estructuraFecha(c.fecha));
    const valorMoneda = datoOrdenado.map(d => d.valor);
    creacionGrafico(valorMoneda, ordenFechas);

};

const creacionGrafico = (valores, fechas) => {

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(grafico, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [
                {
                    label: `Historial últimos 10 días`,
                    data: valores,
                    borderColor: "red",
                    color: 'red',
                }
            ]
        }
    })
};