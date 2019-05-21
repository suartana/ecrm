<?php

namespace App\Models\Systems\Modules;

use App\Traits\TranslationTrait;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
	use TranslationTrait;
	/**
	 * Set default table
	 *
	 * @var string
	 */
	protected $table = "sys_modules";

	/**
	 * ORM Relation Table get the Properties of the module
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function properties()
	{
		return $this->hasOne(Properties::class,"sysmodcode","code")->withDefault();
	}


}
