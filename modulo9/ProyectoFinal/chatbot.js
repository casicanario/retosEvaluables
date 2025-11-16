/**
 * PROYECTO FINAL MÓDULO 9 - CHATBOT CON ChatGPT
 * 
 * Chatbot interactivo que utiliza la API de OpenAI (GPT-4) para
 * mantener conversaciones inteligentes desde la terminal.
 * 
 * Características:
 * - Integración con OpenAI GPT-4
 * - Interfaz interactiva en terminal con readline
 * - Colores para diferenciar mensajes (usuario amarillo, bot verde, errores rojo)
 * - Manejo de errores de conexión
 * - Conversación persistente con historial
 * - Comando "adios" para finalizar
 */

import OpenAI from 'openai';
import readline from 'readline';
import colors from 'colors';

// Configurar colores
colors.setTheme({
    info: 'cyan',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    user: 'yellow',
    bot: 'green',
    system: 'cyan'
});

// Inicializar cliente de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Configurar readline para entrada/salida en terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Historial de conversación
let conversationHistory = [
    {
        role: "system",
        content: "Eres un asistente útil y amigable que ayuda a los usuarios con sus preguntas. Responde de forma clara, concisa y educada."
    }
];

/**
 * Muestra el banner de bienvenida del chatbot
 */
function mostrarBanner() {
    console.clear();
    console.log('\n' + '='.repeat(60).cyan);
    console.log('        CHATBOT CON ChatGPT - Proyecto Final Módulo 9        '.cyan.bold);
    console.log('='.repeat(60).cyan + '\n');
    console.log('💬 Chatbot interactivo con OpenAI GPT-4'.system);
    console.log('✨ Escribe tus preguntas y el chatbot responderá'.system);
    console.log('🚪 Escribe "adios" para salir\n'.system);
    console.log('='.repeat(60).cyan + '\n');
}

/**
 * Envía un mensaje a la API de OpenAI y obtiene la respuesta
 * @param {string} userMessage - Mensaje del usuario
 * @returns {Promise<string>} - Respuesta del chatbot
 */
async function enviarMensaje(userMessage) {
    try {
        // Agregar mensaje del usuario al historial
        conversationHistory.push({
            role: "user",
            content: userMessage
        });

        // Enviar conversación a OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: conversationHistory,
            temperature: 0.7,
            max_tokens: 500
        });

        // Obtener respuesta del bot
        const botResponse = completion.choices[0].message.content;

        // Agregar respuesta del bot al historial
        conversationHistory.push({
            role: "assistant",
            content: botResponse
        });

        return botResponse;

    } catch (error) {
        // Manejo de errores específicos
        if (error.status === 429) {
            return "❌ Error: Has excedido tu cuota de la API. Por favor verifica tu plan y créditos en OpenAI.";
        } else if (error.status === 401) {
            return "❌ Error: API key inválida. Por favor verifica tu clave de OpenAI.";
        } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
            return "❌ Error de conexión: No se pudo conectar con la API de OpenAI. Verifica tu conexión a internet.";
        } else {
            return `❌ Error inesperado: ${error.message}`;
        }
    }
}

/**
 * Función principal para preguntar al usuario
 */
function preguntarUsuario() {
    rl.question('Tú: '.user, async (input) => {
        const mensaje = input.trim();

        // Verificar si el usuario quiere salir
        if (mensaje.toLowerCase() === 'adios') {
            console.log('\n' + 'Bot: ¡Hasta luego! Que tengas un excelente día. 👋'.bot);
            console.log('\n' + '='.repeat(60).cyan + '\n');
            rl.close();
            return;
        }

        // Validar que el mensaje no esté vacío
        if (mensaje === '') {
            console.log('Bot: Por favor escribe algo para poder ayudarte.'.warning);
            preguntarUsuario();
            return;
        }

        // Mostrar indicador de que está procesando
        process.stdout.write('\nBot: Pensando...'.bot);

        // Enviar mensaje y obtener respuesta
        const respuesta = await enviarMensaje(mensaje);

        // Limpiar línea de "Pensando..."
        process.stdout.write('\r' + ' '.repeat(50) + '\r');

        // Mostrar respuesta del bot
        console.log('Bot: '.bot + respuesta.bot + '\n');

        // Continuar conversación
        preguntarUsuario();
    });
}

/**
 * Función principal que inicia el chatbot
 */
function iniciarChatbot() {
    // Verificar que existe la API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'tu-api-key-aqui') {
        console.error('\n❌ Error: No se encontró la API key de OpenAI.'.error);
        console.error('Por favor configura la variable OPENAI_API_KEY en el archivo .env\n'.error);
        rl.close();
        process.exit(1);
    }

    // Mostrar banner de bienvenida
    mostrarBanner();

    // Iniciar conversación
    preguntarUsuario();
}

// Manejar cierre inesperado (Ctrl+C)
rl.on('close', () => {
    console.log('\n\n👋 Chatbot cerrado. ¡Hasta pronto!'.system);
    process.exit(0);
});

// Iniciar el chatbot
iniciarChatbot();
