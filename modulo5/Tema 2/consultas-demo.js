#!/usr/bin/env node
/**
 * 🎯 MÓDULO 5 - TEMA 2: DEMO DE CONSULTAS AVANZADAS
 * ===================================================
 * 
 * Versión de demostración que funciona con datos simulados
 * cuando MySQL no está disponible. Demuestra la estructura
 * y funcionalidad del API REST.
 * 
 * Autor: Estudiante Codenotch
 * Fecha: Diciembre 2024
 */

import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001; // Puerto diferente para demo

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🎨 Configurar colores para logging
colors.setTheme({
  info: 'blue',
  success: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'magenta',
  data: 'cyan'
});

// 📊 DATOS SIMULADOS PARA DEMOSTRACIÓN
const datosSimulados = {
  asignaturas: [
    { subject_id: 1, title: 'Matemáticas I', course: '1º', description: 'Álgebra y Cálculo básico' },
    { subject_id: 2, title: 'Física II', course: '2º', description: 'Mecánica y Termodinámica' },
    { subject_id: 3, title: 'Química Orgánica', course: '3º', description: 'Compuestos orgánicos' },
    { subject_id: 4, title: 'Programación', course: '1º', description: 'Fundamentos de programación' },
    { subject_id: 5, title: 'Base de Datos', course: '2º', description: 'Diseño y administración de BD' }
  ],

  estudiantes: [
    { student_id: 1, first_name: 'Juan', last_name: 'Pérez García', email: 'juan.perez@email.com', enrollment_date: '2023-09-01' },
    { student_id: 2, first_name: 'María', last_name: 'González López', email: 'maria.gonzalez@email.com', enrollment_date: '2023-09-01' },
    { student_id: 3, first_name: 'Ana', last_name: 'García López', email: 'ana.garcia@email.com', enrollment_date: '2024-01-15' },
    { student_id: 4, first_name: 'Carlos', last_name: 'Martínez Ruiz', email: 'carlos.martinez@email.com', enrollment_date: '2023-09-01' },
    { student_id: 5, first_name: 'Laura', last_name: 'Rodríguez Sánchez', email: 'laura.rodriguez@email.com', enrollment_date: '2024-01-15' }
  ],

  profesores: [
    { teacher_id: 1, first_name: 'Dr. Roberto', last_name: 'Jiménez', email: 'roberto.jimenez@universidad.edu', hire_date: '2020-01-15' },
    { teacher_id: 2, first_name: 'Dra. Carmen', last_name: 'Velasco', email: 'carmen.velasco@universidad.edu', hire_date: '2019-08-20' },
    { teacher_id: 3, first_name: 'Prof. Miguel', last_name: 'Torres', email: 'miguel.torres@universidad.edu', hire_date: '2021-02-10' }
  ],

  notas: [
    // Matemáticas I (subject_id: 1)
    { mark_id: 1, student_id: 1, subject_id: 1, mark: 7.5, date: '2024-05-15' },
    { mark_id: 2, student_id: 2, subject_id: 1, mark: 8.2, date: '2024-05-15' },
    { mark_id: 3, student_id: 3, subject_id: 1, mark: 6.8, date: '2024-05-15' },
    { mark_id: 4, student_id: 4, subject_id: 1, mark: 9.1, date: '2024-05-15' },
    { mark_id: 5, student_id: 5, subject_id: 1, mark: 5.7, date: '2024-05-15' },
    
    // Física II (subject_id: 2)
    { mark_id: 6, student_id: 1, subject_id: 2, mark: 6.9, date: '2024-06-20' },
    { mark_id: 7, student_id: 2, subject_id: 2, mark: 7.8, date: '2024-06-20' },
    { mark_id: 8, student_id: 3, subject_id: 2, mark: 8.5, date: '2024-06-20' },
    
    // Programación (subject_id: 4)  
    { mark_id: 9, student_id: 1, subject_id: 4, mark: 9.2, date: '2024-04-10' },
    { mark_id: 10, student_id: 2, subject_id: 4, mark: 8.7, date: '2024-04-10' },
    { mark_id: 11, student_id: 4, subject_id: 4, mark: 7.3, date: '2024-04-10' },
    { mark_id: 12, student_id: 5, subject_id: 4, mark: 8.9, date: '2024-04-10' },

    // Base de Datos (subject_id: 5)
    { mark_id: 13, student_id: 2, subject_id: 5, mark: 7.6, date: '2024-07-08' },
    { mark_id: 14, student_id: 3, subject_id: 5, mark: 8.1, date: '2024-07-08' },
    { mark_id: 15, student_id: 4, subject_id: 5, mark: 6.5, date: '2024-07-08' }
  ],

  // Relaciones asignatura-profesor
  asignaturasProfesor: [
    { subject_id: 1, teacher_id: 1 }, // Matemáticas I - Dr. Roberto
    { subject_id: 2, teacher_id: 2 }, // Física II - Dra. Carmen  
    { subject_id: 3, teacher_id: 2 }, // Química - Dra. Carmen
    { subject_id: 4, teacher_id: 3 }, // Programación - Prof. Miguel
    { subject_id: 5, teacher_id: 3 }  // Base de Datos - Prof. Miguel
  ]
};

