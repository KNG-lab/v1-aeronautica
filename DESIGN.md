# V1 Aeronáutica — Sistema de Diseño

## Paleta de Colores

### Colores Base
- **Fondo Principal**: `#0a0e27` (azul marino muy oscuro)
- **Fondo Secundario**: `#1a1f3a` (azul oscuro elevado)
- **Acento Primario**: `#ff8c00` (naranja aeronáutico)
- **Acento Secundario**: `#4a90e2` (azul cielo de aviación)
- **Texto Principal**: `#f5f5f5` (blanco suave, no puro)
- **Texto Secundario**: `#a0a0a0` (gris claro)
- **Éxito**: `#10b981` (verde)
- **Advertencia**: `#f59e0b` (ámbar)
- **Error**: `#ef4444` (rojo)

### Uso
- **Acciones/CTAs**: Naranja (#ff8c00) — llamadas a inscribirse, "Empezar"
- **Enlaces/Focus**: Azul cielo (#4a90e2) — secundario pero reconocible
- **Bordes/Separadores**: `#2d3748` — sutil en fondo oscuro

## Tipografía

### Familia de Fuentes
- **Títulos (H1-H3)**: Inter, sans-serif, peso 600-700
- **Cuerpo**: Inter, sans-serif, peso 400-500
- **Código/Monoespaciada**: JetBrains Mono o Monaco

### Escala
- **H1** (Títulos de página): 3.5rem / 3.5rem line-height, weight 700
- **H2** (Subtítulos grandes): 2.25rem / 2.5rem, weight 600
- **H3** (Subsecciones): 1.5rem / 1.75rem, weight 600
- **Body**: 1rem / 1.5rem, weight 400
- **Small/Caption**: 0.875rem / 1.25rem, weight 500

### Espaciado de Letras
- Títulos: 0.5px tracking
- Cuerpo: 0px
- Labels: 1px

## Espaciado (Tailwind default, pero customizado)

```
base: 4px
xs: 8px     (0.5rem)
sm: 12px    (0.75rem)
md: 16px    (1rem)
lg: 24px    (1.5rem)
xl: 32px    (2rem)
2xl: 48px   (3rem)
3xl: 64px   (4rem)
```

Usar múltiplos de 4px, evitar espacios irregulares.

## Componentes

### Botones
- **Primario (Naranja)**: bg-orange-600, hover:bg-orange-700, py-3 px-6
- **Secundario**: bg-blue-600, hover:bg-blue-700
- **Ghost**: transparent, border, text-white, hover:bg-white/10
- **Sombra**: shadow-lg en hover para profundidad
- **Radio**: rounded-lg, nunca fully-rounded (no pills)
- **Transición**: 200ms ease-in-out

### Tarjetas
- **Fondo**: bg-slate-800/50 o bg-slate-900
- **Borde**: 1px border-slate-700
- **Radio**: rounded-lg
- **Padding**: p-6
- **Sombra**: shadow-md
- **Hover**: Elevar levemente (translate-y-(-4px)), border-blue-400/50
- **Evitar**: Tarjetas anidadas profundas (máx 2 niveles)

### Animaciones
- **Entrada**: fade-in + slide-up (300ms)
- **Hover**: scale(1.02) o translate-y(-2px), no bounce
- **Transiciones**: 200-300ms cubic-bezier(0.4, 0, 0.2, 1)
- **Evitar**: Easing bounce, animaciones infinitas en viewport normal

### Formas
- **Input/Textarea**: bg-slate-900, border-slate-700, focus:border-blue-500, focus:ring-2 ring-blue-500/30
- **Placeholder**: text-slate-500
- **Focus state**: Azul cielo con ring, no shadow naranja

### Navegación
- **Navbar**: Sticky, bg-slate-950/95 backdrop-blur, borde inferior sutil
- **Items**: texto-blanco, hover:text-orange-500
- **Mobile**: Drawer en la izquierda, no hamburguesa abajo
- **Logo**: Altura 40px, padding horizontal 1rem

## Patrones Visuales

### Gradientes
- **Hero**: Gradiente sutil azul → negro (arriba → abajo)
- **Fondos de sección**: Degradado muy sutil o fondo sólido
- **Evitar**: Púrpura-azul, múltiples colores en gradientes

### Iconografía
- **Fuente**: Lucide React (24-32px typical)
- **Color**: Naranja para acciones, blanco para estado normal
- **Espaciado**: 8px entre icono y texto

### Imágenes
- **Componente**: SmartImage (siempre con gradiente oscuro debajo)
- **Ratio**: 16:9 o 4:3 (no extremos)
- **Objeto-fit**: cover, center
- **Overlay**: Gradiente negro-transparente arriba para legibilidad de texto

## Responsive & Accesibilidad

### Breakpoints (Tailwind)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Accesibilidad
- **Contraste**: Mínimo WCAG AA (4.5:1 para texto pequeño, 3:1 para grande)
- **Focus**: Siempre visible, anillo azul de 2px
- **Alt Text**: Todas las imágenes deben tener descripción
- **Semantic HTML**: `<button>`, `<nav>`, `<main>`, `<section>`
- **ARIA**: `aria-label` en botones de icono, `aria-current` en nav activa

## Antipatrones a Evitar
- ❌ Fuentes sobrecargadas en una página (máx 2 familias)
- ❌ Texto gris sobre fondo de color (bajo contraste)
- ❌ Gradientes púrpura-azul genéricos
- ❌ Animaciones infinite bounce en la página
- ❌ Tarjetas anidadas profundas
- ❌ Colores corporativos aburridos (usar la identidad naranja/azul)
- ❌ Padding/margen inconsistente
- ❌ Botones pequeños o difíciles de clickear (mín 44x44px)

## Ejemplos de Uso

### Hero Section
- Título H1 en blanco puro, 80px
- Subtítulo H2 en gris claro, 28px
- Botón CTA primario (naranja) prominente
- Fondo: degradado azul oscuro, posible imagen de avión con overlay

### Tarjeta de Curso
- Imagen con overlay oscuro (SmartImage)
- Título H3 blanco
- Descripción en gris claro
- Precio en naranja grande
- Botón "Ver Detalles" primario
- Hover: borde azul cielo, elevarse 4px

### Formulario Multi-step
- Indicador de progreso en naranja
- Labels claros, input con focus azul
- Botón primario (siguiente) naranja
- Botón secundario (anterior) ghost
- Validación: error en rojo, éxito en verde
