<?php
 namespace Router;


 class Router {

    protected $routes = [];

    
    public function get($url, $function) {
        $this->addRoute('GET', $url, $function);
    }

    public function post($url, $function) {
        $this->addRoute('POST', $url, $function);
    }

    public function put($url, $function) {
        $this->addRoute('PUT', $url, $function);
    }

    public function patch($url, $function) {
        $this->addRoute('PATCH', $url, $function);
    }    

    public function delete($url, $function) {
        $this->addRoute('DELETE', $url, $function);
    }

    public function addRoute($method, $url, $function) {

        $url = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $url);
        $this->routes[$method][$url] = $function;
    }

    public function getPath($method, $url) {
        foreach($this->routes[$method] as $route => $function) {
            if (preg_match('#^' . $route . '$#', $url, $matches)) {
                array_shift($matches);
                return call_user_func_array($function, $matches);
            }
        }

        header("HTTP/1.0 404 Not Found");
        return json_encode(["success" => false, "message" => "Route not found"]);
    }
 }
?>