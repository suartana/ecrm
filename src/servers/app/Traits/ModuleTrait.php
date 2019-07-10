<?php

namespace App\Traits;


use App\Helpers\Helper;
use App\Models\Systems\ACL\AclAction;
use App\Models\Systems\ACL\AclFunction;
use App\Models\Systems\ACL\AclModule;
use App\Models\Systems\ACL\AclSubModule;
use App\Models\Systems\Modules\Module;
use App\Models\Systems\Modules\Properties;
use App\Models\Systems\Modules\SubModule;
use App\Models\Users\Dashboard;
use Illuminate\Support\Facades\DB;

/**
 * A Trait is simply a group of methods that you want include within another class.
 * A Trait, like an abstract class, cannot be instantiated on it’s own.
 *
 * Trait ModuleTrait
 * @package App\Traits
 */
trait ModuleTrait
{
	use TranslationTrait;

	/**
	 * Provide Access Control List Submodule
	 *
	 * @param int $userId
	 * @param string $itemId
	 * @return AclSubModule
	 */
	public function getAclSubModule(int $userId,string $itemId) : AclSubModule
	{
		$condition = [
			"itemid" => $itemId,
			"userid" => $userId,
			"submodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		return AclSubModule::select("sysuserid","mcreate","mread","mupdate","mdelete")->where($condition)->first();
	}

	/**
	 * Provice Access Control List Module
	 *
	 * @param int $userId
	 * @param string $itemId
	 * @return AclModule
	 */
	public function getAclModule(int $userId,string $itemId) : AclModule
	{
		$condition = [
			"itemid" => $itemId,
			"userid" => $userId,
			"smodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		return AclModule::select("sysuserid","mcreate","mread","mupdate","mdelete")->where($condition)->first();
	}

	/**
	 * Provide Access Control List Function
	 *
	 * @param int $userId
	 * @param string $itemId
	 * @return AclFunction
	 */
	public function getAclFunction(int $userId,string $itemId) : AclFunction
	{
		$condition = [
			"itemid" => $itemId,
			"userid" => $userId,
			"smodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		return AclFunction::select("sysuserid","mcreate","mread","mupdate","mdelete")->where($condition)->first();
	}

	/**
	 * Provide4 Access Control List Action
	 *
	 * @param int $userId
	 * @param string $itemId
	 * @return AclAction
	 */
	public function getAclAction(int $userId,string $itemId) : AclAction
	{
		$condition = [
			"itemid" => $itemId,
			"userid" => $userId,
			"smodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		return AclAction::select("sysuserid","mcreate","mread","mupdate","mdelete")->where($condition)->first();
	}

	/**
	 * Provide acl data list
	 *
	 * @param string $modType
	 * @param string $itemId
	 * @param int $userId
	 * @return AclAction|AclFunction|AclModule|AclSubModule|bool
	 */
	public function getModule(string $modType,string $itemId, int $userId)
	{
		switch ($modType){
			case 'aclmodule':
				$acl = $this->getAclModule($userId,$itemId);
			break;
			case 'aclsubmodule':
				$acl = $this->getAclSubModule($userId,$itemId);
			break;
			case 'aclfunction':
				$acl = $this->getAclFunction($userId,$itemId);
			break;
			case 'aclaction':
				$acl = $this->getAclAction($userId,$itemId);
			break;
		}

		return $modType && $itemId &&  $userId ? $acl : false;
	}

	/**
	 * Reorganize Module sequence
	 *
	 * @param int $userId
	 * @param string $strAction
	 * @param int $intSeq
	 * @param int $intPkey
	 * @param int $prevSeq
	 * @return void
	 */
	public function reorganizeModuleSequenceNumber(int $userId, string $strAction, int $intSeq, int $intPkey = 0, int $prevSeq = 0)
	{
		//set start sequence
		$startSeq = 1;
		// set primary key column
		$pkey ='id';
		//The switch statement
		switch ($strAction) {
			case 'add':
				$condition = [
					["seq",">=",$intSeq]
				];
				$startSeq = $intSeq + 1;
				break;
			case 'delete':
				$condition = [
					["seq",">=",$intSeq]
				];
				$startSeq = $intSeq - 1;
				break;
			case 'change':
				if ($prevSeq > $intSeq) {
					$condition = [
						["seq","<=", $prevSeq],
						["seq" ,">=", $intSeq],
						[$pkey,"<>",$intPkey]
					];
					$startSeq = $intSeq;
				} else if ($prevSeq < $intSeq) {
					$condition = [
						["seq",">=", $prevSeq],
						["seq","<=",$intSeq],
						[$pkey,"<>",$intPkey]
					];
					$startSeq = $prevSeq;
				}else if ($prevSeq = $intSeq) {
					$condition = [
						["seq",">=", $prevSeq]
					];
					$startSeq = $prevSeq;
				}
				break;
		}

		//get all module
		$modules = Module::where($condition)->orderBy("seq","asc")->get();

		//save bulk
		if ($modules) {
			$i = $startSeq;
			DB::beginTransaction();
			foreach ($modules as $module) {
					$mod = Module::find($module->id);
					$mod->seq = $i;
					$mod->updated_at = now();
					$mod->updated_by = $userId;
					$mod->save();
				$i++;
			}
			DB::commit();
		}
	}

	/**
	 * Reorganize submodule sequence number
	 *
	 * @param int $userId
	 * @param string $strAction
	 * @param int $intSeq
	 * @param int $intModId
	 * @param int $intPkey
	 * @param int $prevSeq
	 * @return void
	 */
	public function reorganizeSubModuleSequenceNumber(int $userId, string $strAction, int $intSeq, int $intModId, int $intPkey = 0, int $prevSeq = 0)
	{
		//set start sequence
		$startSeq = 1;
		// set primary key column
		$pkey ='id';
		$modcode = "modcode";
		//The switch statement
		switch ($strAction) {
			case 'add':
				$condition = [
					[$modcode,"=",$intModId],
					["seq" ,">=",$intSeq]
				];
				$startSeq = $intSeq + 1;
				break;
			case 'delete':
				$condition = [
					[$modcode,"=>",$intModId],
					["seq",">=",$intSeq]
				];
				$startSeq = $intSeq - 1;
				break;
			case 'change':
				if ($prevSeq > $intSeq) {
					$condition = [
						[$modcode,"=",$intModId],
						[$pkey,"<>",$intPkey],
						["seq","<=",$prevSeq],
						["seq",">=",$intSeq]
					];
					$startSeq = $intSeq + 1;
				} else if ($prevSeq < $intSeq) {
					$condition = [
						[$modcode,"=",$intModId],
						[$pkey,"<>",$intPkey],
						["seq",">=",$prevSeq],
						["seq","<=",$intSeq]
					];
					$startSeq = $prevSeq;
				}else if ($prevSeq = $intSeq) {
					$condition = [
						[$modcode,"=",$intModId],
						["seq",">=", $prevSeq]
					];
					$startSeq = $prevSeq;
				}

				break;
		}

		//get all module
		$modules = SubModule::where($condition)->orderBy("seq","asc")->get();

		if ($modules) {
			$i = $startSeq;
			DB::beginTransaction();
			foreach ($modules as $module) {
				$mod = SubModule::find($module->id);
				$mod->seq = $i;
				$mod->updated_at = now();
				$mod->updated_by = $userId;
				$mod->save();
				$i++;
			}
			DB::commit();
		}
	}

	/**
	 * Reorganize User Dashboard sequence number
	 *
	 * @param int $userId
	 * @param string $strAction
	 * @param int $intSeq
	 * @param int $intPkey
	 * @param int $prevSeq
	 * @return void
	 */
	public function reorganizeDashboardSequenceNumber(int $userId, string $strAction, int $intSeq, int $intPkey = 0, int $prevSeq = 0)
	{
		//set start sequence
		$startSeq = 1;
		// set primary key column
		$pkey ='id';
		//The switch statement
		switch ($strAction) {
			case 'add':
				$condition = [
					["userid","=",$userId],
					["seq",">=",$intSeq]
				];
				$startSeq = $intSeq + 1;
				break;
			case 'delete':
				$condition = [
					["userid","=",$userId],
					["seq",">=",$intSeq]
				];
				$startSeq = $intSeq - 1;
				break;
			case 'change':
				if ($prevSeq > $intSeq) {
					$condition = [
						["userid","=",$userId],
						[$pkey,"<>",$intPkey],
						["seq","<=", $prevSeq],
						["seq" ,">=", $intSeq]
					];
					$startSeq = $intSeq + 1;
				} else if ($prevSeq < $intSeq) {
					$condition = [
						["userid","=",$userId],
						[$pkey,"<>",$intPkey],
						["seq",">=", $prevSeq],
						["seq","<=",$intSeq]
					];
					$startSeq = $prevSeq;
				}else if ($prevSeq = $intSeq) {
					$condition = [
						["seq",">=", $prevSeq]
					];
					$startSeq = $prevSeq;
				}
				break;
		}
		//get user dashboard
		$dasboards = Dashboard::where($condition)->orderBy("seq","asc")->get();

		if ($dasboards) {
			$i = $startSeq;
			DB::beginTransaction();
			foreach ($dasboards as $dasboard) {
				$mod = Dashboard::find($dasboard->id);
				$mod->seq = $i;
				$mod->updated_at = now();
				$mod->updated_by = $userId;
				$mod->save();
				$i++;
			}
			DB::commit();
		}
	}

	/**
	 * Provide Properties from module
	 *
	 * @param int $code
	 * @return Properties
	 */
	public function moduleProperties(int $code)
	{
		return Properties::where("code",$code)->first();
	}

	/**
	 * Get Module childs
	 *
	 * @param int $id
	 * @return mixed
	 */
	public function getModuleChilds(int $id)
	{
		return SubModule::where("modcode",$id)->first();
	}

}