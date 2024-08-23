<?php

$sql = new mysqli('localhost', 'root', '', 'Chat');

if ($sql->connect_error) {
	die('Connection faild' . $sql->connect_error);
}

?>