# Chatbot Interactivo con OpenAI GPT-4

## 📋 Descripción

Proyecto Final del Módulo 9 - Chatbot interactivo que utiliza la API de OpenAI (GPT-4) para mantener conversaciones inteligentes desde la terminal de Node.js.

## ✨ Características

- 🤖 **Integración con OpenAI GPT-4**: Utiliza el modelo más avanzado para respuestas inteligentes
- 💬 **Conversación persistente**: Mantiene el historial de la conversación para contexto continuo
- 🎨 **Interfaz con colores**: 
  - Amarillo para mensajes del usuario
  - Verde para respuestas del bot
  - Rojo para errores
  - Cyan para mensajes del sistema
- 🛡️ **Manejo robusto de errores**:
  - Error de cuota excedida (429)
  - Error de API key inválida (401)
  - Error de conexión a internet
  - Errores inesperados
- 🚪 **Salida elegante**: Escribe "adios" para terminar la conversación

## 🛠️ Requisitos Técnicos

- Node.js v18 o superior
- Cuenta de OpenAI con API key activa
- Créditos disponibles en la cuenta de OpenAI

## 📦 Instalación

1. **Clonar el repositorio e instalar dependencias:**
```bash
cd modulo9/ProyectoFinal
npm install
```

2. **Configurar la API key:**
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y añade tu API key de OpenAI
OPENAI_API_KEY=tu-clave-real-aqui
```

## 🚀 Uso

**Ejecutar el chatbot:**
```bash
npm start
```

**Interactuar con el chatbot:**
1. Escribe tu pregunta y presiona Enter
2. El bot pensará y responderá
3. Continúa la conversación
4. Escribe "adios" para salir

## 📝 Ejemplo de Conversación

```
============================================================
        CHATBOT CON ChatGPT - Proyecto Final Módulo 9
============================================================

💬 Chatbot interactivo con OpenAI GPT-4
✨ Escribe tus preguntas y el chatbot responderá
🚪 Escribe "adios" para salir

============================================================

Tú: Hola, ¿cómo estás?
Bot: ¡Hola! Estoy muy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?

Tú: ¿Qué es JavaScript?
Bot: JavaScript es un lenguaje de programación interpretado, de alto nivel y multi-paradigma...

Tú: adios
Bot: ¡Hasta luego! Que tengas un excelente día. 👋
```

## 🔧 Estructura del Proyecto

```
ProyectoFinal/
├── chatbot.js          # Código principal del chatbot
├── package.json        # Configuración y dependencias
├── .env               # Variables de entorno (no incluido en git)
├── .env.example       # Plantilla para .env
├── .gitignore         # Archivos a ignorar en git
└── README.md          # Esta documentación
```

## 📚 Dependencias

- **openai**: ^4.67.3 - Cliente oficial de OpenAI
- **readline**: ^1.3.0 - Manejo de entrada/salida en terminal
- **colors**: ^1.4.0 - Colores en la terminal

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Cumplidos

1. **Uso de Node.js**: ✅ Proyecto configurado con Node.js y dependencias necesarias
2. **Integración OpenAI**: ✅ Utiliza la API oficial de OpenAI con modelo GPT-4
3. **Interfaz de Usuario**: ✅ Implementada con readline para preguntas/respuestas
4. **Estilización**: ✅ Uso de biblioteca colors para diferenciar mensajes
5. **Manejo de Errores**: ✅ Gestión completa de errores de conexión y API
6. **Finalización**: ✅ Permite terminar escribiendo "adios"

### 🔍 Características Adicionales

- Banner de bienvenida llamativo
- Indicador visual "Pensando..." mientras procesa
- Validación de mensaje vacío
- Historial de conversación para contexto
- Manejo de cierre con Ctrl+C
- Sistema prompt personalizado para el bot
- Documentación JSDoc completa

## 🛡️ Manejo de Errores

El chatbot maneja los siguientes errores:

| Error | Código | Mensaje |
|-------|--------|---------|
| Cuota excedida | 429 | "Has excedido tu cuota de la API..." |
| API key inválida | 401 | "API key inválida. Verifica tu clave..." |
| Sin conexión | ENOTFOUND | "No se pudo conectar con la API..." |
| Otros errores | - | Muestra el mensaje de error específico |

## 🎨 Esquema de Colores

| Elemento | Color | Propósito |
|----------|-------|-----------|
| Usuario | Amarillo | Preguntas del usuario |
| Bot | Verde | Respuestas del chatbot |
| Sistema | Cyan | Mensajes informativos |
| Error | Rojo | Mensajes de error |

## ⚙️ Configuración del Modelo

- **Modelo**: gpt-4
- **Temperature**: 0.7 (balance entre creatividad y coherencia)
- **Max tokens**: 500 (respuestas concisas)

## 🔐 Seguridad

- La API key se almacena en `.env` (no se sube a git)
- El archivo `.env` está incluido en `.gitignore`
- Se incluye `.env.example` como plantilla

## 🐛 Solución de Problemas

**Error: "No se encontró la API key"**
- Verifica que existe el archivo `.env`
- Asegúrate de que contiene `OPENAI_API_KEY=tu-clave`

**Error: "Has excedido tu cuota"**
- Verifica tus créditos en https://platform.openai.com/account/billing
- Agrega un método de pago si es necesario

**Error: "No se pudo conectar"**
- Verifica tu conexión a internet
- Comprueba que no hay firewall bloqueando la conexión

## 👨‍💻 Autor

**Estudiante Codenotch**  
Módulo 9 - Introducción a la Ingeniería de Prompts  
Fecha: 16 de noviembre de 2025

## 📄 Licencia

ISC

---

**Nota**: Este proyecto es parte del trabajo académico del Módulo 9 sobre IA y ChatGPT.
