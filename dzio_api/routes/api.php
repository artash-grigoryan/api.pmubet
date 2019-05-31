<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['cors'])->group(function () {
    Route::get('{locale}/reunion/get/all',   "ReunionController@getAll");
    Route::get('{locale}/reunion/get/{date}',"ReunionController@getByDate");
    Route::get('{locale}/race/get/all',      "RaceController@getAll");
    Route::get('{locale}/race/get/next',     "RaceController@getNext");
    Route::get('{locale}/race/get/nextQ5',   "RaceController@getNextQ5");
    Route::get('{locale}/race/get/2next',    "RaceController@get2Next");
    Route::get('{locale}/race/get/{date}',   "RaceController@getAllByDate");
    Route::get('{locale}/race/get/{date}/first',                         "RaceController@getFirstByDate");
    Route::get('{locale}/race/get/{date}/{reunionNumber}/first',         "RaceController@getFirstByReunion");
    Route::get('{locale}/race/get/{date}/{reunionNumber}/{raceNumber}',  "RaceController@get");
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

