#!/bin/sh
set -e

[ "${KEYCLOAK_URL}" = "" ] && { echo "KEYCLOAK_URL is not specified"; exit 1; }
[ "${KEYCLOAK_ADMIN}" = "" ] && { echo "KEYCLOAK_ADMIN is not specified"; exit 1; }
[ "${KEYCLOAK_ADMIN_PASSWORD}" = "" ] && { echo "KEYCLOAK_ADMIN_PASSWORD is not specified"; exit 1; }

./"$HOME"/bin/kcadm.sh config credentials --server "${KEYCLOAK_URL}" --realm master --user "${KEYCLOAK_ADMIN}" --password "${KEYCLOAK_ADMIN_PASSWORD}" --client admin-cli

./"$HOME"/bin/kcadm.sh get realms/kucukdev > /dev/null || ./"$HOME"/bin/kcadm.sh create realms -f /tmp/realm-export.json
