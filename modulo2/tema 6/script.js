// Datos de productos
const products = [
    {
        id: 1,
        name: "Pantalón Suelto Gris",
        price: 45.99,
        category: "pantalones",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
        description: "Cómodo pantalón suelto perfecto para el día a día."
    },
    {
        id: 2,
        name: "Vestido Túnico",
        price: 52.99,
        category: "vestidos",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
        description: "Elegante vestido túnico ideal para cualquier ocasión."
    },
    {
        id: 3,
        name: "Falda Midi Print",
        price: 38.50,
        category: "vestidos",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400&h=400&fit=crop&crop=center",
        description: "Falda midi con estampado moderno y juvenil."
    },
    {
        id: 4,
        name: "Cardigan Largo Rayado",
        price: 65.00,
        category: "cardigans",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
        description: "Cardigan largo y cómodo con patrón de rayas."
    },
    {
        id: 5,
        name: "Top Estampado Zebra",
        price: 29.99,
        category: "camisetas",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop&crop=center",
        description: "Top moderno con estampado de zebra muy trendy."
    },
    {
        id: 6,
        name: "Vestido Beige Elegante",
        price: 78.50,
        category: "vestidos",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop&crop=center",
        description: "Vestido beige elegante perfecto para eventos especiales."
    },
    {
        id: 7,
        name: "Crop Top Blanco",
        price: 24.99,
        category: "camisetas",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center",
        description: "Crop top básico en color blanco, muy versátil."
    },
    {
        id: 8,
        name: "Pantalón Negro Ajustado",
        price: 42.00,
        category: "pantalones",
        image: "https://images.unsplash.com/photo-1506629905477-6549235aa4b8?w=400&h=400&fit=crop&crop=center",
        description: "Pantalón negro ajustado, perfecto para looks formales."
    }
];

let cart = [];

// Funciones principales
$(document).ready(function() {
    displayProducts(products);
    updateCartUI();
    
    // Event listeners
    $('#cartBtn').click(function() {
        $('#cartSidebar').addClass('show');
        $('#cartOverlay').show();
    });

    $('#closeCart, #cartOverlay').click(function() {
        $('#cartSidebar').removeClass('show');
        $('#cartOverlay').hide();
    });

    $('#categoryFilter').change(function() {
        const selectedCategory = $(this).val();
        if (selectedCategory === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => 
                product.category === selectedCategory
            );
            displayProducts(filteredProducts);
        }
    });

    $('#clearCartBtn').click(function() {
        clearCart();
    });

    $('#checkoutBtn').click(function() {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        const total = getCartTotal();
        alert(`Compra realizada por €${total.toFixed(2)}. ¡Gracias por tu compra!`);
        clearCart();
        $('#cartSidebar').removeClass('show');
        $('#cartOverlay').hide();
    });
});

function displayProducts(productsToShow) {
    const container = $('#productsContainer');
    container.empty();

    productsToShow.forEach(product => {
        const productCard = `
            <div class="col-md-3 col-sm-6">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h5>${product.name}</h5>
                        <p class="text-muted small">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="product-price">€${product.price}</span>
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-2"></i>Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.append(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartUI();
    
    // Animación de confirmación
    $(`button[onclick="addToCart(${productId})"]`)
        .html('<i class="fas fa-check me-2"></i>¡Añadido!')
        .removeClass('btn-primary')
        .addClass('btn-success');
    
    setTimeout(() => {
        $(`button[onclick="addToCart(${productId})"]`)
            .html('<i class="fas fa-cart-plus me-2"></i>Añadir al carrito')
            .removeClass('btn-success')
            .addClass('btn-primary');
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('#cartCount').text(cartCount);

    const cartItemsContainer = $('#cartItems');
    cartItemsContainer.empty();

    if (cart.length === 0) {
        cartItemsContainer.append('<div class="p-4 text-center text-muted">El carrito está vacío</div>');
    } else {
        cart.forEach(item => {
            const cartItem = `
                <div class="cart-item">
                    <div class="row align-items-center">
                        <div class="col-3">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-6">
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">€${item.price}</small>
                        </div>
                        <div class="col-3 text-end">
                            <div class="btn-group-vertical btn-group-sm">
                                <button class="btn btn-outline-primary btn-sm" onclick="updateQuantity(${item.id}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <span class="px-2 py-1 bg-light text-center">${item.quantity}</span>
                                <button class="btn btn-outline-primary btn-sm" onclick="updateQuantity(${item.id}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                            <button class="btn btn-outline-danger btn-sm mt-1 w-100" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.append(cartItem);
        });
    }

    const total = getCartTotal();
    $('#cartTotal').text(`€${total.toFixed(2)}`);
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function clearCart() {
    cart = [];
    updateCartUI();
}