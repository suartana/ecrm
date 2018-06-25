# DOCU CRM  V3



Local development with Vagrant
------------------------------

- Install [Virtualbox][vbox-dl]
- Install [Vagrant 2.x][vagrant-dl]
- Add this line to your `/etc/hosts` file: 192.168.88.20 docucrm.docu.test


Login into the Virtual Machine
------------------------------------------------------------

`vagrant ssh`
If you don't have SSH Key `password: vagrant`

Install LAMP (Linux, Apache2, MySQL & PHP)
-----------------------------------------------------------
    
    sudo -i
    apt-get update
    apt-get upgrade
    add-apt-repository ppa:ondrej/php
    apt-get update
    apt-get install php php-mysql php-gettext php-mbstring php-xdebug libapache2-mod-php  php-dev php-soap
    apt-get install php-dev build-essential php-pear libaio1 php-xml php-soap php-curl -y
    a2enmod php7.2
    service apache2 restart

Install MsSQL
------------------------------------------------------------
    pear install --nodeps MDB2_Driver_mssql
    apt install php-odbc php-sybase -y
    systemctl restart apache2

Oracle client installation
------------------------------------------------------------
First prerequirements are a working apache2 and php7.2 (Ubuntu 18.04) environement.

Download the basic (like instantclient-basic-linux.x64-12.1.0.2.0.zip) and the sdk (instantclient-sdk-linux.x64-12.1.0.1.0.zip) package from the Oracle Website 
http://www.oracle.com/technetwork/database/database-technologies/instant-client/downloads/index.html

Upload both files to your webserver, you can use WinSCP for it
Unzip both files on server, in my case, you will get a new folder named "instantclient_12_1"

- Create destination folder

        mkdir /opt/oracle

- Move and rename the instantclient folder

        mv instantclient_12_1/ /opt/oracle/instantclient

- Change rights on folder

        chown -R vagrant:www-data /opt/oracle

- Check if you have the required packages for installing OCI8

        apt install php7.2-dev php-pear build-essential libaio1

- Create necessary soft links

        ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so

        ln -s /opt/oracle/instantclient/libocci.so.12.1 /opt/oracle/instantclient/libocci.so

- Add instant client to ld config files

        echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient

- Update Dynamic Linker Run-Time Bindings

        ldconfig

- Now install OCI8 by pecl

        pecl install oci8

- The OCI8 installation is asking you for the right folder

        instantclient,/opt/oracle/instantclient

- Add oci lib to the cli php config (console php)

        echo "extension = oci8.so" >> /etc/php/7.2/cli/php.ini

- Add oci lib to the apache php config

        echo "extension = oci8.so" >> /etc/php/7.2/apache2/php.ini

- Set environement variables for the cli version (you will need to reboot the server after)

        echo "LD_LIBRARY_PATH=\"/opt/oracle/instantclient\"" >> /etc/environment
        
        echo "ORACLE_HOME=\"/opt/oracle/instantclient\"" >> /etc/environment

- Set environement variables for the apache version

        echo "export LD_LIBRARY_PATH=\"/opt/oracle/instantclient\"" >> /etc/apache2/envvars
        
        echo "export ORACLE_HOME=\"/opt/oracle/instantclient\"" >> /etc/apache2/envvars

- Restart Apache

        service apache2 restart


You're done, now you can test your connection to the Oracle & MsSQL database

PHP CONNECTION Oracle EXAMPLE 
------------------------------------------------------------
    
    <?php
    
    echo "test connection to oracle database server.....<br>";
    // Connects to the XE service (i.e. database) on the "localhost" machine
    $conn = oci_connect('username', 'password', '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=dg-xois-db.docunet.info)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XOISCH)))');
     
    
    if (!$conn) {
        $e = oci_error();
        trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    }
    
    
    // Prepare the statement
    $stid = oci_parse($conn, 'select * from person tb1 join appl_login tb2 using(persid)');
    if (!$stid) {
        $e = oci_error($conn);
        trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    }
    
    // Perform the logic of the query
    $r = oci_execute($stid);
    if (!$r) {
        $e = oci_error($stid);
        trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    }
    
    // Fetch the results of the query
    print "<table border='1'>\n";
    while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
        print "<tr>\n";
        foreach ($row as $item) {
            print "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
        }
        print "</tr>\n";
    }
    print "</table>\n";
    
    oci_free_statement($stid);
    oci_close($conn);
    
    ?>



PHP CONNECTION MsSQL EXAMPLE 
------------------------------------------------------------
    <?php
    // Create connection to Oracle, change HOST IP and SID string!
    
    $server = "";
    $user = "";
    $pass = "";
    $database = "";
    
    
    try {
        $pdo = new \PDO(
            sprintf(
             "dblib:host=%s;dbname=%s",
             $server,
             $database
            ),
             $user,
             $pass
        );
         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
         echo "There was a problem connecting. " . $e->getMessage();
    }
    
    $query = "SELECT * FROM DEBI_DBL";
    $statement = $pdo->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    var_dump($results);
    
    
    ?>

Deploying with Ansible
------------------------------

Before you start:

- Make sure you have a valid keyfile `id_rsa` in your vagrants home directory: `~/.ssh/id_rsa` and its chmoded to `600` otherwise it will not work.
- The `deploy` user on the target server needs write access to the `builds` folder on target server's deploy directory.

You can deploy with those commands:

start and go into vagrant provisioning directory

	vagrant up
	vagrant ssh
	cd /vagrant/provisioning

start deploying

	ansible-playbook -i {rule}_{brand}.ini deploy.yml

replace `{rule}` with `stg` for staging or `prod` for production

replace `{brand}` with `ch`, `cz`, `at` or `de`

Run `vagrant up --provision` and then the following:

Open http://docucrm.docu.test/ in your browser.
------------------------------------------------------------
[vbox-dl]: https://www.virtualbox.org/wiki/Downloads
[vagrant-dl]: https://www.vagrantup.com/downloads.html


