<?php

return [
    'oracle' => [
        'driver' => 'oracle',
        'host' => 'dg-xois-db.docunet.info',
        'port' => '1521',
        'database' => '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=dg-xois-db.docunet.info)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XOISDEV)))',
        'service_name' => 'XOISDEV',
        'username' => 'xois_mgr',
        'password' => 'xois2468',
        'charset' => 'AL32UTF8',
        'prefix' => '',
        'server_version' => '12c'
    ],
];
