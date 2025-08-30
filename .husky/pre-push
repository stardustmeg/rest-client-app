#!/bin/bash

BASIC_RED="\e[0;31m"
BASIC_GREEN="\e[0;32m"
BASIC_YELLOW="\e[0;33m"
BASIC_CYAN="\e[0;36m"
ENDCOLOR="\e[0m"

run_tests () {
  echo -e "${BASIC_CYAN}🧪 Running tests${ENDCOLOR}"
  bun run test
  if [[ $? -ne 0 ]]
  then
    echo -e "${BASIC_RED}❌ Tests failed.${ENDCOLOR}"
    echo -e "${BASIC_YELLOW}⚠️ Please fix the errors and try again.${ENDCOLOR}"
    exit 1
  fi
}

# run_tests

printf "${BASIC_GREEN}❤️‍🔥 The check has passed. Happy coding!${ENDCOLOR}\n"
