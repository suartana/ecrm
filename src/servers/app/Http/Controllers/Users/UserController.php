<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\User;
use App\Models\Users\UserView;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
	use JsonRespondTrait, TranslationTrait;
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
	{   $user = Auth::user();
		$userinfo =  $user ? UserView::getProfile($user->getAuthIdentifier()) : false ;
		$data = [
			"data" => $userinfo,
			"success" => $user ? true : false
		];
		return $this->respond($data);
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
			"message" => $result ? $this->translate("info","LanguageChange") : $this->translate("error", "reportAdmin"),
			"datalang" => $this->translations(),
			"success" => $result ? true : false
		];
		return $this->respond($data);
	}
}
