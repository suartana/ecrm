<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users\UserView;
use App\Traits\Translatetable;
use App\Utils\Util;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Traits\JsonRespondController;
use App\Models\Users\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Session;


class AuthController extends Controller
{
	use JsonRespondController, AuthenticatesUsers, Translatetable;
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest', ['except' => 'logout']);
	}

	/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function login(Request $request)
	{   //validate the input parameters
		$this->validateRequest($request);
		//set user credetials
		try {
			$credentials = $request->only('email', 'password');
			if(Auth::attempt($credentials)) {
				$user  = Auth::user();
				$fullname = UserView::getFullname($request->get("email"));
				$result = [
					"success" => true,
					"user" => $fullname,
					"token" => $user->createToken('docucrm')->accessToken
				];
				return $this->respond($result);
			}else{
				return $this->respondUnauthorized( $this->translate( "validations", "loginError") );
			}
		} catch (\Exception $e) {
			return $this->respondUnauthorized( $this->translate( "error", "reportAdmin") );
		}
	}

	/**
	 * Validate the request.
	 *
	 * @param  Request $request
	 * @return \Illuminate\Http\JsonResponse|true
	 */
	private function validateRequest(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'email|required',
			'password' => 'required',
		]);

		if ($validator->fails()) {
			return $this->respondValidatorFailed($validator);
		}

		// Check if email exists. If not respond with an Unauthorized, this way a hacker
		// doesn't know if the login email exist or not, or if the password os wrong
		$count = User::where('email', $request->get('email'))->count();
		if ($count === 0) {
			return $this->respondUnauthorized();
		}

		return true;
	}

	public function getUser()
	{
		$user = Auth::user();
		return response()->json(['success' => $user,"user" => "test"], $this->successStatus);
	}

	/**
	 * Logout user and clear the login session
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function logout(){
		if (Auth::check()) {
			Auth::user()->token()->revoke();
			return $this->respond(["success" => true]);
		}else{
			return  $this->respondWithError("Something went wrong, please contact your administrator.");
		}
	}

}