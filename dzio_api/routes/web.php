<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('welcome');
});


Route::get('/flux/{date}/XML/{folder}/{fileName}', function ($date, $folder, $fileName) {

    $path = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/XML/" .$folder . "/" . $fileName. "";
    $content = "File Not found";
    if (file_exists($path)) {
        $content = file_get_contents($path);
    }

    return response($content)->header('Content-Type', 'text/xmll');
});