<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Traits\JsonRespondController;
use App\Models\Users\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
	use JsonRespondController;

	public $successStatus = 200;

	/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function login(Request $request)
	{

		$this->validateRequest($request);

		try {
			$credentials = $request->only('email', 'password');
			if(Auth::attempt($credentials)) {
				$user  = Auth::user();
				$result = [
					"success" => true,
					"user" => $user,
					"token" => $user->createToken('docucrm')->accessToken
				];
				//$this->redirectTo("/user/#dashboard");
				return $this->respond($result);
			}else{
				return $this->respondUnauthorized("Login password or E-mail did not match");
			}
		} catch (\Exception $e) {
			return $this->respondUnauthorized("Login password or E-mail did not match");
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


	public function logout(){
		if (Auth::check()) {
			Auth::user()->token()->revoke();
			return response()->json(['success' =>'logout_success'],200);
		}else{
			return response()->json(['error' =>'api.something_went_wrong'], 500);
		}
	}

}