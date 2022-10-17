//CLASS CLIENTE

class Cliente {

    constructor (nombre, apellido, edad, dni) {
        
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
    
    }

};

const listaClientes = [];

listaClientes.push(new Cliente ("Mario", "Gonzalez", 40, 1234));

const registrarCliente = new Cliente (prompt("Ingrese su nombre"), prompt("Ingrese su apellido"), parseInt(prompt("Ingrese su edad")), parseInt(prompt("Ingrese su dni")));

listaClientes.push(registrarCliente);

// console.log(listaClientes);


//CLASS HABITACION

class Habitacion {

    constructor(numeroHabitacion, capacidad) {
        
        this.numeroHabitacion = numeroHabitacion;
        this.capacidad = capacidad;
        this.cliente = null;
        this.reservado = false;
    
    }

    reservar(cliente, estadia, precio){

        this.cliente = cliente;
        this.estadia = estadia;
        this.precio = precio;
        this.reservado = true;

        if (this.precio !== undefined) {

            alert(`Su reserva fue registrada exitosamente.\nNombre y apellido: ${this.cliente.nombre} ${this.cliente.apellido}\nSu estadia será: ${this.estadia}\nEl precio de su estadia será: $${this.precio}`)

        }

    }

    desalojar(){

        this.cliente = null;
        this.estadia = null;
        this.precio = null;
        this.reservado = false;

    }

};

const listaHabitaciones = [];

listaHabitaciones.push(new Habitacion(1, 1));
listaHabitaciones.push(new Habitacion(2, 2));
listaHabitaciones.push(new Habitacion(3, 3));
listaHabitaciones.push(new Habitacion(4, 4));

// console.log(listaHabitaciones);

listaHabitaciones[1].reservar(listaClientes[0], "12/08/2023 hasta 19/08/2023", undefined);


//FN QUE BUSCA HABITACION PARA LA CANTIDAD DE PERSONAS INGRESADA

function buscarHabitacion (capacidad) {

    let habitacionEncontrada;

    for (let i = 0; i < listaHabitaciones.length;i++) {

        if (listaHabitaciones[i].capacidad === capacidad) {
            
            habitacionEncontrada = listaHabitaciones[i];
            break;
            
        }

    }

    return habitacionEncontrada;

};


//FN QUE CONFIRMA QUE LA HABITACION ENCONTRADA NO ESTE OCUPADA PREVIAMENTE

function confirmarDisponibilidad (habitacion) {

    let disponible = false;

    if (habitacion.reservado === false) {

        disponible = true;

    } else {

        disponible = false;

    }

    return disponible;

};


//INGRESO CUANTAS PERSONAS VAN A REGISTRARSE PARA LA HABITACION

let personasARegistrar = parseInt (prompt ("Ingrese la cantidad de personas que desea registrar, mínimo 1 - máximo 4"));

while (personasARegistrar < 1 || personasARegistrar > 4) {

    personasARegistrar = parseInt (prompt ("El valor ingresado es invalido, intentelo nuevamente"));

};

let habitacionAReservar = buscarHabitacion(personasARegistrar);

let estaDisponible = confirmarDisponibilidad(habitacionAReservar);


//SI LA HABITACION NO ESTA DISPONIBLE, VUELVO A INGRESAR

while (estaDisponible === false) {

    alert("No hay habitaciones disponibles para la cantidad de personas ingresada, vuelta a intentarlo");

    personasARegistrar = parseInt (prompt ("Ingrese la cantidad de personas que desea registrar, mínimo 1 - máximo 4"));

    while (personasARegistrar < 1 || personasARegistrar > 4) {

        personasARegistrar = parseInt (prompt ("El valor ingresado es invalido, intentelo nuevamente"));

    };

    habitacionAReservar = buscarHabitacion(personasARegistrar);

    estaDisponible = confirmarDisponibilidad(habitacionAReservar);

};


//FECHA DE INGRESO/SALIDA Y ESTADIA TOTAL

alert("Ingrese la fecha en la que desea realizar su reserva");
let fechaDeIngreso = new Date (parseInt(prompt("Ingrese el año de ingreso")), parseInt(prompt("Ingrese el mes de ingreso")), parseInt(prompt("Ingrese el día de ingreso")));
let fechaDeSalida = new Date (parseInt(prompt("Ingrese el año de salida")), parseInt(prompt("Ingrese el mes de salida")), parseInt(prompt("Ingrese el día de salida")));

while (fechaDeSalida <= fechaDeIngreso) {

    alert("La fecha ingresada no es correcta, vuelta a intentarlo");
    fechaDeIngreso = new Date (parseInt(prompt("Ingrese el año de ingreso")), parseInt(prompt("Ingrese el mes de ingreso")), parseInt(prompt("Ingrese el día de ingreso")));
    fechaDeSalida = new Date (parseInt(prompt("Ingrese el año de salida")), parseInt(prompt("Ingrese el mes de salida")), parseInt(prompt("Ingrese el día de salida")));

};

fechaEstadia = `Desde ${fechaDeIngreso} hasta ${fechaDeSalida}`;


//PRECIO ESTADIA

precioTotal = (((fechaDeSalida - fechaDeIngreso) * (1 / 86400000)) * 6000) * personasARegistrar;


//RESERVO HABITACION

habitacionAReservar.reservar(registrarCliente, fechaEstadia, precioTotal);

console.log(listaHabitaciones);


//DESALOJO LA HABITACION RESERVADA PREVIAMENTE

// listaHabitaciones[1].desalojar();

// console.log(listaHabitaciones);

//LISTA HABITACIONES DISPONIBLES

let habitacionesDesocupadas = listaHabitaciones.filter((el) => {

    return el.reservado === false;

});

console.log(habitacionesDesocupadas);


//LISTA HABITACIONES OCUPADAS

let habitacionesOcupadas = listaHabitaciones.filter((el) => {

    return el.reservado === true;

});

console.log(habitacionesOcupadas);