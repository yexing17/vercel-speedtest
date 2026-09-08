# Vercel Speed Test

[English](README.md) · [简体中文](README.zh-CN.md) · **Español** · [日本語](README.ja.md) · [Português](README.pt-BR.md)

Una prueba de velocidad de Internet de código abierto y respetuosa con la privacidad, ejecutada **completamente en Vercel**. Mide latencia, jitter y velocidades de descarga y subida entre el navegador y el despliegue de Vercel que sirve la página.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## Características

- Arquitectura Vercel pura: sin Cloudflare, Speedtest.net, VPS externo, base de datos ni proveedor externo de pruebas.
- Medición de ping y jitter.
- Pruebas de descarga y subida con múltiples conexiones.
- Información de la región de Vercel.
- Duración, concurrencia, tamaño de bloque y límites de tráfico configurables.
- Aviso previo del consumo máximo y límites estrictos de tráfico.
- Temas claro y oscuro, detección del tema del sistema y preferencia guardada.
- Interfaz adaptable a escritorio y móvil.
- Sin almacenamiento persistente de resultados ni analítica de terceros.
- Frontend estático y Vercel Functions sin proceso de compilación.

## Cómo funciona

El navegador se comunica únicamente con el mismo despliegue de Vercel:

```text
Browser
  ├─ /api/ping      latencia + jitter
  ├─ /api/download  bloques binarios
  ├─ /api/upload    bloques POST binarios
  └─ /api/info      región del despliegue
```

El cliente utiliza varias solicitudes pequeñas con un límite de tiempo y un presupuesto de tráfico. Cada fase termina cuando alcanza cualquiera de los dos límites, permitiendo medir el rendimiento sin dejar el consumo de ancho de banda abierto.

## Despliegue

Utiliza el botón **Deploy with Vercel** de arriba. No se requieren variables de entorno.

También puedes usar la CLI:

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

## Notas sobre precisión

El proyecto mide la ruta entre el navegador y la infraestructura de Vercel que sirve el despliegue. No pretende reproducir exactamente Ookla, Cloudflare Speed Test, pruebas de laboratorio del ISP ni una prueba directa contra un VPS concreto. La planificación del navegador, ubicación de Functions, arranques en frío, congestión, límites del plan y enrutamiento de Vercel pueden afectar los resultados.

Para resultados más estables, realiza varias pruebas con la misma configuración.

## Uso de Vercel y tráfico

Las pruebas de velocidad transfieren cantidades importantes de datos. Antes de empezar, la interfaz muestra el máximo de descarga, subida y tráfico total. El motor aplica estos límites y cada fase se detiene al alcanzar el límite de tráfico o el límite de tiempo.

La configuración predeterminada permite hasta **128 MiB de descarga + 32 MiB de subida = 160 MiB de carga útil por prueba**. El uso real puede ser menor. Los operadores de instancias públicas deberían vigilar el uso de Vercel y elegir límites adecuados para su plan.

## Privacidad

La aplicación no almacena resultados, no requiere cuentas y no incluye analítica de terceros. La preferencia del tema se guarda localmente en el navegador. Vercel puede procesar metadatos normales de las solicitudes como parte de sus operaciones de alojamiento.

## Contribuciones

Issues y Pull Requests son bienvenidos. Las áreas útiles incluyen precisión, accesibilidad, localización, experiencia móvil, perfiles de prueba, controles contra abuso y visualización de regiones de Vercel.

## Licencia

MIT © yexing17
