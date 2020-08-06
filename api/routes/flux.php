<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::get('/{date}/BINARY/photos', 'FluxController@photos');

Route::get('/{date}/BINARY/photos/{file}', 'FluxController@photosFile');

Route::get('/{date}/{parent}/{folder}/{fileName}', 'FluxController@flux');
