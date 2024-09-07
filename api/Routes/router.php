<?php
 namespace Router;

 class Router {
    protected $routes = [];

    public function addRoute($method, $url, $function) {
        $this->routes[$method][$url] = $function;
    }

    public function getPath($method, $url) {
        if (isset($this->routes[$method][$url])) {
            return $this->routes[$method][$url];
        } else {
            header("HTTP/1.0 404 Not Found");
            return json_encode(["success" => false, "message" => "Route not found"]);
        }
    }
 }
?>