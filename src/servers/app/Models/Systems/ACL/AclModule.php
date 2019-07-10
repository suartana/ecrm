<?php
namespace App\Models\Systems\ACL;

use App\Helpers\DataHelper;
use App\Models\Systems\Modules\SubModuleView;
use Illuminate\Database\Eloquent\Model;

/**
 * Provide ACL module view data
 *
 * Class AclModule
 * @package App\Models\Systems\ACL
 */
class AclModule extends Model
{
	/**
	 * Set default table view name
	 *
	 * @var string
	 */
	protected $table = "sys_acl_module_view";

	/**
	 * Provide the data module
	 *
	 * @param array $condition
	 * @return array
	 */
	public static function data(array $condition): array
	{
		$modules =  self::where($condition)->orderBy("smodseq", "asc")->get();
		$mods = [];
		foreach ($modules as $key => $module){
			$exists = AclSubModule::isModuleExists($module->modcode);
			$exists ? $mods[] = [
				'text' => $module->transtext,
				'iconCls'=> $module->iconcls,
				'rowCls'=> $module->rowcls,
				'itemId'=> $module->modcode,
				'id'=> $module->modcode,
				'expanded'=> false,
				'selectable'=> true,
				'children'  => $exists
			] :
				$mods[] = [
					'text' => $module->transtext,
					'iconCls'=> $module->iconcls,
					'rowCls'=> $module->rowcls,
					'viewType'=> $module->viewtype ? DataHelper::clean($module->viewtype) : "",
					'routeId' => $module->routeid ? DataHelper::clean($module->routeid) : "",
					'itemId'=> $module->modcode ? DataHelper::clean($module->modcode) : "",
					'leaf'=> $module->leaf ? true : false
				];
		}
		return $mods;
	}
}
