<?php

namespace App\Services\Systems\Modules;

use App\Helpers\Helper;
use App\Models\Systems\Language\Translation;
use App\Models\Systems\Modules\Module;
use App\Models\Systems\Modules\SubModule;
use App\Services\BaseService;
use App\Traits\JsonRespondTrait;
use App\Traits\ModuleTrait;
use App\Traits\TranslationTrait;
use Illuminate\Support\Facades\DB;

/**
 * Class SubmoduleService.
 */
class SubmoduleService extends BaseService
{
    
    use JsonRespondTrait,
	    ModuleTrait,
        TranslationTrait;
    	/**
    	 * Set rules for the validation
    	 *
    	 * @return array
    	 */
    	public function rules()
    	{
    		return [
    			'descr' => 'required|string|max:256',
			    'code' => 'required|integer',
			    'modcode' => 'required|integer',
    		];
    	}

    	/**
    	 * Insert or Update data
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
		    $submodule         = $data["id"] ? SubModule::find($data["id"]) : new SubModule();
		    $prevSeq        = $submodule->seq;
		    //reorganize module sequence number
		    $this->reorganizeSubModuleSequenceNumber(
			    (int) $data["userid"],
			    $data["id"] ? "change" : "add",
			    (int) $data["seq"],
			    (int) $data["modcode"],
			    (int) $data["id"],
			    (int) $prevSeq
		    );

		    // set the params
		    $submodule->modcode  = (int) $data["modcode"];
		    $submodule->code  = (int) $data["code"];
		    $submodule->descr  = $data["descr"];
		    $submodule->seq    = $data["seq"];
		    $submodule->status    = 1;
		    //if pkey exists
		    if ($data["id"]) {
			    $submodule->updated_by = $data["userid"];
			    $submodule->updated_at = now();
		    } else {
			    $submodule->created_by = $data["userid"];
			    $submodule->created_at = now();
		    }
		    //save the record
		    $submodule->save();

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
			    $trans->item = $data["code"];
			    $trans->locale = $language;
			    $trans->type = "submodule";
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
    	 * Delete the record
    	 *
    	 * @param int $id
    	 * @return bool
    	 */
    	public function delete(array $data) : bool
    	{
    		//set id
    		$id = (int) $data["id"];
    		$submodule = SubModule::find($id);
    		$code = $submodule->code;
		    //reorganize submodule sequence number
		    $this->reorganizeModuleSequenceNumber(
			    (int) $data["userid"],
			    "delete",
			    (int) $submodule->seq,
			    $id,
			    false
		    );
		    $deleted = $submodule->delete();
		    return $deleted ? Translation::where("item",$code)->delete() : false;

    	}
}
