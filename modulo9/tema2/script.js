import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ITERACIÓN 1: Prompt básico inicial
console.log("=== ITERACIÓN 1: Prompt Básico ===\n");

const completion1 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { 
            role: "system", 
            content: "Eres un experto escritor de artículos culturales." 
        },
        { 
            role: "user", 
            content: "Escribe un artículo sobre la evolución del cine desde el cine mudo hasta nuestros días." 
        }
    ]
});

console.log("Respuesta 1:");
console.log(completion1.choices[0].message.content);
console.log("\n" + "=".repeat(80) + "\n");

// ITERACIÓN 2: Prompt mejorado con más estructura
console.log("=== ITERACIÓN 2: Prompt con Estructura ===\n");

const completion2 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { 
            role: "system", 
            content: "Eres un experto historiador de cine con conocimientos profundos sobre la evolución cinematográfica." 
        },
        { 
            role: "user", 
            content: "Escribe un artículo detallado sobre la evolución del cine desde el cine mudo hasta nuestros días. El artículo debe incluir: 1) Introducción al cine mudo, 2) La llegada del sonido, 3) La era dorada de Hollywood, 4) El cine moderno y digital, 5) Conclusión sobre el futuro del cine." 
        }
    ]
});

console.log("Respuesta 2:");
console.log(completion2.choices[0].message.content);
console.log("\n" + "=".repeat(80) + "\n");

// ITERACIÓN 3: Prompt refinado con estilo y longitud específica
console.log("=== ITERACIÓN 3: Prompt Refinado ===\n");

const completion3 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { 
            role: "system", 
            content: "Eres un prestigioso crítico e historiador de cine, especializado en análisis cultural y técnico del séptimo arte." 
        },
        { 
            role: "user", 
            content: `Escribe un artículo académico pero accesible sobre la evolución del cine desde el cine mudo hasta nuestros días.

Requisitos:
- Longitud: aproximadamente 800-1000 palabras
- Estructura clara con subtítulos para cada era
- Incluye ejemplos de películas icónicas de cada época
- Menciona avances técnicos importantes (sonido, color, CGI, etc.)
- Analiza el impacto cultural y social de cada periodo
- Tono profesional pero ameno
- Incluye una conclusión reflexiva sobre el futuro del cine` 
        }
    ],
    temperature: 0.7,
    max_tokens: 1500
});

console.log("Respuesta 3:");
console.log(completion3.choices[0].message.content);
console.log("\n" + "=".repeat(80) + "\n");

// ANÁLISIS COMPARATIVO
console.log("=== ANÁLISIS DEL PROCESO ITERATIVO ===\n");
console.log("ITERACIÓN 1 (Básico):");
console.log("- Prompt simple y directo");
console.log("- Sin estructura definida");
console.log("- Respuesta general pero poco profunda");
console.log("");

console.log("ITERACIÓN 2 (Con Estructura):");
console.log("- Añadida estructura con 5 puntos clave");
console.log("- System prompt más específico (historiador)");
console.log("- Respuesta más organizada y completa");
console.log("");

console.log("ITERACIÓN 3 (Refinado):");
console.log("- Requisitos muy específicos de longitud y formato");
console.log("- Solicitud de ejemplos concretos");
console.log("- Parámetros adicionales (temperature: 0.7, max_tokens: 1500)");
console.log("- Tono académico pero accesible");
console.log("- Resultado: artículo profesional y bien estructurado");
console.log("");

console.log("CONCLUSIÓN:");
console.log("Cada iteración mejoró la calidad añadiendo:");
console.log("✓ Mayor especificidad en las instrucciones");
console.log("✓ Contexto más detallado en el system prompt");
console.log("✓ Requisitos claros de formato y contenido");
console.log("✓ Parámetros de control (temperature, max_tokens)");
console.log("✓ Ejemplos y detalles técnicos solicitados explícitamente");
