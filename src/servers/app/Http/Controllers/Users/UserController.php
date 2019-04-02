<?php

namespace App\Http\Controllers\Users;

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

	public function status()
	{

		if (Auth::check()) {
			$user = Auth::user();
			$status = [
				"status" => $user,
				"success" => true
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
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return view ( 'users/index' );
	}

	/**
	 * rendering login view
	 *
	 * @param Request $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function loginform(Request $request)
	{
		return view ( 'auth.login' );
	}
}
