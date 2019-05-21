<?php

//
echo "test connection to oracle database server.....<br>";
// Connects to the XE service (i.e. database) on the "localhost" machine
$conn = oci_connect('xois_local', 'xois_local', '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=dg-xois-db.docunet.info)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XOISDEV)))');


if (!$conn) {
	$e = oci_error();
	trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}else{
	echo "connected to oracle:";
	print_r($conn);
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