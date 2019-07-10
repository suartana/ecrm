<?php

namespace App\Http\Controllers\Api;

use App\Models\Auth\PasswordReset;
use App\Models\Users\User;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\UserView;
use Illuminate\Support\Facades\Session;
use Monolog\Utils;

class PasswordChangeController extends Controller
{

	use ResetsPasswords,JsonRespondTrait, TranslationTrait;

	protected $user;
	/**
	 *  Reset the given user's password.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
	 */
	public function passwordChange(Request $request)
	{
		if (!User::validateEmail($request->email)) {
			return $this->respondWithError($this->translate("passwords","User"));
		}
		//validate the user parameters
		$request->validate($this->rules(), $this->validationErrorMessages());

		//validate the token
		if(!PasswordReset::checkHastToken($request)){
			return $this->respondWithError($this->translate("passwords","Token"));
		}

		// Here we will attempt to reset the user's password. If it is successful we
		// will update the password on an actual user model and persist it to the
		// database. Otherwise we will parse the error and return the response.
		$response = $this->broker()->reset(
				$this->credentials($request), function ($user, $password) {
				$this->resetPassword($user, $password);
				$this->user = $user;
			}
		);
		//get user info
		$userinfo = $this->user["id"] ? UserView::getProfile($this->user["id"]) : false;
		$token = $this->user["id"] ?  $this->user->createToken("docucrm"): false;

		// set array json data
		$jdata = [
			"success" => true,
			"data" => $userinfo,
			"token" => $token,
			"msg" => $this->translate("passwords","Reset")
		];
		// If there is an error we can
		// redirect them back to where they came from with their error message.
		return $response == Password::PASSWORD_RESET
			? $this->respond($jdata)
			: $this->respondNotTheRightParameters($this->translate("passwords","Token"));
	}

}
