<?php

namespace App\Http\Controllers\Api;

use App\Models\Users\User;
use App\Notifications\ResetPassword;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Notifications\Notifiable;

class  ResetPasswordController extends Controller
{
	use JsonRespondTrait, SendsPasswordResetEmails, Notifiable, TranslationTrait;
	/**
	 * Get user data
	 *
	 * @var static object
	 */
	protected static $user;
	/**
	 * Set email receiver
	 *
	 * @var String $email
	 */
	protected $email;
	/**
	 * Set send email action
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function sendEmail(Request $request)
	{
		if (!User::validateEmail($request->email)) {
			return $this->respondWithError($this->translate("passwords","User"));
		}
		try {
			//send the Reset E-mail Notification
			$password_broker = app(PasswordBroker::class); //so we can have dependency injection
			$token = $password_broker->createToken(User::$user); //create reset password toke
			$this->email = $request->email;
			$this->notify(new ResetPassword($token,$request->email));
			//set json data
			$jdata = [
				"success" => true,
				"msg" => $this->translate("passwords","Sent")
			];
			return $this->respond($jdata);
		} catch (\Exception $e) {
			return $this->respondWithError( $this->translate( "error", "ReportAdmin") );
		}
	}
}
