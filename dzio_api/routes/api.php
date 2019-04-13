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
    Route::options('reunion/all', "ReunionController@getAll");
    Route::get('reunion/all', "ReunionController@getAll");
    Route::get('reunion/{date}', "ReunionController@getByDate");
    Route::options('race/all', "RaceController@getAll");
    Route::get('race/all', "RaceController@getAll");
    Route::options('race/next', "RaceController@getNext");
    Route::get('race/next', "RaceController@getNext");
    Route::options('race/nextQ5', "RaceController@getNextQ5");
    Route::get('race/nextQ5', "RaceController@getNextQ5");
    Route::get('race/2next', "RaceController@get2Next");
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

