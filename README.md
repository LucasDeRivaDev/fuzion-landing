# 🏋️ Fuzion Fitness & Dance

Sitio web completo para un gimnasio moderno con clases de fitness y danza. Incluye tienda online, sistema de membresías, calendario de horarios y área exclusiva para miembros.

🔗 **[Ver demo en vivo](https://fuzion-landing.vercel.app)**

---

## 📸 Preview

> *Landing page con hero section, tienda deportiva, membresías y videos exclusivos para miembros.*

---

## ✨ Funcionalidades

- 🗓️ **Calendario de horarios** generado dinámicamente con JavaScript
- 🛒 **Tienda** con ropa deportiva y suplementos, navegación por tabs
- 🛍️ **Carrito funcional** con contador y resumen de compra
- 💎 **Planes de membresía** — Básico, Pro y Premium con comparativa de beneficios
- 🔒 **Videos exclusivos** bloqueados para miembros (demo con login modal)
- 🔐 **Login modal** demo con validación de usuario
- 📬 **Formulario de contacto** conectado a [Formspree](https://formspree.io)
- 📱 Diseño **100% responsivo** con Tailwind CSS

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| Tailwind CSS (CDN) | Estilos y diseño responsivo |
| JavaScript Vanilla | Lógica del carrito, calendario y tabs |
| Formspree | Manejo del formulario de contacto |
| Vercel | Deploy y hosting |

---

## 🚀 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/LucasDeRivaDev/fuzion-landing.git

# Entrar al directorio
cd fuzion-landing

# Abrir con Live Server en VS Code
# Click derecho en index.html → Open with Live Server
```

> No requiere instalación de dependencias. Tailwind CSS se carga desde CDN.

---

## 📁 Estructura del proyecto

```
fuzion-landing/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos adicionales
└── js/
    └── main.js         # Lógica: carrito, calendario, tabs, login modal
```

---

## 🔧 Configuración del formulario

El formulario usa [Formspree](https://formspree.io). Para usar tu propio endpoint:

```html
<form action="https://formspree.io/f/TU_ENDPOINT" method="POST">
```

---

## 📦 Deploy

El proyecto está desplegado en **Vercel** con deploy automático en cada push a `main`.

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main
# Vercel despliega automáticamente
```

---

## 👨‍💻 Autor

**Lucas De Rivia** — Desarrollador Web Frontend  
📍 Santo Tomé, Santa Fe, Argentina  
🐙 [github.com/LucasDeRivaDev](https://github.com/LucasDeRivaDev)

---

## 📄 Licencia

MIT — libre para usar con atribución.