#!/bin/bash

sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y


sleep 10

node --version