/**
 * 🔍 POKÉDEX - JAVASCRIPT
 * ========================================
 * Aplicación para consumir la PokéAPI y mostrar información de Pokémon
 * Módulo 4 - Tema 5: Consumo de API Externa
 */

// =============================================
// 🌐 CONFIGURACIÓN DE LA API
// =============================================
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_ENDPOINT = `${POKEAPI_BASE_URL}/pokemon`;

// =============================================
// 🎯 ELEMENTOS DEL DOM
// =============================================
const elements = {
    // Input y botones
    pokemonInput: document.getElementById('pokemonInput'),
    searchBtn: document.getElementById('searchBtn'),
    suggestionChips: document.querySelectorAll('.suggestion-chip'),
    
    // Estados de la UI
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    closeError: document.getElementById('closeError'),
    
    // Card del Pokémon
    pokemonCard: document.getElementById('pokemonCard'),
    pokemonName: document.getElementById('pokemonName'),
    pokemonId: document.getElementById('pokemonId'),
    pokemonImage: document.getElementById('pokemonImage'),
    pokemonHeight: document.getElementById('pokemonHeight'),
    pokemonWeight: document.getElementById('pokemonWeight'),
    pokemonExperience: document.getElementById('pokemonExperience'),
    pokemonTypes: document.getElementById('pokemonTypes'),
    pokemonAbilities: document.getElementById('pokemonAbilities'),
    pokemonStats: document.getElementById('pokemonStats'),
    
    // Botones de acción
    searchAnother: document.getElementById('searchAnother'),
    randomPokemon: document.getElementById('randomPokemon')
};

// =============================================
// 🎲 LISTA DE POKÉMON POPULARES PARA RANDOM
// =============================================
const popularPokemon = [
    'pikachu', 'charizard', 'blastoise', 'venusaur', 'gengar', 'dragonite',
    'mewtwo', 'snorlax', 'gyarados', 'alakazam', 'machamp', 'golem',
    'rapidash', 'magnezone', 'jolteon', 'vaporeon', 'flareon', 'eevee',
    'lucario', 'garchomp', 'dialga', 'palkia', 'arceus', 'rayquaza'
];

// =============================================
// 🚀 INICIALIZACIÓN DE LA APLICACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Pokédex iniciada correctamente');
    initializeEventListeners();
    
    // Buscar Pikachu por defecto como ejemplo
    // searchPokemon('pikachu');
});

/**
 * 📝 Inicializar todos los event listeners
 */
function initializeEventListeners() {
    // Búsqueda principal
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.pokemonInput.addEventListener('keypress', handleEnterKey);
    
    // Chips de sugerencias
    elements.suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const pokemonName = this.dataset.pokemon;
            elements.pokemonInput.value = pokemonName;
            searchPokemon(pokemonName);
        });
    });
    
    // Cerrar error
    elements.closeError.addEventListener('click', hideError);
    
    // Botones de acción
    elements.searchAnother.addEventListener('click', function() {
        hideCard();
        elements.pokemonInput.focus();
        elements.pokemonInput.select();
    });
    
    elements.randomPokemon.addEventListener('click', searchRandomPokemon);
    
    console.log('✅ Event listeners inicializados');
}

/**
 * 🔍 Manejar la búsqueda desde el botón
 */
function handleSearch() {
    const pokemonName = elements.pokemonInput.value.trim().toLowerCase();
    
    if (!pokemonName) {
        showError('Por favor, ingresa el nombre de un Pokémon', 'El campo de búsqueda no puede estar vacío');
        elements.pokemonInput.focus();
        return;
    }
    
    searchPokemon(pokemonName);
}

/**
 * ⌨️ Manejar la tecla Enter en el input
 */
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

/**
 * 🎲 Buscar un Pokémon aleatorio
 */
function searchRandomPokemon() {
    const randomPokemon = popularPokemon[Math.floor(Math.random() * popularPokemon.length)];
    elements.pokemonInput.value = randomPokemon;
    searchPokemon(randomPokemon);
}

/**
 * 🔍 Función principal para buscar un Pokémon
 * @param {string} pokemonName - Nombre del Pokémon a buscar
 */
