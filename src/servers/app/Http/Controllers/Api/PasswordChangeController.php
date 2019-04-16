<?php

namespace App\Http\Controllers\Api;

use App\Models\Users\User;
use App\Traits\JsonRespondController;
use App\Utils\Util;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;

class PasswordChangeController extends Controller
{

	use ResetsPasswords,JsonRespondController;
	/**
	 *  Reset the given user's password.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
	 */
	public function passwordChange(Request $request)
	{
		if (!User::validateEmail($request->email)) {
			return $this->respondWithError("{$request->email} is not recognized as a username or e-mail address.");
		}
		//validate the user parameters
		$request->validate($this->rules(), $this->validationErrorMessages());
		// Here we will attempt to reset the user's password. If it is successful we
		// will update the password on an actual user model and persist it to the
		// database. Otherwise we will parse the error and return the response.
		$response = $this->broker()->reset(
				$this->credentials($request), function ($user, $password) {
				$this->resetPassword($user, $password);
			}
		);
		// set array json data
		$jdata = [
			"success" => true,
			"msg" => "Your password has been successfully changed"
		];
		// If the password was successfully reset, we will redirect the user back to
		// the application's home authenticated view. If there is an error we can
		// redirect them back to where they came from with their error message.
		return $response == Password::PASSWORD_RESET
			? $this->respond($jdata)
			: $this->respondNotTheRightParameters("Your authorization token has expired or is invalid. Re-enter your login credentials to refresh the token. If you are still unable to log in, please contact your administrator.");
	}

}
