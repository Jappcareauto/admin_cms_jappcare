#!/bin/bash

RUNNER_NAME="Jappcareauto-admin_cms_jappcare.ip-172-31-40-207"

echo "Starting the runner service..."
sudo systemctl start actions.runner.${RUNNER_NAME}.service

echo "Enabling runner service to start on boot..."
sudo systemctl enable actions.runner.${RUNNER_NAME}.service

echo "Checking runner service status..."
sudo systemctl status actions.runner.${RUNNER_NAME}.service --no-pager

chmod +x runner-service.sh
./runner-service.sh
