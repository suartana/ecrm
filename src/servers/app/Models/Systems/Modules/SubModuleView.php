<?php

namespace App\Models\Systems\Modules;

use App\Helpers\DataHelper;
use App\Traits\TranslationTrait;
use Illuminate\Database\Eloquent\Model;

class SubModuleView extends Model
{
	use TranslationTrait;
	/**
	 * Set default table
	 *
	 * @var string
	 */
	protected $table = "sys_submodule_view";

}
