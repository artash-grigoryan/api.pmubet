<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| FLUX Routes
|--------------------------------------------------------------------------
|
| Here is where you can register FLUX routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "flux" middleware group. Enjoy building your API!
|
*/


Route::get('/{date}/{parent}/{folder}/{fileName}', function ($date, $parent, $folder, $fileName) {

    $path = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/" .$parent . "/" .$folder . "/" . $fileName. "";
    $content = "File Not found";
    if (file_exists($path)) {
        $content = file_get_contents($path);
    }

    return response($content)->header('Content-Type', 'text/xml;charset=ISO-8859-1');
});