#!/bin/bash

sudo mkdir /opt/unzippedWebapp
sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/unzippedWebapp
sudo systemctl enable mysqld

cd /opt/unzippedWebapp/Assignment02
sudo rm -rf node_modules

sudo touch .env
sudo echo "PORT=3000" > .env
sudo echo "DB_NAME=csye6225" >> .env
sudo echo "DB_USERNAME=root" >> .env
sudo echo "DB_PASSWORD=Hello@123" >> .env
sudo echo "DB_HOST=localhost" >> .env

sudo npm install
sudo mv /opt/unzippedWebapp/Assignment02/csye6225.service /etc/systemd/system

sudo systemctl daemon-reload
sudo systemctl enable csye6225.service
