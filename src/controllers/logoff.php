<?php 
namespace App\controllers;

if (!isset($_SESSION)){session_start();}
session_destroy();
header('Location: ../../public');