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
	'reset' => false
]);
// public routes
Route::group([
	'middleware' => [
		'web'
	]
],function () {
	Route::get('/', 'AppController@index');
	Route::get('/user', 'AppController@index');
	Route::get('/login', 'AppController@index');
	Route::get('/logout', 'Api\AuthController@logout');
	Route::get('/reset', 'Auth\ResetPasswordController@index');
	//language translation
	Route::get('/translation/jstranslations', 'Systems\Language\TranslationController@jstranslations');
	Route::get('/setlang', 'Systems\Language\TranslationController@setLocale');
	Route::get('/translation/add', 'Systems\Language\TranslationController@addTranslation');
	Route::get('/storage/images/{filename}', 'Systems\File\ImagesController@displayImage');
	Route::get('menu', 'Systems\ACL\NaviController@index');
});
