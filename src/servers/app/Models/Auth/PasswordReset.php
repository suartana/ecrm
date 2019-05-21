<?php

namespace App\Models\Auth;

use App\Utils\Util;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PasswordReset extends Model
{
	use Notifiable;
	/*
	 * set default table
	 */
	protected $table = 'password_resets';

	// set default primary key
	protected $primaryKey = 'id';
	/**
	 *
	 *
	 * @param string $token
	 * @param string $email
	 */
	public static function saveToken(string $token, string $email): void
	{
		self::insert([
			'email' => $email,
			'token' => $token,
			'created_at' => Carbon::now()
		]);
	}

	/**
	 * Create a new token
	 *
	 * @param string $email
	 * @return string
	 */
	public static function createToken(string $email): string
	{
		$oldToken = self::where('email', $email)->first();
		if ($oldToken) {
			return $oldToken->token;
		}
		$token = Str::random(60);
		self::saveToken($token, $email);
		return $token;
	}

	/**
	 * Check if the password reset token is exists
	 *
	 * @param $request
	 * @return bool
	 */
	public static function checkHastToken ($request):bool
	{
		$user = PasswordReset::getUserToken($request->email);
		$tokenEqual = Hash::check($request->token,$user->token);
		return $tokenEqual;
	}

	/**
	 * Get the user token
	 *
	 * @param string $token;
	 * @return bool
	 */
	public static function getUserToken(string $email)
	{
		return self::select("token")->where('email', $email)->first();
	}

}
