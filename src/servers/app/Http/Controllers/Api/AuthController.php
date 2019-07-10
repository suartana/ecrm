<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users\UserView;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\Users\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
	use JsonRespondTrait, AuthenticatesUsers, TranslationTrait;

	/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function login(Request $request)
	{
		//is user check rememberme
		$this->isUserRemember();
		//validate the input parameters
		$this->validateRequest($request);
		//set user credetials
		try {
			$credentials = $request->only('email', 'password');
			// set the remember me cookie if the user check the box
			if(Auth::attempt($credentials,$request->rememberme)) {
				$user  = Auth::user();
				$fullname = UserView::getFullname($request->get("email"));
				$userinfo = UserView::getProfile($user->getAuthIdentifier()) ;
				//set last user login
				$user->lastlogin = Carbon::now()->toDateTimeString();
				$user->save();

				$result = [
					"success" => true,
					"data" => $userinfo,
					"user" => $fullname,
					"token" => $user->createToken('docucrm')->accessToken
				];
				return $this->respond($result);
			}else{
				return $this->respondUnauthorized( $this->translate( "validation", "LoginError") );
			}
		} catch (\Exception $e) {
			return $this->respondUnauthorized( $this->translate( "error", "ReportAdmin") );
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
	/**
	 * Logout user and clear the login session
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function logout(){
		if (Auth::check()) {
			Auth::logout();
			return $this->respond(["success" => true]);
		}else{
			return  $this->respondWithError($this->translate( "error", "ReportAdmin"));
		}
	}

	/**
	 * Check if user checked the remember me
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	private function isUserRemember()
	{
		if (Auth::check()) {
			return $this->respond(["success" => true,"status" => "loggedin" , "keepalive" => "rememberme"]);
		}
	}

}