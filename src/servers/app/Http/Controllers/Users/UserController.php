<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\UserView;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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
			$userinfo = $user ?  UserView::getProfile($user->getAuthIdentifier()) : false ;
			$status = [
				"data" => $userinfo,
				"success" => $user ? true : false
			];
		}else{
			$status = [
				"status" => "Unauthorized"	,
				"success" => false
			];
		}
		return response()->json($status);
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
		return response()->json($data);
	}
}
