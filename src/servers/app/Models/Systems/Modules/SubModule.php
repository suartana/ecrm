<?php

namespace App\Models\Systems\Modules;

use Illuminate\Database\Eloquent\Model;

class SubModule extends Model
{
    protected $table = "sys_submodules";
	/**
	 * ORM Relation Table get the Properties of the module
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function properties()
	{
		return $this->hasOne(Properties::class,"code","code")->withDefault();
	}
}
