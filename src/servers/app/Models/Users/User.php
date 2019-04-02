<?php

namespace App\Models\Users;


use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
	use Notifiable, HasApiTokens;
	/*
	 * set default table
	 */
	protected $table = 'sys_user';

	// set default primary key
	protected $primaryKey = 'id';

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

	/**
	 * Get users's full name. The name is formatted according to the user's
	 * preference, either "Firstname Lastname", or "Lastname Firstname".
	 *
	 * @return string
	 */
	public function getFullname()
	{
		return $this->name;
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
}
