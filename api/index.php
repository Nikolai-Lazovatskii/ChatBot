<?php 
require_once "./Routes/router.php";
require_once "./Controllers/messageController.php";
require_once "./Controllers/accountController.php";
require_once "./Controllers/usersController.php";

use Router\Router;

$router = new Router();

$messageController = new MessageСontroller();
$accountController = new AccountController();
$usersController = new UsersController();

$router->post('/message', [$messageСontroller, 'handlePostMessage']);
$router->post('/messages', [$messageController, 'handleGetMessage']);
$router->post('/messageData', [$messageController, 'handleMessageData']);

$router->post('/login', [$accountController, 'login']);
$router->post('/registration', [$accountController, 'registration']);

$router->post('/userId', [$usersController, 'handleUserId']);
$router->post('/list', [$usersController, 'handleUsersList']);


$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

header('Content-Type: application/json');

?>