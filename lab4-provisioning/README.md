# Lab 4: Provisioning

We've had the chance to set up a local virtual machine using Vagrant and a 
remote instance on Digital Ocean. You may have noticed that we had to run
the same steps for setting up both machines to host our solutions. That's
fine if our site only runs on a couple of machines, though wouldn't it be nice
if we were able to set up a machine with just a single or a few simple steps?

There are other, more critical reasons to use provisioning tools. When we want
to scale up the site to hundreds or even thousands of machines, we don't want 
to run all of those setup and installation commands for each instance. It is
common to see automated setup scripts and workflows in the industry that allow
us to deploy sites and a massive scale.

A provisioning script separates the base VM 
image from the application software you need to put on top of it. This keeps 
things flexible. You can migrate to using Ubuntu 16.04 once it’s released,
but still run your same provisioning script to configure it (assuming they 
don't make any backwards-incompatible changes in 16.04!). If you created a new 
pre-configured image using Packer, you’d have to rebuild that once Ubuntu 16.04
is released.
 
In this lab we will build a provisioning script that will setup your Vagrant VM
and remote VM on AWS for the authentication challenge. You can use these
resources throughout the lab as reference:

- https://www.vagrantup.com/docs/getting-started/provisioning.html
- https://www.vagrantup.com/docs/provisioning/index.html

## Part I: Shell Scripts

Shell scripts are powerful little programs that allow us to write bash code in
a file that can be executed later. Let's start by creating a simple script
`provision.sh` in the lab4 folder of your class code repo and add the 
following code to it:

```bash
#!/usr/bin/env bash

# Provisioning script for the authentication challenge.
echo "Hello, world!"
```

To run this script, we should run `vagrant up` in this folder and get our
VM up and running. Remember, we want to run these provisioning scripts on our
virtual machines and not on our main machine. Once your vagrant VM is running,
run `vagrant ssh` then `cd /vagrant`. Typing `ls` should reveal your
provisioning script. You can run it by typing `bash provision.sh`. You should
see the message appear on the console window!

Great! We now have a very basic shell script that prints something to the
the standard output. That's not very useful though, so lets actually make our
script do useful stuff!

## Part II: Package Installation and Setup

We will do this part together in class. Our script should basically look
like this: https://github.com/drstearns/info344-class-code/blob/master/node-intro/provision.sh

## Part III: Automate Further with Vagrant

Okay! So we completed writing our provisioning script and it works, now what
if we could just have Vagrant run it automatically for us every time we create
our VM on a new development machine? Let's open up `Vagrantfile` in this
directory and go to line 71. There should be a comment above it explaining what
it does - essentially we're pointing Vagrant to our provisioning script so that
it could run it when we run `vagrant up`. Uncomment line 71 and we should be
good!

How do we test this? Remember that Vagrant only runs the provisioning script
on the first time we create our virtual machine. Since we have a virtual
machine running already, we will have to destroy it first and then recreate it.

Run these commands:
1. `exit` to exit from our VM 
2. `vagrant halt`
3. `vagrant destroy`
4. `vagrant up`

That last command should also cause vagrant to execute your provisioning script.
Verify this by running `vagrant ssh` to get into your VM and running `node`.
If you're inside of the Node interactive shell, then our script probably worked!

## Part IV: Running Provisioning on a Remote VM

You can use your provisioning script not only to provision a Vagrant VM, but also your production VM.
To run it against a new VM, use ssh:

`ssh root@ip-address "bash -s" < provision.sh`

This connects to the server as the `root` account and executes the script.
If you don't have root access to the VM, but instead access the VM with a non-root
account that has `sudo` privileges, then use `sudo` when running bash so that
your script can install new software on the VM:

`ssh some-sudo-user@ip-address "sudo bash -s" < provision.sh`

## Part V: Industry Solutions (optional)

Shell scripts are easy and quick to write, but they are fairly limited when we
want to scale up to much larger sites. If you would like to learn more about
more resilient and scalable industry solutions to provisioning, check out these
products and companies:

- [Chef](https://www.chef.io/)
- [Puppet](https://puppetlabs.com/)
- [Ansible](http://www.ansible.com/)
