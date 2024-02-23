#!/bin/bash

sudo dnf -y install expect
sudo dnf install -y mysql-server
sudo systemctl enable mysqld
sudo systemctl start mysqld.service
sudo systemctl status mysqld

ROOT_PASSWORD="Hello@123"

expect << EOF
spawn sudo mysql_secure_installation

expect "Press y|Y for Yes, any other key for No:"
send "y\r"

expect "Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:"
send "2\r"

expect "Enter password for user root:"
send "${ROOT_PASSWORD}\r"

expect "Re-enter new password:"
send "${ROOT_PASSWORD}\r"

expect "Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) :"
send "y\r"

expect "Remove anonymous users?"
send "y\r"

expect "Disallow root login remotely?"
send "y\r"

expect "Remove test database and access to it?"
send "y\r"

expect "Reload privilege tables now?"
send "y\r"

expect eof
EOF

sudo systemctl restart mysqld
sleep 10

PORT=3000
DB_NAME="csye6225"
DB_USERNAME="root"
DB_HOST="localhost"

# sudo mysql -h $DB_HOST --port $PORT -u $DB_USERNAME -p $ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

mysql --user="$DB_USERNAME" --password="$ROOT_PASSWORD" --host="$DB_HOST" --port="$PORT" --execute="CREATE DATABASE IF NOT EXISTS $DB_NAME;"