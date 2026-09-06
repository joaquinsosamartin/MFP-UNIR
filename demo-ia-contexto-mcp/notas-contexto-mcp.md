# Prompt vs contexto

## Prompt
Es la instrucción directa que damos al modelo.

Ejemplo:
"Explícame por qué falla mi build".

## Contexto
Es la información adicional que el modelo puede usar para responder mejor.

Ejemplos:
- Código fuente.
- Logs.
- Dockerfile.
- package.json.
- Historial de Git.
- Issues de GitHub.
- Datos de una base de datos.
- Resultado de herramientas externas.

# Ventana de contexto

La ventana de contexto es el conjunto de información que el modelo tiene disponible durante una interacción.

Puede incluir:

- La instrucción del usuario.
- Mensajes previos de la conversación.
- Archivos seleccionados.
- Fragmentos de código.
- Logs de ejecución.
- Resultados devueltos por herramientas.

Buena práctica:
No dar solo una pregunta genérica. Aportar contexto relevante, mínimo y verificable.

# MCP: Model Context Protocol

MCP permite conectar aplicaciones de IA con sistemas externos de forma estandarizada.

## Elementos habituales

- Cliente de IA: aplicación donde interactúa el usuario.
- Modelo: razona y genera respuestas.
- Servidor MCP: expone capacidades externas.
- Resources: datos o documentos que aportan contexto.
- Tools: acciones que pueden ejecutarse.
- Prompts: plantillas o flujos predefinidos.

# Riesgos y validación en IA con herramientas

## Riesgos principales

- Exposición de secretos o credenciales.
- Acceso excesivo a información interna.
- Ejecución de comandos destructivos.
- Cambios automáticos sin revisión humana.
- Uso de herramientas incorrectas.
- Interpretación errónea de resultados.

## Buenas prácticas

- Aplicar mínimo privilegio.
- Separar herramientas de lectura y escritura.
- Pedir confirmación antes de acciones destructivas.
- Registrar las acciones ejecutadas.
- Revisar diffs antes de aplicar cambios.
- No permitir acceso innecesario a secretos.
- Validar siempre la respuesta con evidencias.


