# macrobuilder 🥗

Constructor visual de comidas y macros nutricionales.

## Publicar en Vercel (paso a paso)

### Requisitos previos
- Cuenta en [github.com](https://github.com) (gratis)
- Cuenta en [vercel.com](https://vercel.com) (gratis, entra con GitHub)

---

### Paso 1 — Subir el proyecto a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón verde **"New"** (esquina superior izquierda)
3. Ponle nombre: `macrobuilder`
4. Déjalo en **Public** o **Private** (ambos funcionan con Vercel gratis)
5. Haz clic en **"Create repository"**
6. En la página que aparece, verás una sección **"uploading an existing file"** — haz clic ahí
7. **Arrastra toda la carpeta `macrobuilder`** al área de upload
8. Haz clic en **"Commit changes"** (botón verde abajo)

---

### Paso 2 — Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** → elige **"Continue with GitHub"**
3. Una vez dentro, haz clic en **"Add New Project"**
4. Vercel detectará tus repos de GitHub — selecciona **macrobuilder**
5. Vercel detectará automáticamente que es un proyecto Vite/React
6. **No cambies nada** — deja todo como está
7. Haz clic en **"Deploy"**
8. Espera ~1 minuto ☕
9. Vercel te dará una URL pública como: `https://macrobuilder-tuusuario.vercel.app`

¡Listo! Tu app está publicada.

---

### Actualizar la app en el futuro

Cuando quieras cambiar algo:
1. Edita los archivos localmente
2. Ve a tu repo en GitHub
3. Sube los archivos modificados
4. Vercel redespliega automáticamente en ~30 segundos

---

## Desarrollo local (opcional)

Si quieres probarla en tu computadora antes de publicar:

```bash
# Instalar Node.js desde nodejs.org primero, luego:
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.
