DOCU CRM  
----------------------------- 


Deploying with Ansible
------------------------------

Before you start:

# make sure you have a valid keyfile `id_rsa` in your vagrants home directory: `~/.ssh/id_rsa` and its chmoded to `600` otherwise it will not work.
# the `deploy` user on the target server needs write access to the `builds` folder on target server's deploy directory.

You can deploy with those commands:

start and go into vagrant provisioning directory

	vagrant up
	vagrant ssh
	cd /vagrant/provisioning

start deploying

	ansible-playbook -i {rule}_{brand}.ini deploy.yml

replace `{rule}` with `stg` for staging or `prod` for production

replace `{brand}` with `ch`, `cz`, `at` or `de`

Local development with Vagrant
------------------------------

# Install [Virtualbox][vbox-dl]
# Install [Vagrant 2.x][vagrant-dl]
#  Add this line to your `/etc/hosts` file: 192.168.88.20 docucrm.docu.test

# Run `vagrant up --provision` and then the following:

#commands

`vagrant ssh`
password: vagrant

`sudo -i`

`apt-get update`
`apt-get upgrade`
`add-apt-repository ppa:ondrej/php`
`apt-get update`
`apt-get install php php-mysql php-gettext php-mbstring php-xdebug libapache2-mod-php  php-dev php-soap`
`apt-get install php-dev build-essential php-pear libaio1 php-xml php-soap php-curl -y`
`a2enmod php7.0`
`service apache2 restart`

# Install MSSSQL

`pear install --nodeps MDB2_Driver_mssql`
`apt install php-odbc php-sybase -y`

`systemctl restart apache2`

# Oracle client installation

First prerequirements are a working apache2 and php7.2 (Ubunti 18.04) environement.

Download the basic (like instantclient-basic-linux.x64-12.2.0.1.0.zip) and the sdk (instantclient-sdk-linux.x64-12.2.0.1.0.zip) package from the Oracle Website 
http://www.oracle.com/technetwork/database/database-technologies/instant-client/downloads/index.html

Upload both files to your webserver, you can use WinSCP for it
Unzip both files on server, in my case, you will get a new folder named "instantclient_12_2"

# Create destination folder

mkdir /opt/oracle

# Move and rename the instantclient folder

mv instantclient_12_2 /opt/oracle/instantclient

# Change rights on folder

chown -R root:www-data /opt/oracle

# Check if you have the required packages for installing OCI8
apt install php7.2-dev php-pear build-essential libaio1

# Create necessary soft links
ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so

ln -s /opt/oracle/instantclient/libocci.so.12.1 /opt/oracle/instantclient/libocci.so

# Add instant client to ld config files

echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient

# Update Dynamic Linker Run-Time Bindings

ldconfig

# Now install OCI8 by pecl

pecl install oci8

# The OCI8 installation is asking you for the right folder

instantclient,/opt/oracle/instantclient

# Add oci lib to the cli php config (console php)

echo "extension = oci8.so" >> /etc/php/7.2/cli/php.ini

# Add oci lib to the apache php config

echo "extension = oci8.so" >> /etc/php/7.2/apache2/php.ini

# Set environement variables for the cli version (you will need to reboot the server after)

echo "LD_LIBRARY_PATH=\"/opt/oracle/instantclient\"" >> /etc/environment

echo "ORACLE_HOME=\"/opt/oracle/instantclient\"" >> /etc/environment

# Set environement variables for the apache version

echo "export LD_LIBRARY_PATH=\"/opt/oracle/instantclient\"" >> /etc/apache2/envvars

echo "export ORACLE_HOME=\"/opt/oracle/instantclient\"" >> /etc/apache2/envvars

# Restart Apache
service apache2 restart


You're done, now you can test your connection to the Oracle database

# PHP CONNECTION EXAMPLE=

<?php
// Create connection to Oracle, change HOST IP and SID string!
$db = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 000.000.000.000)(PORT = 1521)))(CONNECT_DATA=(SID=XXX)))";
// Enter here your username (DBUSER) and password!
$conn = oci_connect("DBUSER", "PASSWORD",$db);
if (!$conn) {
   $m = oci_error();
   echo $m['message']. PHP_EOL;
   exit;
}
else {
   print "Oracle database connection online". PHP_EOL;
}
?>


# Open http://docucrm.docu.test/ in your browser.

[vbox-dl]: https://www.virtualbox.org/wiki/Downloads
[vagrant-dl]: https://www.vagrantup.com/downloads.html

