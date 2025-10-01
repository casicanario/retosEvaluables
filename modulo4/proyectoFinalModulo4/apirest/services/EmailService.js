/**
 * 📧 EMAIL SERVICE - POSTMARK INTEGRATION
 * ========================================
 * Servicio para envío de emails usando PostMark API
 */

const postmark = require('postmark');

class EmailService {
    constructor() {
        this.client = null;
        this.fromEmail = process.env.POSTMARK_FROM_EMAIL;
        this.isReady = false;
        
        this.initializePostMark();
    }
    
    /**
     * 🔧 Inicializar cliente de PostMark
     */
    initializePostMark() {
        try {
            const apiToken = process.env.POSTMARK_API_TOKEN;
            
            if (!apiToken || apiToken === 'your_postmark_api_token_here') {
                console.log('⚠️  PostMark API Token no configurado');
                console.log('   Configure POSTMARK_API_TOKEN en el archivo .env');
                return;
            }
            
            if (!this.fromEmail || this.fromEmail === 'noreply@yourdomain.com') {
                console.log('⚠️  Email remitente no configurado');
                console.log('   Configure POSTMARK_FROM_EMAIL en el archivo .env');
                return;
            }
            
            // Inicializar cliente PostMark
            this.client = new postmark.ServerClient(apiToken);
            this.isReady = true;
            
            console.log('✅ PostMark configurado correctamente');
            console.log(`📧 Email remitente: ${this.fromEmail}`);
            
        } catch (error) {
            console.error('❌ Error al inicializar PostMark:', error.message);
            this.isReady = false;
        }
    }
    
    /**
     * 📊 Verificar si el servicio está configurado
     * @returns {boolean}
     */
    isConfigured() {
        return this.isReady && this.client !== null;
    }
    
    /**
     * 📧 Enviar email usando PostMark
     * @param {Object} emailData - Datos del email
     * @param {string} emailData.from - Email remitente
     * @param {string} emailData.to - Email destinatario
     * @param {string} emailData.subject - Asunto del email
     * @param {string} emailData.message - Contenido del email
     * @returns {Promise<Object>} - Resultado del envío
     */
    async sendEmail(emailData) {
        if (!this.isConfigured()) {
            throw new Error('PostMark no está configurado correctamente');
        }
        
        try {
            const { from, to, subject, message } = emailData;
            
            // Preparar datos para PostMark
            const emailOptions = {
                From: from,
                To: to,
                Subject: subject,
                TextBody: message,
                HtmlBody: this.generateHtmlBody(message, subject),
                MessageStream: 'outbound'
            };
            
            console.log(`📤 Enviando email via PostMark: ${from} → ${to}`);
            
            // Enviar email
            const result = await this.client.sendEmail(emailOptions);
            
            console.log('✅ Email enviado exitosamente:', {
                MessageID: result.MessageID,
                SubmittedAt: result.SubmittedAt,
                To: result.To,
                ErrorCode: result.ErrorCode
            });
            
            return result;
            
        } catch (error) {
            console.error('❌ Error al enviar email via PostMark:', error);
            
            // Procesar diferentes tipos de errores de PostMark
            if (error.code) {
                switch (error.code) {
                    case 300:
                        throw new Error('Email inválido en el campo From');
                    case 300:
                        throw new Error('Email inválido en el campo To');
                    case 405:
                        throw new Error('Método no permitido');
                    case 422:
                        throw new Error('Datos de email inválidos');
                    case 500:
                        throw new Error('Error interno de PostMark');
                    default:
                        throw new Error(`Error de PostMark: ${error.message}`);
                }
            }
            
            throw new Error(`Error al enviar email: ${error.message}`);
        }
    }
    
    /**
     * 🎨 Generar HTML body para el email
     * @param {string} textMessage - Mensaje en texto plano
     * @param {string} subject - Asunto del email
     * @returns {string} - HTML formateado
     */
    generateHtmlBody(textMessage, subject) {
        // Convertir saltos de línea a <br>
        const htmlMessage = textMessage.replace(/\n/g, '<br>');
        
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .email-container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .email-header {
                    border-bottom: 2px solid #007bff;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .email-subject {
                    color: #007bff;
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0;
                }
                .email-content {
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 30px;
                }
                .email-footer {
                    border-top: 1px solid #eee;
                    padding-top: 20px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                }
                .powered-by {
                    margin-top: 10px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1 class="email-subject">${subject}</h1>
                </div>
                
                <div class="email-content">
                    ${htmlMessage}
                </div>
                
                <div class="email-footer">
                    <p>Este email fue enviado usando Email API REST</p>
                    <p class="powered-by">Powered by PostMark • Proyecto Final Módulo 4</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
    
    /**
     * 📊 Obtener estadísticas del servicio
     * @returns {Object} - Estadísticas
     */
    getServiceStats() {
        return {
            isConfigured: this.isConfigured(),
            fromEmail: this.fromEmail,
            hasApiToken: !!process.env.POSTMARK_API_TOKEN && 
                         process.env.POSTMARK_API_TOKEN !== 'your_postmark_api_token_here',
            clientReady: this.client !== null
        };
    }
    
    /**
     * 🧪 Probar configuración enviando email de prueba
     * @param {string} testEmail - Email para enviar prueba
     * @returns {Promise<boolean>} - Resultado de la prueba
     */
    async testConfiguration(testEmail) {
        if (!this.isConfigured()) {
            throw new Error('PostMark no está configurado');
        }
        
        try {
            const testEmailData = {
                from: this.fromEmail,
                to: testEmail,
                subject: '🧪 Test - Email API REST',
                message: 'Este es un email de prueba para verificar la configuración de PostMark.\n\nSi recibes este email, la configuración está funcionando correctamente.\n\n¡Saludos desde Email API REST!'
            };
            
            await this.sendEmail(testEmailData);
            return true;
            
        } catch (error) {
            console.error('❌ Error en test de configuración:', error);
            return false;
        }
    }
}

module.exports = EmailService;