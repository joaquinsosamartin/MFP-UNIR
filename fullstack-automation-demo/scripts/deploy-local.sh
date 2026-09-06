#!/usr/bin/env bash

# Script de despliegue local para un proyecto Full Stack sencillo.
# Hace validaciones básicas, instala dependencias de la API, ejecuta tests
# y arranca la API para poder probar el frontend estático en local.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
API_DIR="${PROJECT_ROOT}/api"
FRONTEND_FILE="${PROJECT_ROOT}/frontend/index.html"

log() {
  printf '\n[%s] %s\n' "$1" "$2"
}

fail() {
  printf '\n[ERROR] %s\n' "$1" >&2
  exit 1
}
trap 'fail "Falló el comando: ${BASH_COMMAND} (línea ${LINENO})"' ERR

check_requirements() {
  # Validación de comandos requeridos antes de ejecutar pasos de npm.
  command -v node >/dev/null 2>&1 || fail "Node.js no está disponible en el PATH."
  command -v npm >/dev/null 2>&1 || fail "npm no está disponible en el PATH."
}

check_structure() {
  # Validación básica de estructura esperada del proyecto.
  [ -d "$API_DIR" ] || fail "No existe la carpeta api en: $API_DIR"
  [ -f "${API_DIR}/package.json" ] || fail "No existe api/package.json"
  [ -f "$FRONTEND_FILE" ] || fail "No existe frontend/index.html"
}

install_dependencies() {
  log "INFO" "Instalando dependencias de la API..."

  if [ -f "${API_DIR}/package-lock.json" ]; then
    log "INFO" "Se detectó package-lock.json. Usando npm ci..."
    npm ci
  else
    log "INFO" "No se detectó package-lock.json. Usando npm install..."
    npm install
  fi
}

run_tests() {
  log "INFO" "Ejecutando pruebas de la API..."
  npm test
}

show_frontend_instructions() {
  cat <<EOF

[INFO] Pruebas completadas correctamente.
[INFO] El frontend estático está en:
       $FRONTEND_FILE
[INFO] Para abrirlo en un navegador, usa un servidor estático o abre index.html directamente.
[INFO] Ejemplos:
       - Abrir el archivo frontend/index.html manualmente en tu navegador
       - Levantar un servidor estático desde la carpeta frontend con tu herramienta preferida
[INFO] Iniciando la API...

EOF
}

start_api() {
  # Se usa exec para que el proceso de Node.js quede en primer plano y muestre sus logs.
  exec npm start
}

main() {
  check_requirements
  check_structure

  log "INFO" "Proyecto detectado en: $PROJECT_ROOT"

  cd "$API_DIR"
  install_dependencies
  run_tests
  show_frontend_instructions
  start_api
}

main "$@"
