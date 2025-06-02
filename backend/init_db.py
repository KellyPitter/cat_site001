from database import crear_tabla, agregar_gato, obtener_gatos

crear_tabla()

agregar_gato("Siames", "Tailandia", "Gato elegante, sociable y vocal.")
agregar_gato("Maine Coon", "EE.UU.", "Gigante gentil, muy peludo y amistoso.")
agregar_gato("Bengalí", "Asia", "Gato activo con patrón similar a un leopardo.")

for gato in obtener_gatos():
    print(gato)
