import { redondear, numeroValido } from './utils';

export class Cuota {
    numero : number = 0;
    anyo : number = 0;
    mes : number = 0;
    capitalInicial : number = 0;
    intereses : number = 0;
    capitalAmortizado : number = 0;
    cuota : number = 0;
    capitalPendiente : number = 0;

    public redondear(decimales : number = 2) {
        this.capitalInicial = redondear(this.capitalInicial, decimales);
        this.cuota = redondear(this.cuota, decimales);
        this.intereses = redondear(this.intereses, decimales);
        this.capitalAmortizado = redondear(this.capitalAmortizado, decimales);
        this.capitalPendiente = redondear(this.capitalPendiente, decimales);
    }

}

export class Hipoteca {
    public capital: number;
    public interes: number;
    public plazos: number;

    constructor(capital: number, interes: number, años: number) {
        if (!numeroValido(capital)) {
            throw new Error('El capital debe ser un número mayor que cero');
        }
        if (!numeroValido(interes)) {
            throw new Error('El interés debe ser un número mayor que cero');
        }
        if (!numeroValido(años)) {
            throw new Error('El plazo debe ser un número mayor que cero');
        }
        this.capital = capital;
        this.interes = interes;
        this.plazos = años * 12;
    }

    public calcularCuotas(): Cuota[] {
        console.log('Calculando cuotas... capital:', this.capital, 'interes:', this.interes, 'plazos:', this.plazos);
        let interesMensual : number = this.interes / 12 / 100;
        let cuotaMensual : number = redondear((this.capital * interesMensual) / (1 - Math.pow(1 + interesMensual, -this.plazos)), 2);
        let capitalInicial : number = this.capital;
        let cuotas : Cuota[] = [];
        for (let i = 0; i < this.plazos; i++) {
            let cuota : Cuota = new Cuota();
            cuota.numero = i + 1;
            cuota.anyo = Math.floor(i / 12) + 1;
            cuota.mes = i % 12 + 1;
            cuota.capitalInicial = capitalInicial;
            cuota.intereses = capitalInicial * interesMensual;
            if (capitalInicial < cuotaMensual) {
                cuota.cuota = capitalInicial + cuota.intereses;
                cuota.capitalAmortizado = capitalInicial;
                cuota.capitalPendiente = 0;
            } else {
                cuota.cuota = cuotaMensual;
                cuota.capitalAmortizado = cuotaMensual - cuota.intereses;
                cuota.capitalPendiente = capitalInicial - cuota.capitalAmortizado;
            }
            cuota.redondear();
            cuotas.push(cuota);
            capitalInicial = capitalInicial - cuota.capitalAmortizado
        }
        return cuotas;
    }

}