// 🛠️ FUNCIONES AUXILIARES

/**
 * Obtener año actual para filtros
 */
const getAñoActual = () => new Date().getFullYear();

/**
 * Filtrar notas del último año
 */
const filtrarNotasUltimoAño = () => {
  const añoActual = getAñoActual();
  return datosSimulados.notas.filter(nota => {
    const fechaNota = new Date(nota.date);
    return fechaNota.getFullYear() === añoActual;
  });
};

/**
 * Función para simular tiempo de ejecución
 */
const simularTiempoEjecucion = () => Math.floor(Math.random() * 50) + 10;

/**
 * Middleware de logging
 */
const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method.info} ${req.url.data}`);
  next();
};

app.use(logRequest);

// 🏠 RUTAS PRINCIPALES

/**
 * 📋 Información general del API
 */
app.get('/', (req, res) => {
  console.log('🏠 Acceso a información general'.info);
  
  res.json({
    success: true,
    message: '🎯 API REST - Módulo 5 Tema 2 (MODO DEMO)',
    version: '1.0.0',
    descripcion: 'Consultas avanzadas con datos simulados',
    autor: 'Estudiante Codenotch',
    endpoints: {
      informacion: {
        'GET /': 'Información general del API',
        'GET /status': 'Estado del servidor',
        'GET /db-info': 'Información de la base de datos (simulada)'
      },
      consultas: {
        'GET /consultas/nota-media-asignatura/:id': 'Nota media por asignatura',
        'GET /consultas/alumnos-rango-notas/:min/:max': 'Alumnos por rango de notas',
        'GET /consultas/media-ultimo-ano/:id': 'Media último año por asignatura',
        'GET /consultas/media-alumno-ultimo-ano/:id': 'Media último año por alumno',
        'GET /consultas/total-alumnos-asignatura': 'Total alumnos por asignatura'
      },
      utilidades: {
        'GET /asignaturas': 'Lista de asignaturas',
        'GET /estudiantes': 'Lista de estudiantes', 
        'GET /profesores': 'Lista de profesores'
      }
    },
    nota: '⚠️ MODO DEMO: Usando datos simulados (MySQL no disponible)',
    documentacion: 'Ver README.md para instrucciones completas'
  });
});

/**
 * ⚡ Estado del servidor
 */
app.get('/status', (req, res) => {
  console.log('⚡ Verificando estado del servidor'.success);
  
  const uptime = process.uptime();
  const memoria = process.memoryUsage();
  
  res.json({
    success: true,
    message: '✅ Servidor funcionando correctamente',
    estado: 'ACTIVO',
    modo: 'DEMO (Datos simulados)',
    uptime: {
      segundos: Math.floor(uptime),
      formatteado: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`
    },
    memoria: {
      usado: `${Math.round(memoria.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(memoria.heapTotal / 1024 / 1024)}MB`
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * 🗄️ Información de base de datos (simulada)
 */
app.get('/db-info', (req, res) => {
  console.log('🗄️ Consultando información de BD (simulada)'.data);
  
  res.json({
    success: true,
    message: '📊 Información de base de datos (SIMULADA)',
    database: {
      host: 'localhost (simulado)',
      name: 'escuela_db (simulado)',
      estado: 'SIMULADO - Datos en memoria',
      version: 'Demo v1.0'
    },
    estadisticas: {
      total_asignaturas: datosSimulados.asignaturas.length,
      total_estudiantes: datosSimulados.estudiantes.length,
      total_profesores: datosSimulados.profesores.length,
      total_notas: datosSimulados.notas.length,
      total_relaciones: datosSimulados.asignaturasProfesor.length
    },
    nota: '⚠️ Para usar MySQL real, configurar credenciales en .env y usar consultas.js'
  });
});

// 🎯 CONSULTAS PRINCIPALES

/**
 * 📊 CONSULTA 1: Calcular nota media de los alumnos de la asignatura
 */
app.get('/consultas/nota-media-asignatura/:id', (req, res) => {
  try {
    const subjectId = parseInt(req.params.id);
    console.log(`📊 Calculando nota media para asignatura ID: ${subjectId}`.info);
    
    // Validar parámetro
    if (isNaN(subjectId) || subjectId <= 0) {
      return res.status(400).json({
        success: false,
        message: '❌ ID de asignatura inválido',
        error: 'El ID debe ser un número entero positivo'
      });
    }
    
    // Buscar asignatura
    const asignatura = datosSimulados.asignaturas.find(a => a.subject_id === subjectId);
    if (!asignatura) {
      return res.status(404).json({
        success: false,
        message: `❌ Asignatura con ID ${subjectId} no encontrada`,
        error: 'La asignatura especificada no existe en el sistema'
      });
    }
    
    // Obtener notas de la asignatura
    const notasAsignatura = datosSimulados.notas.filter(n => n.subject_id === subjectId);
    
    if (notasAsignatura.length === 0) {
      return res.json({
        success: true,
        message: `📊 Asignatura "${asignatura.title}" sin calificaciones`,
        data: {
          subject_id: subjectId,
          asignatura: asignatura.title,
          curso: asignatura.course,
          total_notas: 0,
          nota_media: null,
          nota_minima: null,
          nota_maxima: null,
          estudiantes_evaluados: 0
        },
        executionTime: simularTiempoEjecucion()
      });
    }
    
    // Calcular estadísticas
    const notas = notasAsignatura.map(n => n.mark);
    const notaMedia = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
    const notaMinima = Math.min(...notas);
    const notaMaxima = Math.max(...notas);
    const estudiantesEvaluados = new Set(notasAsignatura.map(n => n.student_id)).size;
    
    console.log(`✅ Nota media calculada: ${notaMedia.toFixed(2)}`.success);
    
    res.json({
      success: true,
      message: `📊 Nota media de la asignatura "${asignatura.title}"`,
      data: {
        subject_id: subjectId,
        asignatura: asignatura.title,
        curso: asignatura.course,
        descripcion: asignatura.description,
        total_notas: notasAsignatura.length,
        nota_media: Math.round(notaMedia * 100) / 100,
        nota_minima: notaMinima,
        nota_maxima: notaMaxima,
        estudiantes_evaluados: estudiantesEvaluados
      },
      executionTime: simularTiempoEjecucion()
    });
    
  } catch (error) {
    console.error('❌ Error en consulta nota media:'.error, error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * 🎯 CONSULTA 2: Obtener alumnos con nota entre rango y fecha del año actual
 */
app.get('/consultas/alumnos-rango-notas/:min/:max', (req, res) => {
  try {
    const notaMin = parseFloat(req.params.min);
    const notaMax = parseFloat(req.params.max);
    
    console.log(`🎯 Buscando alumnos con notas entre ${notaMin} y ${notaMax}`.info);
    
    // Validar parámetros
    if (isNaN(notaMin) || isNaN(notaMax)) {
      return res.status(400).json({
        success: false,
        message: '❌ Parámetros de nota inválidos',
        error: 'Las notas mínima y máxima deben ser números válidos'
      });
    }
    
    if (notaMin > notaMax) {
      return res.status(400).json({
        success: false,
        message: '❌ Rango de notas inválido',
        error: 'La nota mínima no puede ser mayor que la máxima'
      });
    }
    
    // Filtrar notas del año actual
    const notasAñoActual = filtrarNotasUltimoAño();
    
    // Filtrar por rango de notas
    const notasEnRango = notasAñoActual.filter(nota => 
      nota.mark >= notaMin && nota.mark <= notaMax
    );
    
    // Combinar con datos de estudiantes y asignaturas
    const resultados = notasEnRango.map(nota => {
      const estudiante = datosSimulados.estudiantes.find(e => e.student_id === nota.student_id);
      const asignatura = datosSimulados.asignaturas.find(a => a.subject_id === nota.subject_id);
      
      return {
        student_id: nota.student_id,
        nombre_completo: `${estudiante?.first_name} ${estudiante?.last_name}`,
        email: estudiante?.email,
        nota: nota.mark,
        fecha_examen: nota.date,
        asignatura: asignatura?.title,
        curso: asignatura?.course
      };
    });
    
    console.log(`✅ Encontrados ${resultados.length} registros`.success);
    
    res.json({
      success: true,
      message: `🎯 Alumnos con notas entre ${notaMin} y ${notaMax} del año ${getAñoActual()}`,
      data: resultados,
      totalRegistros: resultados.length,
      filtros: {
        notaMinima: notaMin,
        notaMaxima: notaMax,
        año: getAñoActual()
      },
      executionTime: simularTiempoEjecucion()
    });
    
  } catch (error) {
    console.error('❌ Error en consulta rango notas:'.error, error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * 📈 CONSULTA 3: Media de notas del último año por asignatura
 */
app.get('/consultas/media-ultimo-ano/:id', (req, res) => {
  try {
    const subjectId = parseInt(req.params.id);
    console.log(`📈 Calculando media último año para asignatura ID: ${subjectId}`.info);
    
    // Validar parámetro
    if (isNaN(subjectId) || subjectId <= 0) {
      return res.status(400).json({
        success: false,
        message: '❌ ID de asignatura inválido',
        error: 'El ID debe ser un número entero positivo'
      });
    }
    
    // Buscar asignatura
    const asignatura = datosSimulados.asignaturas.find(a => a.subject_id === subjectId);
    if (!asignatura) {
      return res.status(404).json({
        success: false,
        message: `❌ Asignatura con ID ${subjectId} no encontrada`
      });
    }
    
    // Filtrar notas del último año para la asignatura específica
    const notasUltimoAño = filtrarNotasUltimoAño().filter(n => n.subject_id === subjectId);
    
    if (notasUltimoAño.length === 0) {
      return res.json({
        success: true,
        message: `📈 Sin calificaciones del año ${getAñoActual()} para "${asignatura.title}"`,
        data: {
          subject_id: subjectId,
          asignatura: asignatura.title,
          curso: asignatura.course,
          año: getAñoActual(),
          media_año: null,
          total_examenes: 0,
          estudiantes_evaluados: 0
        },
        executionTime: simularTiempoEjecucion()
      });
    }
    
    // Calcular media
    const notas = notasUltimoAño.map(n => n.mark);
    const media = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
    const estudiantesEvaluados = new Set(notasUltimoAño.map(n => n.student_id)).size;
    
    console.log(`✅ Media del año ${getAñoActual()}: ${media.toFixed(2)}`.success);
    
    res.json({
      success: true,
      message: `📈 Media de notas del año ${getAñoActual()} para "${asignatura.title}"`,
      data: {
        subject_id: subjectId,
        asignatura: asignatura.title,
        curso: asignatura.course,
        año: getAñoActual(),
        media_año: Math.round(media * 100) / 100,
        total_examenes: notasUltimoAño.length,
        estudiantes_evaluados: estudiantesEvaluados,
        nota_minima: Math.min(...notas),
        nota_maxima: Math.max(...notas)
      },
      executionTime: simularTiempoEjecucion()
    });
    
  } catch (error) {
    console.error('❌ Error en consulta media último año:'.error, error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * 👨‍🎓 CONSULTA 4: Media aritmética de notas del último año por alumno
 */
app.get('/consultas/media-alumno-ultimo-ano/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    console.log(`👨‍🎓 Calculando media último año para estudiante ID: ${studentId}`.info);
    
    // Validar parámetro
    if (isNaN(studentId) || studentId <= 0) {
      return res.status(400).json({
        success: false,
        message: '❌ ID de estudiante inválido',
        error: 'El ID debe ser un número entero positivo'
      });
    }
    
    // Buscar estudiante
    const estudiante = datosSimulados.estudiantes.find(e => e.student_id === studentId);
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: `❌ Estudiante con ID ${studentId} no encontrado`
      });
    }
    
    // Filtrar notas del último año para el estudiante específico
    const notasEstudianteUltimoAño = filtrarNotasUltimoAño().filter(n => n.student_id === studentId);
    
    if (notasEstudianteUltimoAño.length === 0) {
      return res.json({
        success: true,
        message: `👨‍🎓 Sin calificaciones del año ${getAñoActual()} para ${estudiante.first_name} ${estudiante.last_name}`,
        data: {
          student_id: studentId,
          nombre_completo: `${estudiante.first_name} ${estudiante.last_name}`,
          email: estudiante.email,
          año: getAñoActual(),
          media_año: null,
          total_examenes: 0,
          asignaturas_cursadas: 0
        },
        executionTime: simularTiempoEjecucion()
      });
    }
    
    // Calcular media y estadísticas
    const notas = notasEstudianteUltimoAño.map(n => n.mark);
    const media = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
    const asignaturasCursadas = new Set(notasEstudianteUltimoAño.map(n => n.subject_id)).size;
    
    // Desglose por asignatura
    const desglosePorAsignatura = notasEstudianteUltimoAño.map(nota => {
      const asignatura = datosSimulados.asignaturas.find(a => a.subject_id === nota.subject_id);
      return {
        asignatura: asignatura?.title,
        curso: asignatura?.course,
        nota: nota.mark,
        fecha: nota.date
      };
    });
    
    console.log(`✅ Media del estudiante en ${getAñoActual()}: ${media.toFixed(2)}`.success);
    
    res.json({
      success: true,
      message: `👨‍🎓 Media aritmética del año ${getAñoActual()} para ${estudiante.first_name} ${estudiante.last_name}`,
      data: {
        student_id: studentId,
        nombre_completo: `${estudiante.first_name} ${estudiante.last_name}`,
        email: estudiante.email,
        fecha_matricula: estudiante.enrollment_date,
        año: getAñoActual(),
        media_año: Math.round(media * 100) / 100,
        total_examenes: notasEstudianteUltimoAño.length,
        asignaturas_cursadas: asignaturasCursadas,
        nota_minima: Math.min(...notas),
        nota_maxima: Math.max(...notas),
        desglose: desglosePorAsignatura
      },
      executionTime: simularTiempoEjecucion()
    });
    
  } catch (error) {
    console.error('❌ Error en consulta media alumno:'.error, error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * 👨‍🏫 CONSULTA 5: Total alumnos por asignatura con nombre de profesor
 */
app.get('/consultas/total-alumnos-asignatura', (req, res) => {
  try {
    console.log('👨‍🏫 Calculando total alumnos por asignatura con profesores'.info);
    
    // Procesar cada asignatura
    const resultados = datosSimulados.asignaturas.map(asignatura => {
      // Encontrar profesor de la asignatura
      const relacionProfesor = datosSimulados.asignaturasProfesor.find(
        rel => rel.subject_id === asignatura.subject_id
      );
      const profesor = relacionProfesor ? 
        datosSimulados.profesores.find(p => p.teacher_id === relacionProfesor.teacher_id) : null;
      
      // Contar estudiantes únicos con notas en esta asignatura
      const estudiantesConNotas = datosSimulados.notas
        .filter(nota => nota.subject_id === asignatura.subject_id)
        .map(nota => nota.student_id);
      
      const totalAlumnos = new Set(estudiantesConNotas).size;
      
      // Calcular estadísticas adicionales
      const notasAsignatura = datosSimulados.notas.filter(n => n.subject_id === asignatura.subject_id);
      const totalExamenes = notasAsignatura.length;
      const notaMedia = totalExamenes > 0 ? 
        Math.round((notasAsignatura.reduce((sum, nota) => sum + nota.mark, 0) / totalExamenes) * 100) / 100 : null;
      
      return {
        subject_id: asignatura.subject_id,
        asignatura: asignatura.title,
        curso: asignatura.course,
        descripcion: asignatura.description,
        total_alumnos: totalAlumnos,
        total_examenes: totalExamenes,
        nota_media_general: notaMedia,
        profesor: profesor ? {
          teacher_id: profesor.teacher_id,
          nombre_completo: `${profesor.first_name} ${profesor.last_name}`,
          email: profesor.email,
          fecha_contratacion: profesor.hire_date
        } : {
          teacher_id: null,
          nombre_completo: 'Sin asignar',
          email: null,
          fecha_contratacion: null
        }
      };
    });
    
    // Ordenar por número de alumnos descendente
    resultados.sort((a, b) => b.total_alumnos - a.total_alumnos);
    
    // Calcular estadísticas generales
    const totalAsignaturas = resultados.length;
    const totalAlumnosUnicos = new Set(datosSimulados.notas.map(n => n.student_id)).size;
    const asignaturasConAlumnos = resultados.filter(r => r.total_alumnos > 0).length;
    
    console.log(`✅ Procesadas ${totalAsignaturas} asignaturas`.success);
    
    res.json({
      success: true,
      message: '👨‍🏫 Total de alumnos por asignatura con información del profesor',
      data: resultados,
      estadisticas: {
        total_asignaturas: totalAsignaturas,
        asignaturas_con_alumnos: asignaturasConAlumnos,
        total_alumnos_sistema: totalAlumnosUnicos,
        promedio_alumnos_por_asignatura: Math.round((totalAlumnosUnicos / totalAsignaturas) * 100) / 100
      },
      executionTime: simularTiempoEjecucion()
    });
    
  } catch (error) {
    console.error('❌ Error en consulta total alumnos:'.error, error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error.message
    });
  }
});

// 🛠️ ENDPOINTS DE UTILIDAD

/**
 * 📚 Lista de asignaturas
 */
app.get('/asignaturas', (req, res) => {
  console.log('📚 Consultando lista de asignaturas'.data);
  
  res.json({
    success: true,
    message: '📚 Lista completa de asignaturas',
    data: datosSimulados.asignaturas,
    total: datosSimulados.asignaturas.length
  });
});

/**
 * 👨‍🎓 Lista de estudiantes
 */
app.get('/estudiantes', (req, res) => {
  console.log('👨‍🎓 Consultando lista de estudiantes'.data);
  
  res.json({
    success: true,
    message: '👨‍🎓 Lista completa de estudiantes',
    data: datosSimulados.estudiantes,
    total: datosSimulados.estudiantes.length
  });
});

/**
 * 👨‍🏫 Lista de profesores
 */
app.get('/profesores', (req, res) => {
  console.log('👨‍🏫 Consultando lista de profesores'.data);
  
  res.json({
    success: true,
    message: '👨‍🏫 Lista completa de profesores',
    data: datosSimulados.profesores,
    total: datosSimulados.profesores.length
  });
});

// 🚫 MANEJO DE ERRORES

/**
 * Middleware para rutas no encontradas
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Endpoint no encontrado',
    error: `La ruta ${req.method} ${req.originalUrl} no existe`,
    endpoints_disponibles: [
      'GET /',
      'GET /status',
      'GET /db-info',
      'GET /consultas/nota-media-asignatura/:id',
      'GET /consultas/alumnos-rango-notas/:min/:max',
      'GET /consultas/media-ultimo-ano/:id',
      'GET /consultas/media-alumno-ultimo-ano/:id',
      'GET /consultas/total-alumnos-asignatura',
      'GET /asignaturas',
      'GET /estudiantes',
      'GET /profesores'
    ]
  });
});

/**
 * Middleware de manejo de errores globales
 */
app.use((error, req, res, next) => {
  console.error('💥 Error no manejado:'.error, error);
  
  res.status(500).json({
    success: false,
    message: '❌ Error interno del servidor',
    error: error.message,
    timestamp: new Date().toISOString()
  });
});

// 🚀 INICIAR SERVIDOR

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60).rainbow);
  console.log('🎯 SERVIDOR EXPRESS INICIADO (MODO DEMO)'.success.bold);
  console.log('='.repeat(60).rainbow);
  console.log(`🌐 URL: ${'http://localhost:' + PORT}`.data.underline);
  console.log(`📊 Modo: ${'DEMO - Datos simulados'}`.warn);
  console.log(`⚡ Estado: ${'ACTIVO'}`.success);
  console.log(`📅 Fecha: ${new Date().toLocaleString()}`.info);
  console.log('='.repeat(60).rainbow);
  console.log('\n📋 ENDPOINTS PRINCIPALES:'.info.bold);
  console.log(`   🏠 GET /`.data + ' - Información general');
  console.log(`   ⚡ GET /status`.data + ' - Estado del servidor');
  console.log(`   📊 GET /consultas/nota-media-asignatura/1`.data);
  console.log(`   🎯 GET /consultas/alumnos-rango-notas/7/9`.data);
  console.log(`   📈 GET /consultas/media-ultimo-ano/1`.data);
  console.log(`   👨‍🎓 GET /consultas/media-alumno-ultimo-ano/1`.data);
  console.log(`   👨‍🏫 GET /consultas/total-alumnos-asignatura`.data);
  console.log('\n💡 TIP:'.warn.bold + ' Para usar MySQL real, configurar .env y usar consultas.js');
  console.log('📖 Documentación completa en README.md'.info);
  console.log('='.repeat(60).rainbow + '\n');
});