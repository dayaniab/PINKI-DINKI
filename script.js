// Referencias del DOM
const grid = document.getElementById('grid-productos');
const formPrecio = document.getElementById('formulario-precio');
const galeria = document.getElementById('galeria-precios');
const formDatos = document.getElementById('formulario-datos');
const confirmacion = document.getElementById('confirmacion');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const mensajeNo = document.getElementById('mensaje-no');
const mensajeFinal = document.getElementById('mensaje-final');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD6NB2f4icoKBA7VV8KEd-oJLdV7EjdMzA",
  authDomain: "pinki-dinkis.firebaseapp.com",
  projectId: "pinki-dinkis",
  storageBucket: "pinki-dinkis.appspot.com",
  messagingSenderId: "761142113629",
  appId: "1:761142113629:web:4b830798bd55d1fef6e4b4",
  measurementId: "G-KEMSRF6K52",
  databaseURL: "https://pinki-dinkis-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Lista de productos (se cargará desde Firebase)
let productos = [];
let productoSeleccionado = null;

// Cargar productos desde Firebase
function cargarProductosDesdeFirebase() {
  return database.ref('productos').once('value').then(snapshot => {
    const data = snapshot.val();
    if (data) {
      productos = Object.values(data);
    } else {
      // Si no hay productos en Firebase, usar la lista por defecto
      productos = [
        {
          nombre: "ANIMADOR@ INFANTIL",
          imagen: "https://i.imgur.com/5pc5QzK.jpeg",
          precios: [
            "https://i.imgur.com/CTfmji2.jpeg",
            "https://i.imgur.com/yFosOMa.jpeg",
            "https://i.imgur.com/I2goapV.jpeg",
            "https://i.imgur.com/kneT7uz.jpeg"
          ]
        },
        {
          nombre: "PINTA CARITAS",
          imagen: "https://i.imgur.com/VFUwbCP.jpeg",
          precios: [
            "https://i.imgur.com/g0YRYPn.jpeg",
            "https://i.imgur.com/HLlKDkf.jpeg",
            "https://i.imgur.com/Cl4a3Iq.jpeg"
          ]
        },
        {
          nombre: "BELY Y BETO",
          imagen: "https://i.imgur.com/MxyqdNM.jpeg",
          precios: [
            "https://i.imgur.com/kCx4Bzv.jpeg",
            "https://i.imgur.com/4mJ9V28.jpeg",
            "https://i.imgur.com/YYd6I3h.jpeg"
          ]
        },
        {
          nombre: "SHOW DE SPIDERMAN",
          imagen: "https://i.imgur.com/Zrr9ok2.jpeg",
          precios: [
            "https://via.placeholder.com/150/FFD700?text=Personaje1",
            "https://via.placeholder.com/150/FFD700?text=Personaje2",
            "https://via.placeholder.com/150/FFD700?text=Personaje3",
            "https://via.placeholder.com/150/FFD700?text=Personaje4",
            "https://via.placeholder.com/150/FFD700?text=Personaje5"
          ]
        },
        {
          nombre: "PERSONAJES",
          imagen: "https://i.imgur.com/5pc5QzK.jpeg",
          precios: [
            "https://i.imgur.com/CTfmji2.jpeg",
            "https://i.imgur.com/yFosOMa.jpeg",
            "https://i.imgur.com/I2goapV.jpeg",
            "https://i.imgur.com/kneT7uz.jpeg"
          ]
        },
        {
          nombre: "INFLABLES",
          imagen: "https://i.imgur.com/5pc5QzK.jpeg",
          precios: [
            "https://i.imgur.com/CTfmji2.jpeg",
            "https://i.imgur.com/yFosOMa.jpeg",
            "https://i.imgur.com/I2goapV.jpeg",
            "https://i.imgur.com/kneT7uz.jpeg"
          ]
        },
        {
          nombre: "ARMA TU PAQUETE",
          imagen: "https://i.imgur.com/5pc5QzK.jpeg",
          precios: [
            "https://i.imgur.com/CTfmji2.jpeg",
            "https://i.imgur.com/yFosOMa.jpeg",
            "https://i.imgur.com/I2goapV.jpeg",
            "https://i.imgur.com/kneT7uz.jpeg"
          ]
        }
      ];
    }
    mostrarProductos();
  }).catch(error => {
    console.error("Error al cargar productos:", error);
    // En caso de error, usar la lista por defecto
    productos = [
      {
        nombre: "ANIMADOR@ INFANTIL",
        imagen: "https://i.imgur.com/5pc5QzK.jpeg",
        precios: [
          "https://i.imgur.com/CTfmji2.jpeg",
          "https://i.imgur.com/yFosOMa.jpeg",
          "https://i.imgur.com/I2goapV.jpeg",
          "https://i.imgur.com/kneT7uz.jpeg"
        ]
      },
      {
        nombre: "PINTA CARITAS",
        imagen: "https://i.imgur.com/VFUwbCP.jpeg",
        precios: [
          "https://i.imgur.com/g0YRYPn.jpeg",
          "https://i.imgur.com/HLlKDkf.jpeg",
          "https://i.imgur.com/Cl4a3Iq.jpeg"
        ]
      },
      {
        nombre: "BELY Y BETO",
        imagen: "https://i.imgur.com/MxyqdNM.jpeg",
        precios: [
          "https://i.imgur.com/kCx4Bzv.jpeg",
          "https://i.imgur.com/4mJ9V28.jpeg",
          "https://i.imgur.com/YYd6I3h.jpeg"
        ]
      },
      {
        nombre: "SHOW DE SPIDERMAN",
        imagen: "https://i.imgur.com/Zrr9ok2.jpeg",
        precios: [
          "https://via.placeholder.com/150/FFD700?text=Personaje1",
          "https://via.placeholder.com/150/FFD700?text=Personaje2",
          "https://via.placeholder.com/150/FFD700?text=Personaje3",
          "https://via.placeholder.com/150/FFD700?text=Personaje4",
          "https://via.placeholder.com/150/FFD700?text=Personaje5"
        ]
      },
      {
        nombre: "PERSONAJES",
        imagen: "https://i.imgur.com/5pc5QzK.jpeg",
        precios: [
          "https://i.imgur.com/CTfmji2.jpeg",
          "https://i.imgur.com/yFosOMa.jpeg",
          "https://i.imgur.com/I2goapV.jpeg",
          "https://i.imgur.com/kneT7uz.jpeg"
        ]
      },
      {
        nombre: "INFLABLES",
        imagen: "https://i.imgur.com/5pc5QzK.jpeg",
        precios: [
          "https://i.imgur.com/CTfmji2.jpeg",
          "https://i.imgur.com/yFosOMa.jpeg",
          "https://i.imgur.com/I2goapV.jpeg",
          "https://i.imgur.com/kneT7uz.jpeg"
        ]
      },
      {
        nombre: "ARMA TU PAQUETE",
        imagen: "https://i.imgur.com/5pc5QzK.jpeg",
        precios: [
          "https://i.imgur.com/CTfmji2.jpeg",
          "https://i.imgur.com/yFosOMa.jpeg",
          "https://i.imgur.com/I2goapV.jpeg",
          "https://i.imgur.com/kneT7uz.jpeg"
        ]
      }
    ];
    mostrarProductos();
  });
}

