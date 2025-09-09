// Array para almacenar las solicitudes de información
let solicitudesInfo = [];

// Función para recoger información de campos de texto (Punto 3)
function recogerInformacion() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Crear objeto literal con la información
    const solicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        destino: destino,
        fecha: fecha,
        mensaje: mensaje,
        timestamp: new Date().toLocaleString()
    };
    
    // Agregar al array de solicitudes
    solicitudesInfo.push(solicitud);
    
    alert('¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.');
    
    // Limpiar formulario
    document.getElementById('form-info').reset();
    
    console.log('Nueva solicitud agregada:', solicitud);
    console.log('Total solicitudes:', solicitudesInfo);
    
    return false; // Prevenir envío del formulario
}

// Función para filtrar ofertas (Punto 4)
function filtrarOfertas() {
    const presupuesto = document.getElementById('presupuesto').value;
    const tipoViaje = document.getElementById('tipo-viaje').value;
    
    // Definir ofertas disponibles
    const todasLasOfertas = [
        {
            nombre: "🏖️ Playa del Carmen",
            descripcion: "Relájate en las hermosas playas del Caribe mexicano con aguas cristalinas y arena blanca.",
            precio: 850,
            tipo: "playa"
        },
        {
            nombre: "🗼 París",
            descripcion: "Vive la magia de la Ciudad de la Luz, sus museos, gastronomía y monumentos históricos.",
            precio: 1200,
            tipo: "ciudad"
        },
        {
            nombre: "🏔️ Machu Picchu",
            descripcion: "Explora una de las maravillas del mundo en los Andes peruanos.",
            precio: 950,
            tipo: "aventura"
        },
        {
            nombre: "🍜 Tokio",
            descripcion: "Sumérgete en la fascinante cultura japonesa entre tradición y modernidad.",
            precio: 1400,
            tipo: "cultural"
        },
        {
            nombre: "🌴 Islas Canarias",
            descripcion: "Disfruta del clima perfecto y las playas volcánicas de las Canarias.",
            precio: 650,
            tipo: "playa"
        },
        {
            nombre: "🏛️ Roma",
            descripcion: "Descubre la historia eterna de la Ciudad Eterna y su increíble patrimonio.",
            precio: 980,
            tipo: "cultural"
        },
        {
            nombre: "🌺 Mallorca",
            descripción: "Experimenta la belleza mediterránea de las Islas Baleares.",
            precio: 720,
            tipo: "playa"
        },
        {
            nombre: "🏰 Galicia",
            descripcion: "Recorre los paisajes verdes y la costa atlántica de Galicia.",
            precio: 580,
            tipo: "cultural"
        }
    ];
    
    let ofertasFiltradas = todasLasOfertas;
    
    // Filtrar por presupuesto
    if (presupuesto) {
        switch(presupuesto) {
            case '500-800':
                ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.precio >= 500 && oferta.precio <= 800);
                break;
            case '800-1200':
                ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.precio >= 800 && oferta.precio <= 1200);
                break;
            case '1200-1600':
                ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.precio >= 1200 && oferta.precio <= 1600);
                break;
            case '1600+':
                ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.precio >= 1600);
                break;
        }
    }
    
    // Filtrar por tipo de viaje
    if (tipoViaje) {
        ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.tipo === tipoViaje);
    }
    
    // Mostrar resultados filtrados (Punto 5 - mostrar en landing page)
    mostrarOfertasFiltradas(ofertasFiltradas);
    
    return false; // Prevenir envío del formulario
}

// Función para mostrar ofertas filtradas en la landing page (Punto 5)
function mostrarOfertasFiltradas(ofertas) {
    const destinosGrid = document.querySelector('.destinos-grid');
    
    if (ofertas.length === 0) {
        destinosGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                <h3>No se encontraron ofertas con los filtros seleccionados</h3>
                <p>Intenta ajustar tus criterios de búsqueda</p>
            </div>
        `;
        return;
    }
    
    // Limpiar grid actual y mostrar ofertas filtradas
    destinosGrid.innerHTML = '';
    
    ofertas.forEach(oferta => {
        const destinoElement = document.createElement('div');
        destinoElement.className = 'destino';
        destinoElement.innerHTML = `
            <h3>${oferta.nombre}</h3>
            <p>${oferta.descripcion}</p>
            <div class="precio">Desde $${oferta.precio}</div>
        `;
        destinosGrid.appendChild(destinoElement);
    });
    
    // Scroll suave hacia los resultados
    document.querySelector('.destinos-grid').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Mensaje informativo
    const mensaje = ofertas.length === 1 ? 
        `Se encontró 1 oferta que coincide con tus criterios:` : 
        `Se encontraron ${ofertas.length} ofertas que coinciden con tus criterios:`;
    
    // Crear elemento de mensaje temporal
    const mensajeElement = document.createElement('div');
    mensajeElement.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
            <strong>Resultados del filtro:</strong> ${mensaje}
        </div>
    `;
    
    // Insertar mensaje antes del grid
    destinosGrid.parentNode.insertBefore(mensajeElement, destinosGrid);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.remove();
    }, 5000);
}

// Función para mostrar todas las ofertas (restablecer filtros)
function mostrarTodasLasOfertas() {
    const destinosGrid = document.querySelector('.destinos-grid');
    destinosGrid.innerHTML = `
        <div class="destino">
            <h3>🏖️ Playa del Carmen</h3>
            <p>Relájate en las hermosas playas del Caribe mexicano con aguas cristalinas y arena blanca.</p>
            <div class="precio">Desde $850</div>
        </div>
        
        <div class="destino">
            <h3>🗼 París</h3>
            <p>Vive la magia de la Ciudad de la Luz, sus museos, gastronomía y monumentos históricos.</p>
            <div class="precio">Desde $1,200</div>
        </div>
        
        <div class="destino">
            <h3>🏔️ Machu Picchu</h3>
            <p>Explora una de las maravillas del mundo en los Andes peruanos.</p>
            <div class="precio">Desde $950</div>
        </div>
        
        <div class="destino">
            <h3>🍜 Tokio</h3>
            <p>Sumérgete en la fascinante cultura japonesa entre tradición y modernidad.</p>
            <div class="precio">Desde $1,400</div>
        </div>
    `;
}

// Event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario de información
    const formInfo = document.getElementById('form-info');
    if (formInfo) {
        formInfo.addEventListener('submit', function(e) {
            e.preventDefault();
            recogerInformacion();
        });
    }
    
    // Agregar event listener al formulario de filtros
    const formFiltros = document.getElementById('form-filtros');
    if (formFiltros) {
        formFiltros.addEventListener('submit', function(e) {
            e.preventDefault();
            filtrarOfertas();
        });
    }
    
    console.log('Script cargado correctamente - Agencia de Viajes');
});