async function searchPokemon(pokemonName) {
    console.log(`🔍 Buscando Pokémon: ${pokemonName}`);
    
    // Limpiar estado anterior
    hideError();
    hideCard();
    showLoading();
    
    // Deshabilitar botón de búsqueda
    elements.searchBtn.disabled = true;
    elements.searchBtn.innerHTML = '<span class="btn-text">Buscando...</span><span class="btn-icon">⏳</span>';
    
    try {
        // Realizar petición a la API
        const pokemonData = await fetchPokemonData(pokemonName);
        
        // Mostrar los datos del Pokémon
        displayPokemonData(pokemonData);
        
        console.log('✅ Pokémon encontrado:', pokemonData.name);
        
    } catch (error) {
        console.error('❌ Error al buscar Pokémon:', error);
        handleSearchError(error, pokemonName);
    } finally {
        // Restaurar estado del botón
        hideLoading();
        elements.searchBtn.disabled = false;
        elements.searchBtn.innerHTML = '<span class="btn-text">Buscar Pokémon</span><span class="btn-icon">🔍</span>';
    }
}

/**
 * 🌐 Realizar petición HTTP a la PokéAPI
 * @param {string} pokemonName - Nombre del Pokémon
 * @returns {Promise<Object>} - Datos del Pokémon
 */
