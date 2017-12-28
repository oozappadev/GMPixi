<?php

header("Content-type: application/json");
echo json_encode([
  "get" => $_GET,
  "post" => $_POST,
  "files" => $_FILES
]);


