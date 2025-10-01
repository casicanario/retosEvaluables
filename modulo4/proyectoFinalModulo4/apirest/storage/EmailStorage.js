/**
 * 📚 EMAIL STORAGE - ALMACENAMIENTO DE EMAILS
 * ========================================
 * Sistema de almacenamiento en memoria para emails enviados
 * Estructura de datos como se especifica en el reto
 */

class EmailStorage {
    constructor() {
        /**
         * 📧 Array de emails almacenados
         * Estructura según especificación del reto:
         * emails = [
         *   {
         *     id: string,
         *     from: string,
         *     to: string,
         *     subject: string,
         *     message: string,
         *     timestamp: string,
         *     status: string,
         *     postmarkId?: string,
         *     error?: string
         *   }
         * ]
         */
        this.emails = [];
        
        console.log('📚 EmailStorage inicializado');
        this.initializeWithSampleData();
    }
    
    /**
     * 🎯 Inicializar con datos de ejemplo
     */
    initializeWithSampleData() {
        const sampleEmails = [
            {
                id: 'sample-1',
                from: 'admin@codenotch.com',
                to: 'student@example.com',
                subject: 'Bienvenido a Email API REST',
                message: 'Este es un email de bienvenida para probar la funcionalidad de la API.\n\n¡Gracias por usar nuestro servicio!',
                timestamp: new Date('2025-01-01T10:00:00Z').toISOString(),
                status: 'sent',
                postmarkId: 'sample-postmark-id-1'
            },
            {
                id: 'sample-2',
                from: 'noreply@codenotch.com',
                to: 'test@example.com',
                subject: 'Confirmación de registro',
                message: 'Tu registro ha sido confirmado exitosamente.\n\nPuedes comenzar a usar todos nuestros servicios.',
                timestamp: new Date('2025-01-01T11:30:00Z').toISOString(),
                status: 'sent',
                postmarkId: 'sample-postmark-id-2'
            },
            {
                id: 'sample-3',
                from: 'info@codenotch.com',
                to: 'support@example.com',
                subject: 'Nuevo mensaje de contacto',
                message: 'Has recibido un nuevo mensaje a través del formulario de contacto.\n\nPor favor, revisa la bandeja de entrada.',
                timestamp: new Date('2025-01-01T14:15:00Z').toISOString(),
                status: 'sent',
                postmarkId: 'sample-postmark-id-3'
            }
        ];
        
        this.emails = [...sampleEmails];
        console.log(`📧 ${this.emails.length} emails de ejemplo cargados`);
    }
    
    /**
     * ➕ Agregar un nuevo email al almacenamiento
     * @param {Object} emailData - Datos del email
     * @returns {Object} - Email agregado
     */
    addEmail(emailData) {
        // Validar estructura del email
        if (!this.isValidEmailStructure(emailData)) {
            throw new Error('Estructura de email inválida');
        }
        
        // Crear copia del email con timestamp si no existe
        const email = {
            ...emailData,
            timestamp: emailData.timestamp || new Date().toISOString()
        };
        
        // Agregar al array
        this.emails.push(email);
        
        console.log(`📧 Email agregado al storage: ${email.id} (${email.from} → ${email.to})`);
        
        return email;
    }
    
