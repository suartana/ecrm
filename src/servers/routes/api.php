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
	Route::post('logout', 'Api\AuthController@logout');
	Route::post('resetpassword', 'Api\ResetPasswordController@sendEmail');
	Route::post('changepassword', 'Api\PasswordChangeController@passwordChange');
});

//set route prefix users
Route::prefix('users')->group(function(){
	//auth-api
	Route::group(['middleware' => 'auth:api'], function(){
		//navigation
		Route::get('/profile', 'Users\UserController@profile');
		Route::get('/status', 'Users\UserController@status');
		Route::get('/setlocale', 'Users\UserController@setUserLocale');
	});
});

//set route prefix system
Route::prefix('system')->group(function(){
	//auth-api
	Route::group(['middleware' => 'auth:api'], function(){
		//navigation
		Route::get('/treelist', 'Systems\ACL\NaviController@treeList');
	});
});

