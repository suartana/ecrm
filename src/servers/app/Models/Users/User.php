<?php

namespace App\Models\Users;


use App\Models\Systems\Modules\Module;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
	use Notifiable, HasApiTokens;
	/**
	 *  set default table
	 * @var string $table
	 */
	protected $table = 'sys_user';

	/**
	 * set default primary key
	 *
	 * @var string $primaryKey
	 */
	protected $primaryKey = 'id';

	/**
	 * Set static public object
	 *
	 * @var $user
	 */
	public static $user;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'email', 'password',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];

	public function getId()
	{
		return $this->id;
	}
	/**
	 * Get user login status
	 * @param array $aPost
	 * @return NULL or integer
	 */
	public static function getUserLoginStatus(array $aPost){
		$userId =  self::select("id")
			->where("status",1)
			->where("email",$aPost["email"])->first();
		return $userId ? $userId->id : null;
	}

	/**
	 * Validating user e-mail
	 *
	 * @param string $email
	 * @return bool
	 */
	public static function validateEmail(string $email): bool
	{
		self::$user = User::where('email', $email)->first();
		return !!self::$user;
	}

	/**
	 * Update user password
	 *
	 * @param $email
	 * @param $password
	 * @return mixed
	 */
	public static function changePassword($email,$password)
	{
		$user =  User::where('email', $email)->update(
			[
				"password" =>  Hash::make($password),
				"remember_token" => Str::random(60)
			]
		);
		return $user;
	}

}
