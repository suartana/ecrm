<?php

namespace App\Models\Systems\Language;

use App\Models\Systems\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Waavi\Translation\Traits\Translatable;

class Translation extends Model
{
	/**
	 *  Table name in the database.
	 *  @var string
	 */
	protected $table = 'translator_translations';

	/**
	 *  List of variables that can be mass assigned
	 *  @var array
	 */
	protected $fillable = ['locale', 'namespace', 'type', 'item', 'text', 'unstable'];

	/**
	 *  Each translation belongs to a language.
	 */
	public function language()
	{
		return $this->belongsTo(Language::class, 'locale', 'locale');
	}

	/**
	 *  Returns the full translation code for an entry: namespace.group.item
	 *  @return string
	 */
	public function getCodeAttribute()
	{
		return $this->namespace === '*' ? "{$this->group}.{$this->item}" : "{$this->namespace}::{$this->group}.{$this->item}";
	}

	/**
	 *  Flag this entry as Reviewed
	 *  @return void
	 */
	public function flagAsReviewed()
	{
		$this->unstable = 0;
	}

	/**
	 *  Set the translation to the locked state
	 *  @return void
	 */
	public function lock()
	{
		$this->locked = 1;
	}

	/**
	 *  Check if the translation is locked
	 *  @return boolean
	 */
	public function isLocked()
	{
		return (boolean) $this->locked;
	}


	public function module()
	{
		$this->belongsTo(Module::class);
	}
}
