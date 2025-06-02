import sqlite3

DB_NAME = "gatos.db"

def conectar():
    return sqlite3.connect(DB_NAME)

def crear_tabla():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            origen TEXT,
            descripcion TEXT
        )
    ''')
    conn.commit()
    conn.close()

def agregar_gato(nombre, origen, descripcion):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO gatos (nombre, origen, descripcion)
        VALUES (?, ?, ?)
    ''', (nombre, origen, descripcion))
    conn.commit()
    conn.close()

def obtener_gatos():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM gatos')
    gatos = cursor.fetchall()
    conn.close()
    return gatos
