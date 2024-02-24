#!/bin/bash

sudo mkdir /opt/unzippedWebapp

sudo groupadd csye6225
sudo useradd -g csye6225 csye6225

sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/unzippedWebapp
sudo chown -R csye6225:csye6225 /opt/unzippedWebapp/Assignment02
sudo mv /tmp/.env /opt/unzippedWebapp/Assignment02

sudo systemctl enable mysqld

cd /opt/unzippedWebapp/Assignment02
sudo rm -rf node_modules

sudo npm install
sudo mv /opt/unzippedWebapp/Assignment02/csye6225.service /etc/systemd/system

sudo systemctl daemon-reload
sudo systemctl enable csye6225.service