async function fetchPokemonData(pokemonName) {
    const url = `${POKEMON_ENDPOINT}/${pokemonName.toLowerCase()}`;
    console.log(`📡 Consultando API: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`POKEMON_NOT_FOUND: No se encontró el Pokémon "${pokemonName}"`);
        } else {
            throw new Error(`HTTP_ERROR: Error ${response.status} - ${response.statusText}`);
        }
    }
    
    const data = await response.json();
    console.log('📊 Datos recibidos de la API:', data);
    
    return data;
}

/**
 * 🎴 Mostrar los datos del Pokémon en la interfaz
 * @param {Object} pokemon - Datos del Pokémon de la API
 */
function displayPokemonData(pokemon) {
    console.log('🎨 Mostrando datos del Pokémon en la UI');
    
    // Información básica
    elements.pokemonName.textContent = pokemon.name;
    elements.pokemonId.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    
    // Imagen del Pokémon (con fallback)
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                     pokemon.sprites.front_default || 
                     pokemon.sprites.other.dream_world.front_default;
    
    elements.pokemonImage.src = imageUrl;
    elements.pokemonImage.alt = `Imagen de ${pokemon.name}`;
    
    // Información básica
    elements.pokemonHeight.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    elements.pokemonWeight.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    elements.pokemonExperience.textContent = `${pokemon.base_experience} XP`;
    
    // Tipos
    displayPokemonTypes(pokemon.types);
    
    // Habilidades
    displayPokemonAbilities(pokemon.abilities);
    
    // Estadísticas
    displayPokemonStats(pokemon.stats);
    
    // Mostrar la card con animación
    showCard();
}

/**
 * 🏷️ Mostrar los tipos del Pokémon
 * @param {Array} types - Array de tipos del Pokémon
 */
function displayPokemonTypes(types) {
    elements.pokemonTypes.innerHTML = '';
    
    types.forEach(typeData => {
        const typeElement = document.createElement('span');
        typeElement.className = `type-badge type-${typeData.type.name}`;
        typeElement.textContent = typeData.type.name;
        elements.pokemonTypes.appendChild(typeElement);
    });
    
    console.log('🏷️ Tipos mostrados:', types.map(t => t.type.name));
}

/**
 * ⚡ Mostrar las habilidades del Pokémon
 * @param {Array} abilities - Array de habilidades del Pokémon
 */
function displayPokemonAbilities(abilities) {
    elements.pokemonAbilities.innerHTML = '';
    
    abilities.forEach(abilityData => {
        const abilityElement = document.createElement('div');
        abilityElement.className = 'ability-item';
        
        const abilityName = document.createElement('span');
        abilityName.className = 'ability-name';
        abilityName.textContent = abilityData.ability.name.replace('-', ' ');
        
        abilityElement.appendChild(abilityName);
        
        if (abilityData.is_hidden) {
            const hiddenBadge = document.createElement('span');
            hiddenBadge.className = 'ability-hidden';
            hiddenBadge.textContent = 'Oculta';
            abilityElement.appendChild(hiddenBadge);
        }
        
        elements.pokemonAbilities.appendChild(abilityElement);
    });
    
    console.log('⚡ Habilidades mostradas:', abilities.map(a => a.ability.name));
}

/**
 * 📈 Mostrar las estadísticas del Pokémon
 * @param {Array} stats - Array de estadísticas del Pokémon
 */
function displayPokemonStats(stats) {
    elements.pokemonStats.innerHTML = '';
    
    // Nombres amigables para las estadísticas
    const statNames = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'At. Especial',
        'special-defense': 'Def. Especial',
        'speed': 'Velocidad'
    };
    
    stats.forEach(statData => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        
        const statName = document.createElement('span');
        statName.className = 'stat-name';
        statName.textContent = statNames[statData.stat.name] || statData.stat.name;
        
        const statBarContainer = document.createElement('div');
        statBarContainer.className = 'stat-bar-container';
        
        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        
        const statValue = document.createElement('span');
        statValue.className = 'stat-value';
        statValue.textContent = statData.base_stat;
        
        // Calcular porcentaje (máximo 255 para stats de Pokémon)
        const percentage = Math.min((statData.base_stat / 255) * 100, 100);
        
        // Aplicar el ancho de la barra con delay para animación
        setTimeout(() => {
            statBar.style.width = `${percentage}%`;
        }, 100);
        
        statBar.appendChild(statValue);
        statBarContainer.appendChild(statBar);
        
        statElement.appendChild(statName);
        statElement.appendChild(statBarContainer);
        
        elements.pokemonStats.appendChild(statElement);
    });
    
    console.log('📈 Estadísticas mostradas:', stats.map(s => `${s.stat.name}: ${s.base_stat}`));
}

/**
 * ❌ Manejar errores de búsqueda
 * @param {Error} error - Error ocurrido
 * @param {string} pokemonName - Nombre del Pokémon buscado
 */
function handleSearchError(error, pokemonName) {
    let errorTitle = '¡Oops! Error en la búsqueda';
    let errorMessage = '';
    
    if (error.message.includes('POKEMON_NOT_FOUND')) {
        errorTitle = '🔍 Pokémon no encontrado';
        errorMessage = `No se pudo encontrar "${pokemonName}". Verifica el nombre e inténtalo de nuevo.`;
    } else if (error.message.includes('HTTP_ERROR')) {
        errorTitle = '🌐 Error de conexión';
        errorMessage = 'Hubo un problema al conectar con la PokéAPI. Verifica tu conexión a internet.';
    } else if (error.name === 'TypeError') {
        errorTitle = '🌐 Sin conexión';
        errorMessage = 'No se pudo conectar con la PokéAPI. Verifica tu conexión a internet.';
    } else {
        errorTitle = '⚠️ Error inesperado';
        errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
    
    showError(errorTitle, errorMessage);
}

// =============================================
// 🎨 FUNCIONES DE UI
// =============================================

/**
 * 📱 Mostrar indicador de carga
 */
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.errorMessage.classList.add('hidden');
    elements.pokemonCard.classList.add('hidden');
}

/**
 * 📱 Ocultar indicador de carga
 */
function hideLoading() {
    elements.loading.classList.add('hidden');
}

/**
 * ❌ Mostrar mensaje de error
 * @param {string} title - Título del error
 * @param {string} message - Mensaje del error
 */
function showError(title, message) {
    elements.errorMessage.querySelector('h3').textContent = title;
    elements.errorText.textContent = message;
    elements.errorMessage.classList.remove('hidden');
    elements.pokemonCard.classList.add('hidden');
    
    // Scroll hacia el error
    elements.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * ❌ Ocultar mensaje de error
 */
function hideError() {
    elements.errorMessage.classList.add('hidden');
}

/**
 * 🎴 Mostrar la card del Pokémon
 */
function showCard() {
    elements.pokemonCard.classList.remove('hidden');
    
    // Scroll hacia la card
    setTimeout(() => {
        elements.pokemonCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/**
 * 🎴 Ocultar la card del Pokémon
 */
function hideCard() {
    elements.pokemonCard.classList.add('hidden');
}

// =============================================
// 🔧 FUNCIONES AUXILIARES
// =============================================

/**
 * 🧹 Limpiar el input de búsqueda
 */
function clearSearch() {
    elements.pokemonInput.value = '';
    elements.pokemonInput.focus();
}

/**
 * 📝 Capitalizar primera letra
 * @param {string} str - String a capitalizar
 * @returns {string} - String capitalizado
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 🎲 Obtener un elemento aleatorio de un array
 * @param {Array} array - Array del que obtener elemento
 * @returns {*} - Elemento aleatorio
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// =============================================
// 🐛 MANEJO DE ERRORES GLOBALES
// =============================================
window.addEventListener('error', function(event) {
    console.error('💥 Error global capturado:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('💥 Promise rechazada no manejada:', event.reason);
    event.preventDefault();
});

// =============================================
// 📊 LOGGING Y DEBUGGING
// =============================================
console.log('🚀 Pokédex Script cargado correctamente');
console.log('🔗 API Base URL:', POKEAPI_BASE_URL);
console.log('🎯 Elementos DOM encontrados:', Object.keys(elements).length);

// Exportar funciones para debugging en consola
window.PokeDexDebug = {
    searchPokemon,
    fetchPokemonData,
    popularPokemon,
    elements
};