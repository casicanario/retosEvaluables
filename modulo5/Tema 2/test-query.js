import mysql from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    user: 'root', 
    password: 'Loktarcamarada_1',
    database: 'escuela_db',
    port: 3306
};

async function testQuery() {
    try {
        console.log('🔍 Probando consulta 1: Nota media por asignatura');
        
        const connection = await mysql.createConnection(dbConfig);
        
        const query = `
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
        
        const [rows] = await connection.execute(query, [1]);
        
        console.log('✅ Resultado de la consulta:');
        console.log(JSON.stringify(rows[0], null, 2));
        
        await connection.end();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testQuery();