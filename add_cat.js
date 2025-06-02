document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById('lista-gatos');


    // Cargar gatos existentes
    fetch('http://127.0.0.1:5000/gatos')
        .then(response => response.json())
        .then(data => {
            data.forEach(gato => {
                const div = document.createElement('div');
                div.className = 'gato';
                div.innerHTML = `
          <h3>${gato.nombre}</h3>
          <p><strong>Origen:</strong> ${gato.origen}</p>
          <p>${gato.descripcion}</p>
        `;
                contenedor.appendChild(div);
            });
        });

    // Manejar formulario
    const form = document.getElementById('form-gato');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nuevoGato = {
            nombre: document.getElementById('nombre').value,
            origen: document.getElementById('origen').value,
            descripcion: document.getElementById('descripcion').value
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
        `;
                contenedor.appendChild(div);
                form.reset();
            })
            .catch(error => console.error('Error al agregar gato:', error));
    });
});
