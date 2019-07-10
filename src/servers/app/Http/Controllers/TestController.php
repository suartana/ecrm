<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Systems\Modules\Module;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Http\Request;

class TestController extends Controller
{
	use JsonRespondTrait, TranslationTrait;

	public function test()
	{
		//set the modules
		$modules = Module::orderBy("seq","asc")->get();

		$mods = [];
		foreach ($modules as $key => $module){
			Helper::pre($module->id);
			Helper::pre($module->translation[0]->text);
			Helper::pre($module->properties->viewtype);
			Helper::pre($module->properties->itemid);
		}
	}
}
