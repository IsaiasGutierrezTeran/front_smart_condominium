# 🏢 Smart Condominium - Sistema de Gestión Profesional

Sistema web profesional para la administración integral de condominios y conjuntos residenciales.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Prerequisitos](#prerequisitos)
- [Descarga e Instalación](#descarga-e-instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Solución de Problemas](#solución-de-problemas)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## 📖 Descripción

Smart Condominium es una aplicación web moderna desarrollada con React y TypeScript que permite la gestión integral de condominios. Incluye módulos para finanzas, comunicación, reservas, seguridad, mantenimiento, visitantes y más.

## ✨ Características

- 💰 **Gestión Financiera**: Control de pagos, cuotas e informes financieros
- 💬 **Comunicación**: Sistema de mensajería y anuncios
- 📅 **Reservas**: Gestión de áreas comunes y espacios recreativos
- 🛡️ **Seguridad**: Control de acceso y monitoreo
- 🔧 **Mantenimiento**: Solicitudes de servicio y proveedores
- 👥 **Visitantes**: Registro y control de visitantes y paquetería
- 🏠 **Residentes**: Directorio y gestión de unidades
- 🎮 **Amenidades**: Instalaciones y áreas recreativas
- 📄 **Documentos**: Archivos importantes y contratos
- 🔔 **Notificaciones**: Centro de notificaciones

## 🔧 Prerequisitos

Antes de descargar e instalar el proyecto, asegúrate de tener instalado:

### Software Requerido:
- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js) o **pnpm**
- **Git** (para clonar el repositorio)

### Verificar Instalación:
```bash
node --version    # Debe mostrar v18.0.0 o superior
npm --version     # Debe mostrar 8.0.0 o superior
git --version     # Debe mostrar la versión de Git
```

## 📥 Descarga e Instalación

### Opción 1: Clonar con Git (Recomendado)

1. **Abrir terminal o línea de comandos**

2. **Navegar al directorio donde quieres descargar el proyecto:**
   ```bash
   cd Desktop
   # o la carpeta que prefieras
   ```

3. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/IsaiasGutierrezTeran/front_smart_condominium.git
   ```

4. **Entrar al directorio del proyecto:**
   ```bash
   cd front_smart_condominium
   ```

### Opción 2: Descargar ZIP

1. **Ir al repositorio en GitHub:**
   ```
   https://github.com/IsaiasGutierrezTeran/front_smart_condominium
   ```

2. **Hacer clic en el botón verde "Code"**

3. **Seleccionar "Download ZIP"**

4. **Descomprimir el archivo en la ubicación deseada**

5. **Abrir terminal en la carpeta descomprimida**

## ⚙️ Configuración

### 1. Instalar Dependencias

Una vez descargado el proyecto, instala las dependencias:

```bash
# Opción A: Con npm
npm install --legacy-peer-deps

# Opción B: Con pnpm (alternativa más rápida)
pnpm install
```

> **Nota:** Se usa `--legacy-peer-deps` para resolver conflictos de dependencias con React 19.

### 2. Variables de Entorno (Opcional)

Crea un archivo `.env.local` en la raíz del proyecto para configuraciones personalizadas:

```bash
# .env.local
VITE_APP_TITLE="Smart Condominium"
VITE_API_URL="http://localhost:3001"
```

## 🚀 Uso

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
# Con npm
npm run dev

# Con pnpm
pnpm dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Modo Producción

Para construir la aplicación para producción:

```bash
# Construir
npm run build

# Servir (opcional, para previsualizar)
npm run preview
```

### Acceso a la Aplicación

1. **Abrir navegador** en `http://localhost:5173`
2. **Página de Login**: Usar credenciales de prueba
3. **Dashboard**: Navegar por los diferentes módulos

## 📁 Estructura del Proyecto

```
front_smart_condominium/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/           # Componentes de interfaz
│   │   └── layouts/      # Layouts de la aplicación
│   ├── features/         # Módulos funcionales
│   │   ├── auth/         # Autenticación
│   │   ├── finances/     # Gestión financiera
│   │   ├── communication/# Comunicación
│   │   ├── reservations/ # Reservas
│   │   ├── security/     # Seguridad
│   │   ├── maintenance/  # Mantenimiento
│   │   ├── visitors/     # Visitantes
│   │   └── ...          # Otros módulos
│   ├── pages/            # Páginas principales
│   ├── lib/              # Utilidades
│   ├── hooks/            # Hooks personalizados
│   ├── store/            # Estado global
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── package.json          # Dependencias y scripts
├── vite.config.ts        # Configuración de Vite
├── tailwind.config.ts    # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción

# Calidad de código
npm run lint         # Linter de código
npm run type-check   # Verificar tipos TypeScript
```

## 🔧 Solución de Problemas

### Problemas Comunes

#### 1. Error de dependencias
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 2. Puerto en uso
```bash
# Cambiar puerto en vite.config.ts o usar otro puerto
npm run dev -- --port 3000
```

#### 3. Errores de TypeScript
```bash
# Verificar tipos
npm run type-check
```

#### 4. Problemas con Git
```bash
# Verificar estado del repositorio
git status
git pull origin main
```

### Obtener Ayuda

Si encuentras problemas:

1. **Verificar prerequisitos** instalados correctamente
2. **Revisar logs** en la terminal para errores específicos
3. **Crear issue** en el repositorio de GitHub
4. **Contactar** al desarrollador

## 🛠️ Tecnologías Utilizadas

- **Framework**: React 19
- **Lenguaje**: TypeScript
- **Bundler**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: Radix UI
- **Iconos**: Lucide React
- **Routing**: React Router DOM
- **Estado**: Zustand
- **Formularios**: React Hook Form
- **Validación**: Zod
- **Construcción**: Next.js (compatibilidad)

## 📝 Notas Adicionales

- El proyecto está en desarrollo activo
- Algunas funciones pueden estar en construcción
- Se recomienda usar la versión más reciente de Node.js
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

---

## 📞 Contacto

Para preguntas o soporte:
- **GitHub**: [IsaiasGutierrezTeran](https://github.com/IsaiasGutierrezTeran)
- **Repository**: [front_smart_condominium](https://github.com/IsaiasGutierrezTeran/front_smart_condominium)

---

*Desarrollado con ❤️ para la gestión eficiente de condominios*