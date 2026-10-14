# Plantilla de objetivo para un ciclo

> Describe el objetivo con esta estructura y entrégalo a un agente implementador o a una herramienta compatible con objetivos persistentes.
> Cuanto más específico y verificable sea, más fácil será controlar la ejecución.

## Objetivo

Implementar la función XX con pruebas unitarias que cubran sus comportamientos relevantes.

## Criterios de aceptación

Condiciones verificables que deben acordarse antes de implementar:

- [ ] `npm test` termina sin fallos.
- [ ] La cobertura del módulo XX alcanza el umbral acordado; por ejemplo, 80%.
- [ ] `npm run lint` no reporta errores.
- [ ] `npx tsc --noEmit` pasa.
- [ ] El código nuevo respeta las convenciones del proyecto.

El umbral de cobertura es un ejemplo, no una garantía de calidad. Ajusta los comandos y criterios al proyecto.

## Alcance

### Se puede modificar

- Los archivos de `src/xx/`.
- Las pruebas de `tests/`.
- Las definiciones de tipos relacionadas.

### Fuera de alcance

- El punto de entrada `src/main.ts`.
- Las migraciones del esquema de base de datos.
- Las versiones en `package.json`, salvo necesidad explícita.
- La configuración de CI/CD.

## Método de verificación

1. Después de implementar, ejecuta en orden:
   1. `npx tsc --noEmit`: comprobación de tipos.
   2. `npm run lint`: convenciones del código.
   3. `npm test`: pruebas unitarias.
   4. `npx vitest --coverage`: cobertura.
2. Corrige los fallos antes de avanzar.
3. Cuando todo pase, ejecuta las pruebas de extremo a extremo disponibles.

## Condiciones de parada

- Todos los criterios de aceptación se cumplen.
- Se alcanza el límite acordado: por ejemplo, 20 turnos.
- No hay progreso durante tres rondas consecutivas.
- Aparece un bloqueo que requiere información, permisos o intervención humana.

## Forma de trabajar

1. Lee `AGENTS.md` y `feature_list.json`.
2. Explica el enfoque antes de modificar código.
3. Verifica cada subtarea terminada.
4. Si no avanzas durante dos rondas, cambia de enfoque o reduce el problema.
5. Actualiza el progreso al final de cada ronda.
