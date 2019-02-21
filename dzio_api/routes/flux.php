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


Route::get('/qaq', function ($date) {
    var_dump($date);exit;
});