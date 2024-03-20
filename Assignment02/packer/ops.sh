#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo mv /opt/unzippedWebapp/Assignment02/config.yaml /etc/google-cloud-ops-agent/config.yaml

sudo systemctl restart google-cloud-ops-agent