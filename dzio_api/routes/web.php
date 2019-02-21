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


Route::get('/flux/{date}/XML/{folder}/{subFolder}/{fileName}', function ($date, $folder, $subFolder, $fileName) {

    $path = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/XML/" .$folder . "/".$subFolder. "/".$fileName. "";

    if (file_exists($path)) {
        $xmlFile = fopen();
        $content = fread($xmlFile);

        print_r($content);
    }
});