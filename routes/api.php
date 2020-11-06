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

Route::post('login', 'AppController@login')->name('login');
Route::group(['prefix' => 'auth'], function () {
Route::get('init', 'AppController@init');
    Route::post('logout', 'AppController@logout');
    Route::get('user', 'AppController@user');
    Route::get('details', 'AppController@studentDetails')->name('details');
});

