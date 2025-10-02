/**
 * 🎯 MÓDULO 5 - TEMA 2: SIMPLE DEMO SERVER
 * =========================================
 * 
 * Versión simplificada de demostración
 */

import express from 'express';

const app = express();
const PORT = 3001;

// Datos simulados simples
const datos = {
  asignaturas: [
    { id: 1, nombre: 'Matemáticas I', curso: '1º' },
    { id: 2, nombre: 'Física II', curso: '2º' }
  ],
  estudiantes: [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, nombre: 'Ana García', email: 'ana@email.com' }
  ],
  notas: [
    { alumno_id: 1, asignatura_id: 1, nota: 8.5, fecha: '2024-05-15' },
    { alumno_id: 2, asignatura_id: 1, nota: 7.2, fecha: '2024-05-15' },
    { alumno_id: 1, asignatura_id: 2, nota: 9.0, fecha: '2024-06-10' }
  ]
};

app.use(express.json());

// Endpoint principal
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎯 API REST - Módulo 5 Tema 2 (DEMO SIMPLE)',
    servidor: 'FUNCIONANDO',
    endpoints: [
      'GET /',
      'GET /status',
      'GET /consultas/nota-media-asignatura/1',
      'GET /datos'
    ]
  });
});

// Estado del servidor
app.get('/status', (req, res) => {
  res.json({
    success: true,
    estado: 'ACTIVO',
    timestamp: new Date().toISOString()
  });
});

// Consulta 1: Nota media por asignatura
app.get('/consultas/nota-media-asignatura/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const asignatura = datos.asignaturas.find(a => a.id === id);
  
  if (!asignatura) {
    return res.status(404).json({
      success: false,
      message: 'Asignatura no encontrada'
    });
  }
  
  const notasAsignatura = datos.notas.filter(n => n.asignatura_id === id);
  const media = notasAsignatura.length > 0 ? 
    notasAsignatura.reduce((sum, n) => sum + n.nota, 0) / notasAsignatura.length : 0;
  
  res.json({
    success: true,
    data: {
      asignatura: asignatura.nombre,
      curso: asignatura.curso,
      nota_media: Math.round(media * 100) / 100,
      total_notas: notasAsignatura.length
    }
  });
});

// Datos completos para verificación
app.get('/datos', (req, res) => {
  res.json({
    success: true,
    datos: datos
  });
});

app.listen(PORT, () => {
  console.log(`\n🎯 SERVIDOR DEMO INICIADO`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Modo: DEMO SIMPLE`);
  console.log(`⚡ Estado: ACTIVO\n`);
});