#!/bin/bash

sudo mkdir /opt/unzippedWebapp
sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/unzippedWebapp
sudo mv /tmp/.env /opt/unzippedWebapp/Assignment02
sudo systemctl enable mysqld

cd /opt/unzippedWebapp/Assignment02
sudo rm -rf node_modules

sudo npm install
sudo mv /opt/unzippedWebapp/Assignment02/csye6225.service /etc/systemd/system

sudo systemctl daemon-reload
sudo systemctl enable csye6225.service
