# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "docucrm"

  # Make box accessible with direct IP.
  config.vm.network :private_network, ip: "192.168.88.20"

  # Set machine name, used as Ansible host name.
  config.vm.define "localdev"
  
  # Must match domain set in provisioning/vars.yml.
  config.vm.hostname = "docucrm.docu.test"

  config.vm.provider "virtualbox" do |vb|
    # Customize the amount of memory on the VM:
    #vb.gui = true
    vb.memory = "4096"
  end

  config.ssh.forward_agent = true

  # Configure standard synced folder to be writable by Apache. 
  config.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=775", "fmode=764"]

  # Run Ansible from the Vagrant VM
  # config.vm.provision "ansible_local" do |ansible|
  #   ansible.playbook = "provisioning/vagrant.yml"
  #   ansible.become = true
  #  ansible.compatibility_mode = "2.0"
  # end
end
