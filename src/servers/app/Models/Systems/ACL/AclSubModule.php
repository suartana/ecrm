<?php

namespace App\Models\Systems\ACL;

use App\Helpers\DataHelper;
use App\Traits\TranslationTrait;
use Illuminate\Database\Eloquent\Model;

class AclSubModule extends Model
{
	use TranslationTrait;
	/**
	 * Set default table
	 *
	 * @var string
	 */
	protected $table = "sys_acl_submodule_view";

	/**
	 * Provide the data view
	 *
	 * @param array $condition
	 * @param int $code
	 * @return array
	 */
	public static function data(array $condition, int $code) : array
	{
		$submodules =  self::where($condition)->orderBy("submodseq", "asc")->get();
		$submods = [];
		if($submodules){
			foreach ($submodules as $key => $submodule){
				if ($code == $submodule->smodcode){
					$submods[] = [
						'text' => $submodule->transtext,
						'iconCls'=> $submodule->iconcls,
						'viewType'=> $submodule->viewtype ? DataHelper::clean($submodule->viewtype) : "",
						'leaf'=>  true
					];
				}
			}
		}
		return $submods;
	}

	/**
	 * Check if the modulecode exists in submodule view
	 *
	 * @param int $code
	 * @return bool
	 */
	public static function isModuleExists(int $code):bool
	{
		return self::where("smodcode", $code)->exists();
	}
}
