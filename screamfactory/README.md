# ScreamFactory

Aplicación web desarrollada con React y Vite inspirada en el universo de Monsters Inc

Permite gestionar monstruos, asignar misiones energéticas y visualizar métricas de la fábrica mediante un sistema de autenticación con roles

---

# Alumna:

- **Nombre:** Eliana Bermúdez
- **Carrera:** Analista de Sistemas
- **Materia:** Plataformas de Desarrollo
- **Cuatrimestre:** 4° Cuatrimestre
- **Año:** 2026

---

# Descripción del proyecto

ScreamFactory es una plataforma de gestión interna para una fábrica de monstruos

La aplicación permite:

- Gestión de monstruos empleados
- Creación y seguimiento de misiones energéticas
- Visualización de estadísticas y rankings
- Acceso según rol de usuario

---

# Tecnologías utilizadas

- React
- React Router DOM
- Vite
- JavaScript
- CSS3
- Context API
- JSON como fuente de datos

---

# Entidades del sistema

## Monstruos
Representan los empleados de la fábrica

Información:

- Nombre
- Tipo
- Energía
- Estado

## Misiones
Representan las tareas asignadas a los monstruos

Información:

- Nombre de la misión
- Monstruo asignado
- Energía esperada
- Estado

---

# Roles de usuario

## Roz (Administrador)

Puede:

- Ver todos los monstruos
- Agregar monstruos
- Editar monstruos
- Eliminar monstruos
- Crear misiones
- Eliminar misiones
- Ver todas las misiones
- Ver estadísticas completas

---

## Mike Wazowski (Empleado)

Puede:

- Consultar monstruos
- Ver el detalle de los monstruos
- Ver únicamente las misiones asignadas
- Consultar el dashboard

No puede:

- Crear monstruos
- Editar monstruos
- Eliminar monstruos
- Crear misiones
- Eliminar misiones

---

# Usuarios de prueba

## Administrador

Usuario:

```text
roz
```

Contraseña:

```text
1234
```

---

## Empleado

Usuario:

```text
mike
```

Contraseña:

```text
1234
```

---

# Funcionalidades implementadas

## Autenticación

- Inicio de sesión
- Protección de rutas
- Persistencia de sesión

## Monstruos

- Listado de monstruos
- Alta de monstruos
- Edición de monstruos
- Eliminación de monstruos
- Vista de detalle

## Misiones

- Listado de misiones
- Creación de misiones
- Cambio de estado
- Eliminación de misiones
- Filtrado por rol

## Dashboard

- Métricas generales
- Ranking de energía
- Estadísticas de la fábrica

## Navegación

- Navbar dinámica
- Página Home
- Página 404 

---


# Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd screamfactory
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

# Conceptos aplicados

- Componentes reutilizables
- Hooks (`useState`, `useContext`)
- React Router
- Renderizado condicional
- Formularios controlados
- Context API
- Manejo de estados
- Protección de rutas
- Diseño responsive básico

