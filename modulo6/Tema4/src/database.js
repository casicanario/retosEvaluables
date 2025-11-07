const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);

if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI no está definida en las variables de entorno');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((db) => {
    console.log('Database connected on ' + db.connection.host);
})
.catch((error) => {
    console.error('Database connection error:', error);
});