// Mostrar productos en la página
function mostrarProductos() {
  if (!grid) return; // Si no estamos en la página de productos
  
  grid.innerHTML = '';
  productos.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h4>${prod.nombre}</h4>
      <button onclick="mostrarFormulario(${index})" class="btn-precio">
        💰 Consultar Precios
        <span class="btn-hint">📋</span>
      </button>
    `;
    grid.appendChild(card);
  });
}

// Inicializar la página
window.onload = function() {
  cargarProductosDesdeFirebase();
};

// Mostrar formulario para ingresar municipio y fecha
window.mostrarFormulario = (index) => {
  productoSeleccionado = index;
  formPrecio.style.display = 'block';
  galeria.style.display = 'none';
  confirmacion.style.display = 'none';
  mensajeNo.style.display = 'none';
  
  // Hacer scroll suave hasta el formulario
  setTimeout(() => {
    formPrecio.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    // Agregar efecto visual de resaltado
    formPrecio.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.6)';
    formPrecio.style.transform = 'scale(1.02)';
    formPrecio.style.transition = 'all 0.3s ease';
    
    // Mostrar mensaje informativo
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff69b4, #ff85c1);
      color: white;
      padding: 15px 20px;
      border-radius: 25px;
      box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
      z-index: 10000;
      font-weight: bold;
      animation: slideInRight 0.5s ease-out;
    `;
    mensaje.textContent = '📋 Completa los datos para ver precios';
    document.body.appendChild(mensaje);
    
    // Remover el efecto y mensaje después de 3 segundos
    setTimeout(() => {
      formPrecio.style.boxShadow = '';
      formPrecio.style.transform = '';
      mensaje.style.animation = 'slideOutRight 0.5s ease-in';
      setTimeout(() => mensaje.remove(), 500);
    }, 3000);
  }, 100);
};

// Mostrar galería de precios
formDatos.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const municipio = document.getElementById('municipio').value;
  const fecha = document.getElementById('fecha').value;
  
  // Guardar datos en localStorage
  localStorage.setItem('municipioSeleccionado', municipio);
  localStorage.setItem('fechaSeleccionada', fecha);
  
  // Redirigir a la página de precios con los parámetros
  const url = `Precios.html?municipio=${encodeURIComponent(municipio)}&fecha=${encodeURIComponent(fecha)}&servicio=${encodeURIComponent(productos[productoSeleccionado]?.nombre || 'Todos los servicios')}`;
  window.location.href = url;
});

// Guardar imagen seleccionada
function seleccionarImagen(url) {
  galeria.style.display = 'none';
  confirmacion.style.display = 'block';
  localStorage.setItem('imagenSeleccionada', url);
}

// Ir al formulario de agendar
btnSi.addEventListener('click', () => {
  confirmacion.style.display = 'none';
  mensajeFinal.style.display = 'block';
});

btnNo.addEventListener('click', () => {
  confirmacion.style.display = 'none';
  mensajeNo.style.display = 'block';
});

// Obtener ubicación actual (tipo WhatsApp)
function obtenerUbicacion() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("ubicacion").value = `https://www.google.com/maps?q=${lat},${lon}`;
      alert("📍 Ubicación obtenida correctamente.");
    }, () => {
      alert("⚠️ No se pudo obtener la ubicación.");
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}
