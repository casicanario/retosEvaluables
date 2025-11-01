import mysql from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    user: 'root', 
    password: 'Loktarcamarada_1',
    database: 'escuela_db',
    port: 3306
};

async function testAllQueries() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        console.log('🔍 PROBANDO LAS 5 CONSULTAS PRINCIPALES\n');
        
        // Consulta 1: Nota media por asignatura
        console.log('1️⃣ Consulta 1: Nota media por asignatura ID=1');
        const query1 = `
            SELECT 
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.semester as semestre,
                sub.credits as creditos,
                ROUND(AVG(m.mark), 2) as nota_media,
                COUNT(m.mark_id) as total_evaluaciones,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima
            FROM subjects sub
            LEFT JOIN marks m ON sub.subject_id = m.subject_id
            WHERE sub.subject_id = ?
            GROUP BY sub.subject_id, sub.title, sub.semester, sub.credits
        `;
        const [result1] = await connection.execute(query1, [1]);
        console.log('✅ Resultado:');
        console.log(JSON.stringify(result1[0], null, 2));
        console.log('\n' + '─'.repeat(50) + '\n');
        
        // Consulta 2: Alumnos por rango de notas
        console.log('2️⃣ Consulta 2: Alumnos con notas entre 7 y 9 del año pasado');
        const query2 = `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                m.mark as nota,
                m.exam_date as fecha_examen,
                sub.title as asignatura,
                sub.semester as semestre,
                YEAR(m.exam_date) as año_examen
            FROM students s
            JOIN marks m ON s.student_id = m.student_id
            JOIN subjects sub ON m.subject_id = sub.subject_id
            WHERE m.mark BETWEEN ? AND ?
              AND YEAR(m.exam_date) = YEAR(CURDATE()) - 1
            ORDER BY m.mark DESC, s.last_name, s.first_name
        `;
        const [result2] = await connection.execute(query2, [7, 9]);
        console.log(`✅ Resultado: ${result2.length} estudiantes encontrados`);
        console.log('Primeros 3 resultados:');
        result2.slice(0, 3).forEach(row => {
            console.log(`- ${row.nombre_completo}: ${row.nota} en ${row.asignatura}`);
        });
        console.log('\n' + '─'.repeat(50) + '\n');
        
        // Consulta 3: Media del último año por asignatura
        console.log('3️⃣ Consulta 3: Media del último año por asignatura ID=1');
        const query3 = `
            SELECT 
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.semester as semestre,
                ROUND(AVG(m.mark), 2) as nota_media_ultimo_ano,
                COUNT(m.mark_id) as evaluaciones_ultimo_ano,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima,
                MIN(m.exam_date) as primera_evaluacion,
                MAX(m.exam_date) as ultima_evaluacion
            FROM subjects sub
            LEFT JOIN marks m ON sub.subject_id = m.subject_id
            WHERE sub.subject_id = ?
              AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            GROUP BY sub.subject_id, sub.title, sub.semester
        `;
        const [result3] = await connection.execute(query3, [1]);
        console.log('✅ Resultado:');
        console.log(JSON.stringify(result3[0], null, 2));
        console.log('\n' + '─'.repeat(50) + '\n');
        
        // Consulta 4: Media del último año por alumno
        console.log('4️⃣ Consulta 4: Media del último año por alumno ID=1');
        const query4 = `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                s.phone,
                s.enrollment_date,
                ROUND(AVG(m.mark), 2) as nota_media_ultimo_ano,
                COUNT(m.mark_id) as evaluaciones_ultimo_ano
            FROM students s
            LEFT JOIN marks m ON s.student_id = m.student_id
            WHERE s.student_id = ?
              AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            GROUP BY s.student_id, s.first_name, s.last_name, s.email, s.phone, s.enrollment_date
        `;
        const [result4] = await connection.execute(query4, [1]);
        console.log('✅ Resultado:');
        console.log(JSON.stringify(result4[0], null, 2));
        console.log('\n' + '─'.repeat(50) + '\n');
        
        // Consulta 5: Total alumnos por asignatura
        console.log('5️⃣ Consulta 5: Total alumnos por asignatura');
        const query5 = `
            SELECT 
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.semester as semestre,
                sub.credits as creditos,
                CONCAT(t.first_name, ' ', t.last_name) as profesor_nombre_apellidos,
                t.department as departamento_profesor,
                t.email as email_profesor,
                COUNT(DISTINCT m.student_id) as total_alumnos,
                COUNT(m.mark_id) as total_evaluaciones,
                ROUND(AVG(m.mark), 2) as nota_media_asignatura,
                MIN(m.exam_date) as primera_evaluacion,
                MAX(m.exam_date) as ultima_evaluacion
            FROM subjects sub
            JOIN subject_teacher st ON sub.subject_id = st.subject_id
            JOIN teachers t ON st.teacher_id = t.teacher_id
            LEFT JOIN marks m ON sub.subject_id = m.subject_id
            WHERE t.active = TRUE
            GROUP BY sub.subject_id, sub.title, sub.semester, sub.credits, 
                     t.teacher_id, t.first_name, t.last_name, t.department, t.email
            ORDER BY total_alumnos DESC, sub.semester, sub.title
            LIMIT 5
        `;
        const [result5] = await connection.execute(query5);
        console.log(`✅ Resultado: Top 5 asignaturas por número de alumnos`);
        result5.forEach((row, index) => {
            console.log(`${index + 1}. ${row.nombre_asignatura} (${row.semestre}) - ${row.total_alumnos} alumnos - Prof: ${row.profesor_nombre_apellidos}`);
        });
        
        await connection.end();
        console.log('\n🎉 ¡Todas las consultas ejecutadas exitosamente!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testAllQueries();