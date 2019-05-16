<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "auth" middleware group. Now create something great!
|
*/
Auth::routes();
Route::middleware(['auth'])->group(function () {
    Route::get('/', 'HomeController@index')->name('home');
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/racesList', 'HomeController@racesList')->name('racesList');
    Route::get('/reunion/{id}', 'ReunionController@edit')->name('editReunion');
    Route::post('/reunion/{id}', 'ReunionController@update')->name('updateReunion');

    Route::get('/race/{id}', 'RaceController@edit')->name('editRace');
    Route::post('/race/{id}', 'RaceController@update')->name('updateRace');
});
