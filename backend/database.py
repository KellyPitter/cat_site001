import sqlite3

DB_NAME = "gatos.db"

def conectar():
    return sqlite3.connect(DB_NAME)

def crear_tabla():
    conn = sqlite3.connect('gatos.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS gatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            origen TEXT,
            descripcion TEXT,
            imagen TEXT
        )
    ''')
    conn.commit()
    conn.close()

def obtener_gatos():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM gatos')
    gatos = cursor.fetchall()
    conn.close()
    return gatos

def agregar_gato(nombre, origen, descripcion, imagen):
    conn = sqlite3.connect('gatos.db')
    c = conn.cursor()
    c.execute('''INSERT INTO gatos (nombre, origen, descripcion, imagen) VALUES (?, ?, ?, ?)''',
              (nombre, origen, descripcion, imagen))
    conn.commit()
    nuevo_id = c.lastrowid
    conn.close()
    return nuevo_id

def eliminar_gato_por_id(id):
    conn = sqlite3.connect('gatos.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM gatos WHERE id = ?', (id,))
    conn.commit()
    filas_afectadas = cursor.rowcount
    conn.close()
    return filas_afectadas > 0
