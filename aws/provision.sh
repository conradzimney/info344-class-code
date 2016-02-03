#!/usr/bin/env bash

# use noninteractive mode since this is automated
# this will suppress prompts like the root password prompt
# that normally comes up when installing MySQL
export DEBIAN_FRONTEND=noninteractive

# suppress erroneous error messages from dpkg-preconfigure
rm /etc/apt/apt.conf.d/70debconf

# update the package index 
apt-get update

# install git
apt-get install -y git

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

# set the loglevel for npm to show errors only
npm config set loglevel error -g

# install the tsd utility for installing
# Visual Studio Code typings files
# gives statement completion and parameter hinting
npm install -g tsd

# install the PM2 utility for starting
# node servers in the background
npm install -g pm2
