<?php

/*
 * |--------------------------------------------------------------------------
 * | Web Routes
 * |--------------------------------------------------------------------------
 * |
 * | This file is where you may define all of the routes that are handled
 * | by your application. Just tell Laravel the URIs it should respond
 * | to using a Closure or controller method. Build something great!
 * |
 */
Route::group([
    'middleware' => [
        'web'
    ]
],
    function () {
	    // login firts
	    //Auth::routes();
	    //Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
	    //main index
	    Route::get('/', 'Users\UserController@index');
	    //get navigation json data
	    Route::get('/system/navigation', 'Systems\MenuController@index');

        Route::get('/test', 'Tests\OracleController@index');

    });


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
