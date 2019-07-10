<?php

namespace App\Models\Systems\Modules;

use App\Helpers\Helper;
use App\Models\Systems\Language\Translation;
use App\Models\Users\User;
use App\Models\Users\UserView;
use App\Traits\SearchableTrait;
use App\Traits\TranslationTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
	use TranslationTrait,
		SearchableTrait;
	/**
	 * Set default table
	 *
	 * @var string
	 */
	protected $table = "sys_modules";

	protected $primaryKey = "id";
	/**
	 * list of dates columns
	 *
	 * @var array
	 */
	protected $dates = [
		'deleted_at',
		'created_at',
		'updated_at'
	];
	/**
	 * The list of columns we want the Searchable trait to use.
	 *
	 * @var array
	 */
	protected $searchable_columns = [
		'descr',
		'locale',
		'seq',
	];
	// The list of columns we want the Searchable trait to select.
	protected $return_from_search = [
		'id',
		'code',
		'descr',
		'locale',
		'created_by',
		'updated_by',
		'updated_at',
		'created_at',
		'seq',
	];
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'code',
		'descr',
		'locale',
		'created_by',
		'updated_by',
		'updated_at',
		'created_at',
		'seq',
	];
	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

	/**
	 * Get Searchable Fields.
	 *
	 * @return array
	 */
	public function getSearchableFields()
	{
		return $this->searchable_columns;
	}

	/**
	 *Get the Properties records associated with the Module.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function properties()
	{
		return $this->hasOne(Properties::class,"code","id")->withDefault();
	}

	/**
	 * Get the Translation records associated with the Module.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function translation ()
	{
		return $this->hasMany(Translation::class,"item","id");
	}

}
