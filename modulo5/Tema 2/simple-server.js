import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Servidor funcionando', timestamp: new Date() }));
});

const PORT = 3003;

server.listen(PORT, () => {
    console.log(`Servidor HTTP básico corriendo en puerto ${PORT}`);
});

// Mantener el servidor vivo
process.on('SIGINT', () => {
    console.log('Cerrando servidor...');
    server.close(() => {
        process.exit(0);
    });
});