    /**
     * 🔍 Obtener emails enviados DESDE una dirección específica
     * @param {string} fromEmail - Dirección de email remitente
     * @returns {Array} - Array de emails
     */
    getEmailsFrom(fromEmail) {
        const normalizedFrom = fromEmail.toLowerCase().trim();
        const emails = this.emails.filter(email => 
            email.from.toLowerCase() === normalizedFrom
        );
        
        console.log(`🔍 Emails encontrados desde "${fromEmail}": ${emails.length}`);
        
        // Ordenar por timestamp descendente (más recientes primero)
        return emails.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    /**
     * 🔍 Obtener emails enviados HACIA una dirección específica
     * @param {string} toEmail - Dirección de email destinatario
     * @returns {Array} - Array de emails
     */
    getEmailsTo(toEmail) {
        const normalizedTo = toEmail.toLowerCase().trim();
        const emails = this.emails.filter(email => 
            email.to.toLowerCase() === normalizedTo
        );
        
        console.log(`🔍 Emails encontrados hacia "${toEmail}": ${emails.length}`);
        
        // Ordenar por timestamp descendente (más recientes primero)
        return emails.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    /**
     * 📧 Obtener un email por ID
     * @param {string} emailId - ID del email
     * @returns {Object|null} - Email encontrado o null
     */
    getEmailById(emailId) {
        const email = this.emails.find(email => email.id === emailId);
        
        if (email) {
            console.log(`📧 Email encontrado: ${emailId}`);
        } else {
            console.log(`❌ Email no encontrado: ${emailId}`);
        }
        
        return email || null;
    }
    
    /**
     * 📊 Obtener todos los emails (para administración)
     * @param {number} limit - Límite de emails a retornar
     * @param {number} offset - Offset para paginación
     * @returns {Array} - Array de emails
     */
    getAllEmails(limit = 50, offset = 0) {
        const sortedEmails = this.emails.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        const paginatedEmails = sortedEmails.slice(offset, offset + limit);
        
        console.log(`📊 Retornando ${paginatedEmails.length} emails (offset: ${offset}, limit: ${limit})`);
        
        return paginatedEmails;
    }
    
    /**
     * 🔢 Obtener el número total de emails almacenados
     * @returns {number} - Cantidad de emails
     */
    getEmailCount() {
        return this.emails.length;
    }
    
    /**
     * 📈 Obtener estadísticas del almacenamiento
     * @returns {Object} - Estadísticas
     */
    getStorageStats() {
        const stats = {
            totalEmails: this.emails.length,
            sentEmails: this.emails.filter(email => email.status === 'sent').length,
            failedEmails: this.emails.filter(email => email.status === 'failed').length,
            pendingEmails: this.emails.filter(email => email.status === 'pending').length,
            uniqueSenders: [...new Set(this.emails.map(email => email.from))].length,
            uniqueRecipients: [...new Set(this.emails.map(email => email.to))].length,
            oldestEmail: this.emails.length > 0 ? 
                new Date(Math.min(...this.emails.map(email => new Date(email.timestamp)))).toISOString() : null,
            newestEmail: this.emails.length > 0 ? 
                new Date(Math.max(...this.emails.map(email => new Date(email.timestamp)))).toISOString() : null
        };
        
        console.log('📈 Estadísticas del storage:', stats);
        
        return stats;
    }
    
    /**
     * 🔍 Buscar emails por contenido
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Array} - Emails que coinciden
     */
    searchEmails(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        const matchingEmails = this.emails.filter(email => 
            email.subject.toLowerCase().includes(term) ||
            email.message.toLowerCase().includes(term) ||
            email.from.toLowerCase().includes(term) ||
            email.to.toLowerCase().includes(term)
        );
        
        console.log(`🔍 Búsqueda "${searchTerm}": ${matchingEmails.length} resultados`);
        
        return matchingEmails.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    /**
     * 🗑️ Eliminar un email por ID (para administración)
     * @param {string} emailId - ID del email a eliminar
     * @returns {boolean} - True si se eliminó, false si no se encontró
     */
    deleteEmail(emailId) {
        const initialLength = this.emails.length;
        this.emails = this.emails.filter(email => email.id !== emailId);
        
        const deleted = this.emails.length < initialLength;
        
        if (deleted) {
            console.log(`🗑️ Email eliminado: ${emailId}`);
        } else {
            console.log(`❌ Email no encontrado para eliminar: ${emailId}`);
        }
        
        return deleted;
    }
    
    /**
     * 🧹 Limpiar emails antiguos (para mantenimiento)
     * @param {number} daysOld - Días de antigüedad
     * @returns {number} - Número de emails eliminados
     */
    cleanOldEmails(daysOld = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        
        const initialLength = this.emails.length;
        this.emails = this.emails.filter(email => 
            new Date(email.timestamp) >= cutoffDate
        );
        
        const deletedCount = initialLength - this.emails.length;
        
        console.log(`🧹 Emails antiguos eliminados: ${deletedCount} (más de ${daysOld} días)`);
        
        return deletedCount;
    }
    
    /**
     * ✅ Validar estructura de email
     * @param {Object} emailData - Datos del email
     * @returns {boolean} - True si es válido
     */
    isValidEmailStructure(emailData) {
        const requiredFields = ['id', 'from', 'to', 'subject', 'message'];
        
        // Verificar que existan los campos requeridos
        for (const field of requiredFields) {
            if (!emailData.hasOwnProperty(field) || 
                typeof emailData[field] !== 'string' || 
                emailData[field].trim().length === 0) {
                console.error(`❌ Campo inválido o faltante: ${field}`);
                return false;
            }
        }
        
        // Verificar que status sea válido si existe
        if (emailData.status && 
            !['pending', 'sent', 'failed'].includes(emailData.status)) {
            console.error(`❌ Status inválido: ${emailData.status}`);
            return false;
        }
        
        return true;
    }
    
    /**
     * 💾 Exportar datos (para backup)
     * @returns {Object} - Datos exportables
     */
    exportData() {
        return {
            emails: this.emails,
            exportDate: new Date().toISOString(),
            totalCount: this.emails.length,
            stats: this.getStorageStats()
        };
    }
    
    /**
     * 📥 Importar datos (para restaurar backup)
     * @param {Object} data - Datos a importar
     * @returns {boolean} - True si se importó correctamente
     */
    importData(data) {
        try {
            if (!data.emails || !Array.isArray(data.emails)) {
                throw new Error('Formato de datos inválido');
            }
            
            // Validar cada email
            for (const email of data.emails) {
                if (!this.isValidEmailStructure(email)) {
                    throw new Error(`Email inválido encontrado: ${email.id}`);
                }
            }
            
            this.emails = [...data.emails];
            
            console.log(`📥 Datos importados: ${this.emails.length} emails`);
            
            return true;
            
        } catch (error) {
            console.error('❌ Error al importar datos:', error.message);
            return false;
        }
    }
}

module.exports = EmailStorage;