# UCalculadora

<a href="https://madot10.github.io/UCalculadora/"><img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white" /></a>

![enter image description here](https://repository-images.githubusercontent.com/122566749/3c484880-6a0d-11e9-909e-be1522c08871)
**Febrero - 2018**

Herramienta para el cálculo de matrícula de la Universidad Católica Andrés Bello **(UCAB)** según las Unidades de Crédito **(UC)** inscritas.

_Desarrollo personal de Miguel De Olim._

Link a [UCalculadora](https://madot10.github.io/UCalculadora/)

¿Quieres contribuir? Dirigete a la sección de **Issues** o Pull **Request**

Puedes aparecer en la web como colaborador (🆕)

## ¿Cómo funciona?

1. [Materias](#link1)
2. [Valor UC](#link2)
3. [Cálculo](#link3)

### Materias <div id='link1'/>

Dentro de la carpeta `/js/carreras/` encontrarás múltiples archivos `.js`, los cuales tienen la variable que almacena el array de objectos de cada materia. Ejemplo:

> {
> Semestre: "PRIMER SEMESTRE",
> Asignatura: "Comprensión Lectora y Redacción",
> UC: 5,
> Tax: "TA‐6",
> }

Para 2018, fue una decisión de diseño (y novatada) guardar la variable y no un JSON simplemente, no hay impedimento para cambiarlo. Horarios+ utiliza estos archivos para cargar las materias.

### Valor UC <div id='link2' />

El sistema ha cambiado con el tiempo, hubo un periodo donde el valor de todo el semestre no se conocia y este era anunciado semanas antes del pago, por ello, se contaba con el valor UC por fechas.

Actualmente se ha aplicado un cambio para que sea un valor UC por mes (1 al 5), soportando variaciones.

En el archivo `/js/data.js` encontrarás el nuevo formato el cual no guardará los datos de periodos anteriores:

> let ucByPeriodo = {

    verano: {
    	base: 13.2,
    },
    semestre: {
    	base: 10,
    	variacion: [
    		12,
    		12,
    		13,
    		13,
    		13,
    	] /** Monto UC*/,
    },

};

### Cálculo <div id='link3'/>

Para realizar el cálculo luego de la selección de sede, materias y cooperación económica (almacenados en variables globales), se llama al método `calcularMatricula()` y luego de las validaciones a `totalizacion()`

1. Se realizan los descuento de sedes sobre el valor real de la uc
2. Descuento por cooperación económica, tomando en cuenta las UC base y recargos (política DCEE)
3. Es cálculado el valor mensual del pago
4. Al presentarse en la tablas correspondientes de cada modalidad, se aplica la multiplicación por el número de meses `generarPagos()`
