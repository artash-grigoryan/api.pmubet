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
    Route::get('/predictions', 'HomeController@predictions')->name('predictions');
    Route::get('/reunions', 'HomeController@index')->name('reunions');
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/racesList', 'HomeController@racesList')->name('racesList');
    Route::get('/runnersList', 'HomeController@runnersList')->name('runnersList');
    Route::get('/reportersList', 'HomeController@reportersList')->name('reportersList');

    Route::get('/reunion/{id}/{lang?}', 'ReunionController@edit')->name('editReunion');
    Route::post('/reunion/{id}', 'ReunionController@update')->name('updateReunion');

    Route::get('/race/{id}/{lang?}', 'RaceController@edit')->name('editRace');
    Route::post('/race/{id}', 'RaceController@update')->name('updateRace');

    Route::get('/runner/{id}/{lang?}', 'RunnerController@edit')->name('editRunner');
    Route::post('/runner/{id}', 'RunnerController@update')->name('updateRunner');

    Route::get('/reporter/{id}/{lang?}', 'ReporterController@edit')->name('editReport');
    Route::post('/reporter/{id}', 'ReporterController@update')->name('updateReport');

    Route::get('/race/{raceId}/prediction/add', 'PredictionController@addForm')->name('addPrediction');
    Route::post('/race/{raceId}/prediction/add', 'PredictionController@add')->name('addPrediction');

    Route::get('/prediction/{id}/{lang?}', 'PredictionController@edit')->name('editPrediction');
    Route::post('/prediction/{id}', 'PredictionController@update')->name('updatePrediction');

    Route::get('/home-banner/', 'HomeController@bannerEdit')->name('editBanner');
    Route::post('/home-banner/', 'HomeController@bannerUpdate')->name('updateBanner');
});
