from flask_cors import CORS
from flask import Flask, jsonify, request
from database import obtener_gatos, crear_tabla, agregar_gato, eliminar_gato_por_id

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h1>Bienvenido a Gatopedia API 🐱</h1>"

@app.route('/gatos', methods=['GET', 'POST'])
def listar_gatos():
    if request.method == 'GET':
        crear_tabla()  # Asegura que la tabla existe
        gatos = obtener_gatos()
        # Convertimos la lista de tuplas a lista de diccionarios para JSON
        gatos_dict = []
        for g in gatos:
            gatos_dict.append({
                "id": g[0],
                "nombre": g[1],
                "origen": g[2],
                "descripcion": g[3],
                "imagen": g[4]
            })
        return jsonify(gatos_dict)
    
    elif request.method == 'POST':
        data = request.get_json()
        nombre = data.get('nombre')
        origen = data.get('origen')
        descripcion = data.get('descripcion')
        imagen = data.get('imagen')

        crear_tabla()
        nuevo_id = agregar_gato(nombre, origen, descripcion, imagen)
        
        return jsonify({
            'id': nuevo_id,
            "nombre": nombre,
            "origen": origen,
            "descripcion": descripcion,
            "imagen": imagen
        }), 201 



@app.route('/gatos/<int:id>', methods=['DELETE'])
def eliminar_gato(id):
    resultado = eliminar_gato_por_id(id)
    if resultado:
        return jsonify({'mensaje': 'Gato eliminado'}), 200
    else:
        return jsonify({'mensaje': 'Gato no encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)