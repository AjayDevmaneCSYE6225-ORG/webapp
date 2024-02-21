#!/bin/bash

sudo mkdir /opt/unzippedWebapp
sudo unzip -o /opt/webapp.zip -d /opt/unzippedWebapp
cd /opt/unzippedWebapp/Assignment02
sudo npm install
sudo mv /opt/unzippedWebapp/Assignment02/csye6225.service /etc/systemd/system

sudo systemctl daemon-reload
sudo systemtl enable csye6225.service
