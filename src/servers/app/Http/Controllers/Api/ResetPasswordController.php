<?php

namespace App\Http\Controllers\Api;

use App\Mail\Auth\ResetPasswordMail;
use App\Models\Auth\PasswordReset;
use App\Models\Users\User;
use App\Traits\JsonRespondController;
use App\Utils\Util;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
	use JsonRespondController;

	protected static $user;
	/**
	 * Set send email action
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function sendEmail(Request $request)
	{
		if (!self::validateEmail($request->email)) {
			return $this->failedResponse($request->email);
		}
		self::send($request->email);
		return $this->successResponse();
	}
	/**
	 * Send the email with the token
	 *
	 * @param string $email
	 * @return void
	 */
	private static function send(string $email): void
	{   $user = self::$user;
		$fullname = "Gede Suartana";
		$token = PasswordReset::createToken($email);
		Mail::to($email)->send(new ResetPasswordMail($token,$fullname));
	}
	/**
	 * Validating user e-mail
	 *
	 * @param string $email
	 * @return bool
	 */
	private static function validateEmail(string $email): bool
	{
		self::$user = User::where('email', $email)->first();
		return !!self::$user;
	}

	/**
	 * Set failed response
	 *
	 * @param string $email
	 * @return Response
	 */
	private function failedResponse(string $email)
	{
		return $this->respondWithError("$email is not recognized as a username or e-mail address.");
	}

	/**
	 * Set success response
	 *
	 * @return Response
	 */
	private function successResponse()
	{   $jdata = [
			"success" => true,
			"msg" => "Reset Email is send successfully, please check your inbox"
		];
		return $this->respond($jdata);
	}

}
