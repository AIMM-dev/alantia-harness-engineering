> Ejemplos de código: [code/](https://github.com/AIMM-dev/alantia-harness-engineering/blob/main/docs/es/lectures/lecture-05-why-long-running-tasks-lose-continuity/code/)
> Proyecto práctico: [Proyecto 03. Mantén al agente trabajando tras reiniciar sesiones](./../../projects/project-03-multi-session-continuity/index.md)

# Lección 05. Mantén vivo el contexto entre sesiones

> Guía de ingeniería: los umbrales son valores didácticos ajustables, no límites demostrados. Los tokens dependen del tokenizador y del contenido, no solo de las líneas.

Le pides a Claude Code que implemente una funcionalidad completa. Se ejecuta durante 30 minutos, hace la mayor parte del trabajo, pero el contexto se está agotando. Inicias una nueva sesión para continuar — y descubres que no recuerda qué decisiones se tomaron la última vez, por qué se eligió la opción A sobre la B, qué archivos ya fueron modificados o en qué estado están las pruebas. Dedica 15 minutos a re-explorar el proyecto, y podría ser inconsistente con el enfoque anterior.

Imagina si fueras un artesano que olvida todo cada mañana al despertar. Tendrías que volver a familiarizarte con todo el sitio de construcción — qué pared está a medio construir, por qué se eligieron ladrillos rojos en lugar de azules, dónde llegaron las tuberías. Peor aún, podrías arrancar una ventana que ya fue instalada ayer, simplemente porque no recordabas que ya estaba hecha.

Esta es exactamente la dificultad que enfrentan los agentes de codificación con IA en tareas entre sesiones. Esta lección explica por qué los agentes "se quedan en blanco" durante tareas largas, y cómo la persistencia estructurada del estado puede hacerlos como un artesano que lleva un diario confiable — sigue siendo amnésico, pero el diario lo recuerda todo.

## Las ventanas de contexto no son infinitas

Las ventanas de contexto son finitas. Esto no se resuelve con actualizaciones de modelos — incluso si los tamaños de ventana crecen a 1M tokens, las tareas complejas seguirán agotándolas. Porque los agentes no solo están generando código; están entendiendo bases de código, rastreando su propio historial de decisiones, procesando la salida de herramientas y manteniendo el contexto de conversación. Toda esta información crece más rápido que la expansión de la ventana.

Un problema más profundo: la información que produce el agente no tiene la misma importancia. Los pasos de razonamiento intermedio contienen el "por qué" de las decisiones — por qué se eligió la opción B sobre la A, por qué esta biblioteca en lugar de aquella, por qué se omitió una optimización particular. La salida final solo contiene el "qué" — el código en sí. Las estrategias de compactación suelen preservar lo segundo pero pierden lo primero. La siguiente sesión ve el código pero no sabe por qué está escrito de esa manera, y podría "optimizar" una decisión de diseño deliberada.

Anthropic descubrió algo fascinante en su investigación de agentes de larga duración: cuando los agentes perciben que el contexto se está agotando, exhiben un comportamiento de "convergencia prematura" — apresurándose a terminar el trabajo actual, saltando pasos de verificación o eligiendo una solución simple sobre la óptima. Es como darse cuenta de que se está acabando el tiempo en un examen y adivinar rápidamente las preguntas de opción múltiple restantes. Anthropic llama a esto "ansiedad de contexto."

## Flujo de continuidad entre sesiones

Sin artefactos de continuidad, cada nueva sesión es un desastre:

```mermaid
flowchart LR
    S1["Sesión 1<br/>función a medio terminar"] --> End1["El contexto está casi lleno<br/>termina la sesión"]
    End1 --> S2["La sesión 2 empieza desde cero"]
    S2 --> Guess["Volver a leer archivos y ejecutar pruebas,<br/>deducir las decisiones del código"]
    Guess --> Drift["Se repite trabajo<br/>y retomar cuesta tiempo"]
```

Con artefactos de continuidad, las nuevas sesiones pueden retomar rápidamente:

```mermaid
flowchart LR
    Work["Trabajo de la sesión 1"] --> Progress["PROGRESS.md<br/>terminado / en curso / próximo paso"]
    Work --> Decisions["DECISIONS.md<br/>por qué se eligió este enfoque"]
    Work --> Verify["Notas de verificación<br/>qué pruebas pasan y cuáles fallan"]
    Work --> Commit["Punto de control de Git<br/>estado exacto del repositorio"]

    Progress --> Rebuild["Reconstrucción en la sesión 2"]
    Decisions --> Rebuild
    Verify --> Rebuild
    Commit --> Rebuild

    Rebuild --> Resume["La nueva sesión retoma el trabajo rápidamente"]
```

## Conceptos clave

- **Las ventanas de contexto son finitas**: No importa qué tamaño de ventana se reclame (128K, 200K, 1M), las tareas largas eventualmente las agotarán. Tras el agotamiento, se requiere compactación (perdiendo información) o reset (nueva sesión). Ambas pierden algo.
- **Artefactos de continuidad**: Archivos de estado persistido que permiten a una nueva sesión retomar sin ambigüedad donde la anterior lo dejó. La forma básica: registro de progreso + registro de verificación + próximas acciones. Ese diario del artesano.
- **Costo de reconstrucción**: El tiempo que una nueva sesión necesita para alcanzar un estado ejecutable. Los buenos harness pueden comprimir el costo de reconstrucción de 15 minutos a 3 minutos.
- **Deriva (Drift)**: La brecha entre la comprensión del agente y el estado real del repositorio de código. Cada límite de sesión introduce deriva; sin control, se acumula.
- **Ansiedad de contexto**: Un fenómeno observado por Anthropic — los agentes exhiben un comportamiento de convergencia prematura cuando se acercan a los límites de contexto percibidos, terminando tareas temprano para evitar pérdida de información. Es una ansiedad irracional por los recursos.
- **Compactación vs reset**: La compactación resume el contexto dentro de la misma sesión (conserva el "qué," puede perder el "por qué"); el reset abre una nueva sesión reconstruyendo desde artefactos persistidos (limpio pero depende de la completitud de los artefactos).

## Qué sucede cuando se rompe la continuidad

La sesión anterior gastó un presupuesto significativo de contexto analizando tres enfoques y eligiendo la opción B. El agente de esta sesión no conoce ese análisis y podría volver a decidir basándose en información incompleta — potencialmente eligiendo la opción A. Como el artesano amnésico que no recuerda por qué se eligieron los ladrillos rojos, mira los azules hoy y piensa que son más bonitos, y derriba la pared de ayer para reconstruirla.

Peor aún es el trabajo duplicado. El agente no está seguro de si cierto trabajo ya fue completado y lo hace de nuevo. O peor — hace la mitad, descubre un conflicto con la implementación existente y tiene que rehacerlo. En un sitio de construcción, dos equipos no pueden construir la misma pared simultáneamente — pero sin registros de progreso, el nuevo equipo no tiene idea de que alguien ya está trabajando en ella.

A lo largo de varias sesiones, la dirección de implementación puede haberse desviado silenciosamente de los requisitos originales. Cada nueva sesión tiene una comprensión ligeramente diferente de los objetivos del proyecto. Como un juego de teléfono roto — después de que diez personas pasan el mensaje, "recógeme un café" podría convertirse "cómprame una cafetera."

También está la brecha de verificación. Los resultados de verificación de la sesión anterior (qué pruebas pasan, cuáles fallan, por qué fallan) no fueron registrados. La nueva sesión tiene que volver a ejecutar toda la verificación para entender el estado actual. Cada sesión vuelve a diagnosticar desde cero, desperdiciando contexto precioso cada vez.

Tanto OpenAI como Anthropic enfatizan la persistencia estructurada del estado en su documentación. El artículo de ingeniería de harness de OpenAI trata el repositorio como un "registro operativo" — los resultados de cada operación deberían dejar evidencia rastreable en el repositorio. La documentación de agentes de larga duración de Anthropic recomienda específicamente "archivos de traspaso" — documentos estructurados que contienen el estado actual, problemas conocidos y próximas acciones.

## Un diario para el artesano amnésico

Enfoque central: **Trata al agente como un ingeniero brillante con amnesia.** Antes de que "termine su turno," debe escribir información crítica para que el agente del siguiente "turno" pueda retomar rápidamente.

**Herramienta 1: Archivo de progreso (PROGRESS.md).** El artefacto de continuidad más básico — el núcleo del diario:

```markdown
# Progreso del proyecto

## Estado actual
- Último commit: abc1234 (feat: añadir endpoint de preferencias)
- Pruebas: 42/43 pasan (falla test_pagination_edge_case)
- Lint: pasa

## Terminado
- [x] Modelo de usuario y migración de la base de datos
- [x] Endpoints CRUD básicos
- [x] Integración del middleware de autenticación

## En curso
- [ ] Paginación (90 %: falla la prueba de un caso límite)

## Problemas conocidos
- test_pagination_edge_case devuelve 500 con resultados vacíos
- Falta confirmar si los usuarios eliminados deben aparecer en los listados

## Próximos pasos
1. Corregir el caso límite de paginación
2. Añadir el parámetro de consulta para incluir usuarios eliminados
3. Actualizar la documentación de la API
```

**Herramienta 2: Registro de decisiones (DECISIONS.md).** Registra decisiones de diseño importantes y sus razones. No necesitas documentos de diseño detallados — solo "qué decisión, por qué, cuándo" — las notas en el diario:

```markdown
# Decisiones de diseño

## 2024-01-15: Usar Redis para almacenar preferencias de usuario en caché
- Motivo: alta frecuencia de lectura (en cada llamada a la API), pocos datos
- Alternativa descartada: vista materializada de PostgreSQL (los cambios frecuentes no justifican el costo de mantenimiento)
- Restricción: TTL de caché de 5 minutos e invalidación activa al escribir
```

**Herramienta 3: Commits de git como puntos de control.** Haz commit después de completar cada unidad atómica de trabajo. Los mensajes de commit deberían explicar qué se hizo y por qué. Estos son snapshots de estado gratuitos y automáticamente versionados.

**Herramienta 4: init.sh o flujo de inicialización del harness.** Especifica en `AGENTS.md` las rutinas de "entrada" y "salida":

```markdown
## Al comenzar la sesión
1. Leer PROGRESS.md para conocer el estado actual
2. Leer DECISIONS.md para conocer las decisiones importantes
3. Ejecutar make check para comprobar la consistencia del repositorio
4. Continuar desde «Próximos pasos» en PROGRESS.md

## Antes de cerrar la sesión
1. Actualizar PROGRESS.md
2. Ejecutar make check para comprobar la consistencia
3. Guardar todo el trabajo terminado en un commit
```

**Estrategia mixta**: No todas las tareas necesitan un reset de contexto. Las tareas cortas (menos de 30 minutos) pueden completarse dentro de una sesión. Las tareas largas (que abarcan sesiones) deben usar archivos de progreso y registros de decisiones para la continuidad. Criterio de decisión: si una tarea necesita más del 60% de la ventana, comienza a preparar la entrega.

### Profundización en la ansiedad de contexto

La investigación de marzo de 2026 de Anthropic reveló además las manifestaciones específicas de la ansiedad de contexto: en Sonnet 4.5, cuando el contexto se acerca al límite de la ventana, el agente muestra un fuerte comportamiento de "convergencia prematura." Es como darse cuenta de que casi se acaba el tiempo en un examen y llenar rápidamente respuestas aleatorias en las opciones múltiples.

Dos estrategias abordan esto:

**Compactación**: Resumir la conversación temprana dentro de la misma sesión. Ventaja: mantiene la continuidad, el agente puede ver el "qué." Desventaja: el "por qué" se pierde a menudo en los resúmenes — por qué se eligió la opción B sobre la A, por qué se omitió una optimización particular. Más críticamente, la compactación no elimina la ansiedad de contexto — el agente sabe que el contexto fue grande alguna vez, y psicológicamente todavía tiende a apresurarse hacia el cierre.

**Reset de contexto**: Limpiar completamente el contexto, abrir una nueva sesión, reconstruir desde artefactos persistidos. Ventaja: estado mental limpio — la nueva sesión no tiene la ansiedad de "se me está acabando el tiempo." Desventaja: depende de la completitud de los artefactos de entrega. Si el diario falta información crítica, la nueva sesión puede perder tiempo yendo en la dirección equivocada.

Datos reales de Anthropic: para Sonnet 4.5, la ansiedad de contexto es lo suficientemente severa que la compactación por sí sola no es suficiente — el reset de contexto se convierte en un componente crítico del diseño del harness. Pero para Opus 4.5, este comportamiento está muy reducido, y la compactación puede gestionar el contexto sin depender de resets. Esto significa: **el diseño del harness necesita un entendimiento específico del modelo objetivo, no una plantilla de talla única.**

> Fuente: [Anthropic: Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)

## Anthropic: relevo entre sesiones de programación

Anthropic describe una réplica del sitio de Claude cuyo agente inicializador definió más de 200 funciones, marcadas inicialmente como no superadas. También creó init.sh, un archivo de progreso y un commit inicial. Las sesiones posteriores leían el progreso y el historial de Git, implementaban funciones de forma incremental, verificaban el comportamiento y dejaban actualizaciones para la siguiente sesión.

El caso documenta un mecanismo de continuidad, no los porcentajes de finalización, defectos o reconstrucción citados anteriormente aquí. El código complementario es una simulación didáctica, no una medición del modelo.

[Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

LangChain informa de una mejora de 52,8% a 66,5%, 13,7 puntos porcentuales, usando el mismo gpt-5.2-codex en Terminal Bench 2.0, con 89 tareas. Cambió las instrucciones de verificación, middleware y gestión del contexto. Es el resultado conjunto de varios cambios del harness, no solo de archivos de progreso. [LangChain: Improving Deep Agents](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)

## Ideas clave

- Las ventanas de contexto son un recurso finito. Las tareas largas abarcarán sesiones, y las sesiones perderán información — como el artesano que olvida cada día, esto es una realidad objetiva.
- La solución no son ventanas más grandes — es mejor persistencia del estado. Archivos de progreso + registros de decisiones + puntos de control de git — dale al artesano amnésico un diario confiable.
- Trata al agente como un ingeniero con amnesia: antes de "terminar el turno," escribe qué se hizo, por qué y qué sigue.
- El costo de reconstrucción es la métrica clave. Los buenos harness deberían llevar a las nuevas sesiones a un estado ejecutable en menos de 3 minutos.
- Estrategia mixta: tareas cortas dentro de las sesiones, tareas largas con artefactos estructurados para la continuidad.

## Lecturas adicionales

- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
- [Claude Code Documentation](https://docs.anthropic.com/es/docs/claude-code)
- [HumanLayer: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)

- [LangChain: Improving Deep Agents](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)

## Ejercicios

1. **Medición de pérdida de continuidad**: Elige una tarea de desarrollo que necesite al menos 3 sesiones. Sin proporcionar ningún artefacto de continuidad, registra al inicio de cada sesión cuánto contexto gasta el agente en "averiguar qué pasó la última vez." Después de cada sesión, crea un archivo de progreso y deja que la siguiente sesión comience desde él. Compara los costos de reconstrucción con y sin archivos de progreso.

2. **Diseño de plantilla de entrega**: Diseña una plantilla de entrega mínima con cuatro campos: estado del repositorio (commit hash), estado de ejecución (tasa de aprobación de pruebas), bloqueadores, próximas acciones. Deja que una sesión de agente completamente nueva restaure el estado del proyecto usando solo esta plantilla. Registra las ambigüedades encontradas durante la restauración, itera para mejorar la plantilla.

3. **Experimento de estrategia mixta**: En una tarea de desarrollo de 5 sesiones, compara tres estrategias: (a) siempre iniciar sesiones nuevas + archivos de progreso, (b) hacer lo más posible en una sesión (compactación de contexto), (c) estrategia mixta (tareas cortas dentro de la sesión, tareas largas entre sesiones + archivos de progreso). Compara tiempo de reconstrucción, tasa de completitud de funcionalidades y consistencia de decisiones.
