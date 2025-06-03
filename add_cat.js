document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form-gato")
    const contenedor = document.getElementById('lista-gatos');
    const gatos = [];
    const API_NINJAS_KEY = '/pUHRRxJIR2IcK+KHQ/0Ug==IuvFqj68mpFSZgCe'; // Reemplaza con tu clave real



    // Cargar gatos existentes
    fetch('http://127.0.0.1:5000/gatos')
        .then(response => response.json())
        .then(data => {
            data.forEach(gato => {
                if (!gato.nombre || !gato.origen || !gato.descripcion || !gato.imagen ||
                    gato.nombre === 'undefined' || gato.origen === 'undefined' || gato.descripcion === 'undefined' || gato.imagen === 'undefined') {
                    return;
                }


                const div = document.createElement('div');
                div.className = 'gato';
                div.innerHTML = `
                    <h3>${gato.nombre}</h3>
                    <p><strong>Origen:</strong> ${gato.origen}</p>
                    <p>${gato.descripcion}</p>
                    <img src="${gato.imagen}" alt="${gato.nombre}" style="width: 100%; max-width: 200px; border-radius: 8px;">
                `;
                contenedor.appendChild(div);
            });
        });

    // Manejar formulario


    /*const nuevoGato = {
        nombre: document.getElementById('nombre').value,
        origen: document.getElementById('origen').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: document.getElementById('imagen').value // <- Aquí
    };

    fetch('http://127.0.0.1:5000/gatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoGato)
    })
        .then(response => response.json())
        .then(data => {
            const div = document.createElement('div');
            div.className = 'gato';
            div.innerHTML = `
                <h3>${data.nombre}</h3>
                <p><strong>Origen:</strong> ${data.origen}</p>
                <p>${data.descripcion}</p>
                <img src="${data.imagen}" alt="${data.nombre}" style="width: 100%; max-width: 200px; border-radius: 8px;">
            `;
            contenedor.appendChild(div);
            form.reset();
        })
        .catch(error => console.error('Error al agregar gato:', error));*/

    async function obtenerDatosDeGato(nombre) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/cats?name=${encodeURIComponent(nombre)}`, {
                headers: {
                    'X-Api-Key': API_NINJAS_KEY
                }
            });

            const data = await response.json();
            if (!data || data.length === 0) {
                throw new Error("No se encontró esa raza de gato.");
            }

            return data[0]; // Devuelve el primer resultado
        } catch (error) {
            console.error("Error al obtener datos del gato:", error);
            throw error;
        }
    }

    function renderizarGatos() {
        contenedor.innerHTML = ""; // Limpiar

        gatos.forEach((gato) => {
            const div = document.createElement("div");
            div.classList.add("gato");

            const img = document.createElement("img");
            img.src = gato.imagen;
            img.alt = `Imagen de ${gato.nombre}`;

            const h3 = document.createElement("h3");
            h3.textContent = gato.nombre;

            const origen = document.createElement("p");
            origen.innerHTML = `<strong>Origen:</strong> ${gato.origen}`;

            const desc = document.createElement("p");
            desc.textContent = gato.descripcion;

            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(origen);
            div.appendChild(desc);

            //div.innerHTML = `
            // <img src="${gato.imagen}" alt="Imagen de ${gato.nombre}" />
            // <h3>${gato.nombre}</h3>
            // <p><strong>Origen:</strong> ${gato.origen}</p>
            // <p>${gato.descripcion}</p>
            //`;

            contenedor.appendChild(div);
        });
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault()

        const nombre = document.getElementById("nombre").value.trim();

        if (!nombre) {
            alert("Por favor escribe el nombre de una raza de gato.");
            return;
        }

        try {
            // 🔎 Buscar en la API de API Ninjas
            const apiKey = '/pUHRRxJIR2IcK+KHQ/0Ug==IuvFqj68mpFSZgCe'; // clave real
            const response = await fetch(`https://api.api-ninjas.com/v1/cats?name=${encodeURIComponent(nombre)}`, {
                headers: { 'X-Api-Key': apiKey }
            });

            /*const resultados = await response.json();
            const gatoApi = resultados[0];

            const nuevoGato = {
                nombre: gatoApi.name,
                origen: gatoApi.origin,
                descripcion: `Expectativa de vida: ${gatoApi.min_life_expectancy} - ${gatoApi.max_life_expectancy} años. Peso: ${gatoApi.min_weight} - ${gatoApi.max_weight} lb.`,
                imagen: gatoApi.image_link || "https://placekitten.com/200/300" // Imagen por defecto
            };

            // 💾 Guardar en el backend
            const saveResponse = await fetch('http://127.0.0.1:5000/gatos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoGato)
            });*/

            const data = await response.json();

            if (!data || data.length === 0) {
                alert("No se encontró esa raza de gato.");
                return;
            }

            const gatoApi = data[0];

            // 🚨 Aquí va tu validación de imagen
            if (!gatoApi.image_link) {
                alert("Esta raza no tiene imagen disponible.");
                return;
            }

            const nuevoGato = {
                nombre: gatoApi.name,
                origen: gatoApi.origin,
                descripcion: `Expectativa de vida: ${gatoApi.min_life_expectancy} - ${gatoApi.max_life_expectancy} años. Peso: ${gatoApi.min_weight} - ${gatoApi.max_weight} lb.`,
                imagen: gatoApi.image_link
            };

            // 💾 Guardar en tu backend
            const saveResponse = await fetch('http://127.0.0.1:5000/gatos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoGato)
            });

            const savedData = await saveResponse.json();

            // Mostrar en pantalla
            gatos.push(nuevoGato);
            renderizarGatos();
            form.reset();
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error al agregar gato:", error);
        }
    });

});
