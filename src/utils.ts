
function redondear(valor: number, decimales: number) {
    let factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
}

function numeroValido(valor: number) {
    return !isNaN(valor) && valor > 0;
}

export { redondear, numeroValido };