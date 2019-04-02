<?php

use Illuminate\Support\Facades\Route;

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
Route::prefix('crm')->group(function(){
	Route::post('login', 'Api\AuthController@login');
	Route::post('resetpassword', 'Api\ResetPasswordController@sendEmail');
	Route::group(['middleware' => 'auth:api'], function(){
		Route::get('getUser', 'Api\AuthController@getUser');
		Route::get('/logout', 'Api\AuthController@logout');
	});
});


Route::group(['middleware' => ['auth:api']], function () {
	Route::get('/user', 'Api\AuthController@getUser');
	Route::get('/userinfo', 'Users\UserController@status');
});
