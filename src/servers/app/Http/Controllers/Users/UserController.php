<?php

namespace App\Http\Controllers\Users;

use App\Helpers\Helper;
use App\Http\Resources\Users\SalutationCollection;
use App\Http\Resources\Users\UserViewCollection;
use App\Models\Users\Solutation;
use App\Models\Users\User;
use App\Models\Users\UserView;
use App\Services\Users\UserService;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
	use JsonRespondTrait,
		TranslationTrait,
		ResetsPasswords;
	/**
	 * Where to redirect users after login.
	 *
	 * @var string
	 */
	protected $redirectTo = '/user';
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}


	/**
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$token = ['token' => "" ];
		return view('index', $token);
	}

	/**
	 * Check if the user still loggin
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function status()
	{
		if (Auth::check()) {
			$user = Auth::user();
			$userinfo = $user ?  "loggedin" : "Unauthorized" ;
			$status = [
				"status" => $userinfo,
				"token" => $user->getRememberToken(),
				"success" => $user ? true : false
			];
		}else{
			$status = [
				"status" => "Unauthorized"	,
				"success" => false
			];
		}
		return $this->respond($status);
	}

	/**
	 * Get user profile
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function profile()
	{
		try {
			$user = Auth::user();
			return new UserViewCollection(
				UserView::where(
					[
					'id' => $user->getAuthIdentifier() ,
					"ANREDE_LANG" => $this->mappingLocale($this->getLocale())
					]
				)->get()
			);
		}catch (\Exception $e) {
			return  $this->respondWithError($e->getMessage());
		}
	}

	/**
	 * Set default user locale
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setUserLocale(Request $request)
	{
		$locale = $request->get("locale");
		//set user session locale
		Session::put("locale", $locale);
		//check if user logged in
		$result = Auth::check() ? Auth::user()->setAttribute('locale', $locale)->save() :  false;
		//set json data
		$data = [
			"message" => $result ? $this->translate("info","LanguageChange") : $this->translate("error", "ReportAdmin"),
			"datalang" => $this->translations(),
			"success" => $result ? true : false
		];
		return $this->respond($data);
	}

	/**
	 * Provide Salutation list
	 *
	 * @return SalutationCollection|\Illuminate\Http\JsonResponse
	 */
	public function salutation()
	{
		try {
			return new SalutationCollection(Solutation::where("lang",$this->mappingLocale($this->getLocale()))->get());
		}catch (\Exception $e) {
			return  $this->respondWithError($e->getMessage());
		}
	}

	/**
	 * Update user password
	 *
	 * @param Request $request
	 * @param UserService $userService
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function changePassword(Request $request, UserService $userService)
	{
		try {
			//use userservice to change the user password
			if($userService->changePassword(Auth::user(),$request->get("password"))){
				$data = [
					"success" => true,
					"message" => $this->translate("passwords","Reset")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("passwords","User"));
			}
		}catch (\Exception $e){
			return  $this->respondWithError($e->getMessage());
		}
	}

	public function save(Request $request, UserService $userService)
	{
		try {
			//use userservice to save the data
			if( $userService->execute($request->all()) ){
				$data = [
					"success" => true,
					"message" =>  $this->translate("info","TheDataHasBeenSaved")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}
		}catch (\Exception $e){
			return  $this->respondWithError($e->getMessage());
		}
	}
}
