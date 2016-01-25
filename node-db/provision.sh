#!/usr/bin/env bash

# use noninteractive mode since this is automated
# this will suppress prompts like the root password prompt
# that normally comes up when installing MySQL
export DEBIAN_FRONTEND=noninteractive

# suppress erroneous error messages from dpkg-preconfigure
rm /etc/apt/apt.conf.d/70debconf

# update the package index 
apt-get update

# install software-properties-common
# (gets us add-apt-repository command)
apt-get install -y software-properties-common

# install Node.js v5.x
curl -sL https://deb.nodesource.com/setup_5.x | bash -
apt-get install -y nodejs

# install build-essential for Node modules w/native code
apt-get install -y build-essential

# allow Node.js servers to bind to low ports
apt-get install -y chase libcap2-bin
setcap cap_net_bind_service=+ep $(chase $(which node))

# install MariaDB 10.1
apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
add-apt-repository 'deb [arch=amd64,i386] http://sfo1.mirrors.digitalocean.com/mariadb/repo/10.1/ubuntu trusty main'
apt-get update
apt-get install -y mariadb-server

# install MongoDB and tools
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org

# install recent version of redis
add-apt-repository -y ppa:rwky/redis
apt-get update
apt-get install -y redis-server

# set the loglevel for npm to show errors only
npm config set loglevel error -g

# install the tsd utility for installing
# Visual Studio Code typings files
# gives statement completion and parameter hinting
npm install -g tsd
