<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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
Auth::routes([
	'register' => false,
	'verify' => true,
	'reset' => true
]);
// public routes
Route::group([
	'middleware' => [
		'web'
	]
],function () {
	//navigation
	Route::get('/system/navigation', 'Systems\MenuController@index');
	Route::get('/', function () {
		return view('index');
	});
	Route::get('/user', function () {
		return view('index');
	});
	Route::get('/login', function () {
		return view('index');
	});
	Route::get('/reset', 'Auth\ResetPasswordController@index');
	//language translation
	Route::get('/translation/jstranslations', 'Systems\TranslationController@jstranslations');
});


