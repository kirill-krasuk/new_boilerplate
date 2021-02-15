#!/bin/bash

bash ./bin/run_banner.sh

source ./bin/colors.sh

echo -e "${BBlack}${On_Blue} INFO ${Color_Off} Run tests"

CONFIG_PATH=./config/jest/jest.config.js

case $1 in
    w) yarn jest --env=jsdom --watch -c=$CONFIG_PATH;;
    c) yarn jest --env=jsdom --coverage -c=$CONFIG_PATH;;
    u) yarn jest --env=jsdom -u -c=$CONFIG_PATH;;
    *) yarn jest --env=jsdom -c=$CONFIG_PATH;;
esac