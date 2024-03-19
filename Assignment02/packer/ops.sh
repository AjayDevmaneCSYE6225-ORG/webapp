#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo mv /tmp/config.yml /etc/google-cloud-ops-agent/config.yml

sudo chown -R csye6225:csye6225 /var/log/

sudo chmod -R 775 /etc/google-cloud-ops-agent/config.yml

sudo systemctl restart google-cloud-ops-agent