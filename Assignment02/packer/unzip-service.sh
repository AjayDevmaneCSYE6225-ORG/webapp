#!/bin/bash

sudo mkdir tmp/unzippedWebapp
sudo unzip -o tmp/webapp.zip -d tmp/unzippedWebapp
sudo mv tmp/unzippedWebapp/Assignment02/csye6225.service /etc/systemd/system

sudo systemctl daemon-reload
sudo systemtl enable csye6225.service
