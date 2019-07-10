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
		Route::get('/salutation', 'Users\UserController@salutation');
		Route::post('/changepassword','Users\UserController@changePassword');
	});
});

//set route prefix system
Route::prefix('system')->group(function(){
	//auth-api
	Route::group(['middleware' => 'auth:api'], function(){
		//navigation
		Route::get('/treelist', 'Systems\ACL\AclController@treeList');
		//provide resources
		Route::get('/module', 'Systems\Modules\ModuleController@index');
		Route::get('/submodule', 'Systems\Modules\ModuleController@submodule');
		Route::get('/modulelang','Systems\Language\TranslationController@language');
		Route::post('/module/save','Systems\Modules\ModuleController@save');
		Route::post('/module/list','Systems\Modules\ModuleController@index');
		Route::get('/submodule/delete','Systems\Modules\ModuleController@submoduleDelete');
		Route::get('/module/delete','Systems\Modules\ModuleController@delete');
		Route::get('/module/properties/delete','Systems\Modules\ModuleController@deleteProperties');
		Route::post('/module/properties/save','Systems\Modules\ModuleController@saveProperties');
		Route::post('/submodule/save','Systems\Modules\ModuleController@saveSubmodule');
		//combobox
		Route::get('/countries', 'Systems\Language\CountriesController@index');
		Route::get('/languages', 'Systems\Language\LanguagesController@index');


	});
});

