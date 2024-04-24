var cajeroInicial = {
    100000: 500,
    50000: 900,
    20000: 2100,
    10000: 3200,
    5000: 5000,
    2000: 7000
};

// Copia de seguridad de los valores iniciales del cajero
var cajero = Object.assign({}, cajeroInicial);

// Función para calcular el total disponible en el cajero
function calcularTotalDisponible() {
    var total = 0;
    for (var key in cajero) {
        total += key * cajero[key];
    }
    return total;
}

// Función para realizar el retiro
function withdraw() {
    var amount = parseInt(document.getElementById("amount").value);
    var totalDisponible = calcularTotalDisponible();

    if (amount > totalDisponible) {
        document.getElementById("withdraw-result").innerHTML = "No hay suficiente saldo disponible en el cajero para realizar este retiro.";
        return;
    }

    var denominations = [100000, 50000, 20000, 10000, 5000, 2000];
    var result = {};
    var remainingAmount = amount;

    for (var i = 0; i < denominations.length; i++) {
        var denomination = denominations[i];
        var count = Math.min(Math.floor(remainingAmount / denomination), cajero[denomination]);
        if (count > 0) {
            result[denomination] = count;
            remainingAmount -= count * denomination;
        }
    }

    if (remainingAmount > 0) {
        document.getElementById("withdraw-result").innerHTML = "No se pueden entregar los billetes solicitados.";
        return;
    }

    var output = "<table>";
    output += "<tr><th>Denominación</th><th>Cantidad</th></tr>";
    for (var key in result) {
        output += "<tr><td>$" + key + "</td><td>" + result[key] + "</td></tr>";
        cajero[key] -= result[key];
    }
    output += "</table>";

    document.getElementById("withdraw-result").innerHTML = output;
    showSaldo();
}

// Función para mostrar el saldo en el cajero
function showSaldo() {
    var output = "<table>";
    output += "<tr><th>Denominación</th><th>Cantidad</th></tr>";
    for (var key in cajero) {
        output += "<tr><td>$" + key + "</td><td>" + cajero[key] + "</td></tr>";
    }
    output += "</table>";
    document.getElementById("saldo-result").innerHTML = output;
    document.getElementById("total-disponible").innerHTML = "Total disponible en el cajero: $" + calcularTotalDisponible();
}

// Función para borrar el valor del campo de entrada
function clearInput() {
    document.getElementById("amount").value = "";
    document.getElementById("withdraw-result").innerHTML = "";
    document.getElementById("saldo-result").innerHTML = "";
    document.getElementById("total-disponible").innerHTML = "";
}

// Función para ver el saldo en el cajero
function verSaldo() {
    showSaldo();
}

// Función para recargar el cajero a los valores iniciales
function recargarCajero() {
    cajero = Object.assign({}, cajeroInicial);
    showSaldo();
}
