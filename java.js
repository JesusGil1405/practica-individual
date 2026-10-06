const MAX_PEDIDO = 3;
const CIRCULOS = document.querySelectorAll(".color");
const TALLAS = document.querySelectorAll(".talla");
const FOTO = document.getElementById("foto");
const STOCK = document.getElementById("stock");
const BTN_ANADIR = document.getElementById("btnAnadir");
const MENSAJE = document.getElementById("mensaje");

let colorElegido = "";
let tallaElegida = "";
let enCesta = 0;
let unidades = 0;
let unidadesXS = 0;
let unidadesS = 3;
let unidadesM = 12;
let unidadesL = 1;
let unidadesXL = 6;

let anadidoEnCesta = false;

function unidadesEnStock(talla, anadidoEnCesta) {
	switch (talla) {
		case "XS":
			if (anadidoEnCesta === true) {
				unidadesXS--;
			}
			return unidadesXS;
		case "S":
			if (anadidoEnCesta === true) {
				unidadesS--;
			}
			return unidadesS;
		case "M":
			if (anadidoEnCesta === true) {
				unidadesM--;
			}
			return unidadesM;
		case "L":
			if (anadidoEnCesta === true) {
				unidadesL--;
			}
			return unidadesL;
		case "XL":
			if (anadidoEnCesta === true) {
				unidadesXL--;
			}
			return unidadesXL;
	}
}

// COLORES
for (let i = 0; i < CIRCULOS.length; i++) {
	CIRCULOS[i].style.backgroundColor = CIRCULOS[i].textContent;
	CIRCULOS[i].style.border = "4px solid transparent";

	CIRCULOS[i].addEventListener("mouseover", function () {
		FOTO.style.backgroundColor = CIRCULOS[i].textContent;
		FOTO.textContent = CIRCULOS[i].textContent;
		FOTO.style.color = "white";
	});

	CIRCULOS[i].addEventListener("mouseout", function () {
		if (colorElegido === "") {
			FOTO.style.backgroundColor = "lightgray";
			FOTO.textContent = "Vista previa";
			FOTO.style.color = "black";
		} else {
			FOTO.style.backgroundColor = colorElegido;
			FOTO.textContent = colorElegido;
		}
	});

	CIRCULOS[i].addEventListener("click", function () {
		for (let i = 0; i < CIRCULOS.length; i++) {
			CIRCULOS[i].style.border = "4px solid transparent";
		}
		CIRCULOS[i].style.border = "4px solid orange";
		colorElegido = CIRCULOS[i].textContent;
		FOTO.style.color = "white";
	});
}

// TALLAS
for (let i = 0; i < TALLAS.length; i++) {
	TALLAS[i].addEventListener("click", function () {
		for (let i = 0; i < TALLAS.length; i++) {
			TALLAS[i].style.backgroundColor = "";
		}

		let talla = TALLAS[i].textContent;
		unidades = unidadesEnStock(talla, anadidoEnCesta);
		comprobarStock(unidades, talla);
		TALLAS[i].style.backgroundColor = "orange";
	});
}

// AÑADIR A LA CESTA
BTN_ANADIR.addEventListener("click", function () {
	if (colorElegido === "" && tallaElegida === "") {
		MENSAJE.textContent = "Te falta elegir el color y la talla";
	} else if (colorElegido === "") {
		MENSAJE.textContent = "Te falta elegir el color";
	} else if (tallaElegida === "") {
		MENSAJE.textContent = "Te falta elegir la talla";
	} else if (enCesta >= MAX_PEDIDO) {
		MENSAJE.textContent = `Máximo ${MAX_PEDIDO} por pedido`;
	} else {
		enCesta = enCesta + 1;
		anadidoEnCesta = true;
		unidades = unidadesEnStock(tallaElegida, anadidoEnCesta);
		anadidoEnCesta = false;
		comprobarStock(unidades, tallaElegida);
		MENSAJE.textContent = `Añadida: sudadera ${colorElegido} talla ${tallaElegida} (${enCesta} en la cesta)`;
	}
});

function comprobarStock(unidades, talla) {
	if (unidades === 0) {
		STOCK.textContent = `Talla ${talla} agotada`;
		STOCK.style.color = "red";
		tallaElegida = "";
	} else {
		if (unidades === 1) {
			STOCK.textContent = `¡Solo queda 1 en talla ${talla}!`;
			STOCK.style.color = "orange";
		} else if (unidades <= 3) {
			STOCK.textContent = `¡Solo quedan ${unidades} en talla ${talla}!`;
			STOCK.style.color = "orange";
		} else {
			STOCK.textContent = `Talla ${talla} disponible`;
			STOCK.style.color = "green";
		}

		tallaElegida = talla;
	}
}
