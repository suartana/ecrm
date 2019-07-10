<?php

namespace App\Services\Systems\Modules;

use App\Helpers\Helper;
use App\Models\Systems\Language\Translation;
use App\Models\Systems\Modules\Properties;
use App\Services\BaseService;
use App\Models\Systems\Modules\Module;
use App\Traits\JsonRespondTrait;
use App\Traits\ModuleTrait;
use App\Traits\TranslationTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

/**
 * Class ModuleService.
 */
class ModuleService extends BaseService
{
	use JsonRespondTrait,
		TranslationTrait,
		ModuleTrait;

	/**
	 * Set rules for the validation
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'descr' => 'required|string|max:256',
			'seq' => 'required|integer',
			'userid' => 'required|integer'
		];
	}

	/**
	 * Store the data into the table sys_modules and translator_translations
	 *
	 * @param array $data
	 * @return bool
	 */
	public function execute(array $data)
	{   // validation parameters

		if (!$this->validate($data)) {
			return false;
		}
		// create or update the record
		$module         = $data["id"] ? Module::find($data["id"]) : new Module();
		$prevSeq        = $module->seq;

		//reorganize module sequence number
		$this->reorganizeModuleSequenceNumber(
			(int) $data["userid"],
			$data["id"] ? "change" : "add",
			(int) $data["seq"],
			(int) $data["id"],
			(int) $prevSeq
		);

		// set the params
		$module->descr  = $data["descr"];
		$module->seq    = $data["seq"];
		//if pkey exists
		if ($data["id"]) {
			$module->updated_by = $data["userid"];
			$module->updated_at = now();
		} else {
			$module->created_by = $data["userid"];
			$module->created_at = now();
		}
		//save the record
		$module->save();

		//save the child entries
		$languages = [
			0 => 'en',
			1 => 'de',
			2 => 'fr',
			3 => 'it'
		];
		//begin the transaction
		DB::beginTransaction();
		foreach ($languages as $key => $language) {
			//set id
			$id = $data["descr_{$language}_id"];
			//set model
			$trans = $id ? Translation::find($id) : new Translation();
			$trans->item = $module->id;
			$trans->locale = $language;
			$trans->type = "module";
			$trans->text = $data["descr_{$language}"];

			if ($data["descr_{$language}_id"]) {
				$trans->updated_by = $data["userid"];
				$trans->updated_at = now();
			} else {
				$trans->created_by = $data["userid"];
				$trans->created_at = now();
			}

			$trans->save();
		}
		// commit transaction
		DB::commit();

		return true;
	}
	/**
	 * Delete the record and child items
	 *
	 * @param int $id
	 * @return bool
	 */
	public function delete(array $data) : bool
	{
		//set id
		$id = (int) $data["id"];
		//get the object
		$module = Module::find($id);
		//reorganize module sequence number
		$this->reorganizeModuleSequenceNumber(
			(int) $data["userid"],
			"delete",
			(int) $module->seq,
			(int) $id,
			false
		);

		$deleted = $module->delete();

		if($deleted){
			Translation::where("item",$id)->delete();
			Properties::where("code",$id)->delete();
			return true;
		}

		return false;
	}
}
