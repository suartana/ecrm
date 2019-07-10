<?php

namespace App\Services\Systems\Modules;

use App\Helpers\Helper;
use App\Models\Systems\Modules\Properties;
use App\Services\BaseService;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;

/**
 * Class PropertiesService.
 */
class PropertiesService extends BaseService
{
	use JsonRespondTrait,
		TranslationTrait;
	/**
	 * Set rules for the validation
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'iconcls' => 'required|string|max:256',
			'itemid' => 'required|string',
			'modtype' => 'required|integer',
		];
	}
	/**
	 *  Insert or Update data Properties
	 *
	 * @param array $data
	 * @return bool
	 */
	public function execute(array $data) : bool
	{   // validation parameters

		if (!$this->validate($data)) {
			return false;
		}

		$id = $data['id'];
		$properties = $id ? Properties::find($id) : new Properties();

		$properties->code = $data["submodulecode"] ?  $data["submodulecode"] :  $data["modpropertid"];
		$properties->iconcls = mb_strtolower($data["iconcls"]);
		$properties->rowcls = mb_strtolower($data["rowcls"]);
		$properties->viewtype = mb_strtolower($data["viewtype"]);
		$properties->routeid = mb_strtolower($data["routeid"]);
		$properties->itemid = mb_strtolower($data["itemid"]);
		$properties->leaf = $data["leaf"];
		$properties->selectable = $data["selectable"];
		$properties->expanded = $data["expanded"];
		$properties->modtype = $data["modtype"];
		// insert or update
		if($id){
			$properties->updated_by = $data["userid"];
			$properties->updated_at = now();
		}else{
			$properties->created_by = $data["userid"];
			$properties->created_at = now();
		}
		//save the record
		$properties->save();

		return  $properties->id ?  true : false;
	}

	/**
	 * Delete the record
	 *
	 * @param int $id
	 * @return bool
	 */
	public function delete(int $id) : bool
	{
		$properties = Properties::find($id);
		return $properties->delete();
	}
}
