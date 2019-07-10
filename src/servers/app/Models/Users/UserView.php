<?php

namespace App\Models\Users;

use App\Models\Systems\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Integer;

class UserView extends Model
{
	/*
	 * set default table
	 */
	protected $table = 'user_view';
	/**
	 * set default primary key
	 * @var bool
	 */
	protected $primaryKey = "id";
	/**
	 * Get users's full name. The name is formatted according to the user's
	 * preference, either "Firstname Lastname", or "Lastname Firstname".
	 *
	 * @return string
	 */
	public static function getFullname(string $email)
	{
		$user =  UserView::where('email', $email )->first();
		return $user ? $user->firstname." ".$user->lastname : "";
	}

	/**
	 * Provide user profile data
	 *
	 * @param int $id
	 * @param string $lang
	 * @return mixed
	 */
	public static function getProfile(int $id,string $lang = 'GER')
	{
		return UserView::select(
			"ADDR",
			"ANREDE",
			"ANREDE_LANG",
			"COMPID",
			"COUNTRY",
			"CREATED_AT",
			"CREATED_BY",
			"CREF",
			"DEPT",
			"DESCR",
			"EMAIL",
			"EMP",
			"FIRSTNAME",
			"ID",
			"IPHONE",
			"LASTLOGIN",
			"LASTNAME",
			"MOBILE",
			"OCCUPATION_STR",
			"PHONE",
			"POSTCODE",
			"SID",
			"STATUS",
			"TEAM",
			"TOWN",
			"IMG",
			"UPDATED_AT",
			"UPDATED_BY",
			"USERLANG"
		)->where(['id' => $id , "ANREDE_LANG" => $lang])->first();
	}

	/**
	 * ORM set user belong to module
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function module()
	{
		return $this->belongsTo(Module::class);
	}
}
