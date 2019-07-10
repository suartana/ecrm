<?php

namespace App\Models\Systems\Modules;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Properties
 *
 * @package App\Models\Systems\Modules
 */
class Properties extends Model
{
	/**
	 * Set default table name
	 *
	 * @var string
	 */
    protected $table = "sys_modules_properties";
	/**
	 * Set default primary key
	 *
	 * @var string
	 */
    protected $primaryKey = "id";

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
