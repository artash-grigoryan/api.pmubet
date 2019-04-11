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
Route::middleware('cors')->get('reunion/all', "ReunionController@getAll");
Route::middleware('cors')->get('reunion/{date}', "ReunionController@getByDate");
Route::middleware('cors')->get('race/all', "RaceController@getAll");
Route::middleware('cors')->get('race/next', "RaceController@getNext");
Route::middleware('cors')->get('race/nextQ5', "RaceController@getNextQ5");
Route::middleware('cors')->get('race/2next', "RaceController@get2Next");

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

