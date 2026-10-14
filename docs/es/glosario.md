# Glosario: los términos que sí conviene conservar

Usamos español para explicar las ideas y conservamos un término en inglés cuando identifica una herramienta, un concepto técnico preciso o una convención habitual de desarrollo.

| Término | Qué significa en este curso |
| --- | --- |
| **Harness** | El entorno que rodea al modelo: instrucciones, herramientas, estado, límites y verificación. No lo traducimos como «arnés», porque aquí designa un sistema de ingeniería. |
| **Harness Engineering** | El diseño y la mejora de ese entorno para que un agente produzca resultados verificables. |
| **Prompt** | La instrucción o el conjunto de instrucciones que recibe el modelo. |
| **Token** | La unidad de texto que procesa el modelo; no equivale siempre a una palabra. |
| **Skill** | Un paquete de instrucciones y recursos reutilizables para una tarea específica. |
| **Hook** | Una acción que se ejecuta cuando ocurre un evento del sistema. |
| **Runtime** | El entorno o los mecanismos que operan durante la ejecución. Cuando hablamos del momento de ejecución, lo decimos en español. |
| **API / SDK / CLI** | Interfaz de programación, kit de desarrollo e interfaz de línea de comandos. Conservamos sus siglas habituales. |
| **Commit** | Un registro de cambios en Git. |
| **Pull request** | Una propuesta de cambios para revisar e integrar en un repositorio. |
| **Branch / worktree** | Una rama de Git y un directorio de trabajo asociado a una rama o revisión. |
| **Lint** | La comprobación automática de reglas de estilo y posibles problemas en el código. |
| **End-to-end (E2E)** | Una prueba de extremo a extremo que recorre el flujo completo. |
| **Benchmark** | Una evaluación comparativa con tareas y condiciones definidas. Sus resultados no se generalizan automáticamente a cualquier proyecto. |
| **Sandbox** | Un entorno aislado con permisos y recursos limitados. |
| **Checkpoint** | Un punto de control desde el que se puede verificar o recuperar el trabajo. |
| **Rollback** | Volver a un estado anterior conocido. |
| **Maker-checker** | Separación entre quien produce un resultado y quien lo verifica. |
| **MCP** | Model Context Protocol: un protocolo para conectar modelos y herramientas. |

## Preferencias de esta edición

Preferimos **agente**, **flujo de trabajo**, **ciclo**, **traspaso de sesión**, **lista de verificación**, **prueba**, **referencia inicial** y **definición de terminado** a sus equivalentes en inglés cuando no aportan precisión adicional.

Los nombres de archivos, variables, comandos, interfaces y opciones de las herramientas conservan su forma original. Por ejemplo, `session-handoff.md`, `feature_list.json`, `npm run test` y `AGENTS.md` deben seguir siendo copiables y ejecutables. Los fragmentos de código de referencia mantienen sus identificadores y mensajes originales cuando forman parte del ejemplo.

## Qué es una verificación suficiente

Una afirmación de éxito debe estar respaldada por una comprobación relevante para la tarea. El agente puede ayudar a generar pruebas, pero no debe cambiar las condiciones de éxito para hacer pasar su propia solución.

[Comenzar la primera lección](./lectures/lecture-01-why-capable-agents-still-fail/) · [Consultar las plantillas](./resources/templates/)
