<?php
 namespace Router;

 class Router {
    protected $routes = [];

    public function addRoute($method, $url, $function) {
        $this->routes[$method][$url] = $function;
    }
 }
?>