<?php

namespace App\Models\Systems\Modules;

use Illuminate\Database\Eloquent\Model;

class Properties extends Model
{
    protected $table = "sys_modules_properties";

	/**
	 * ORM Relation table
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
    public function module()
    {
    	return $this->belongsTo(Module::class);
    }
	/**
	 * ORM Relation table
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function submodule()
	{
		return $this->belongsTo(SubModule::class);
	}
}
