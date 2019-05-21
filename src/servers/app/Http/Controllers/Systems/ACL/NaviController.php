<?php

namespace App\Http\Controllers\Systems\ACL;

use App\Models\Systems\Modules\Module;
use App\Models\Systems\Modules\Properties;
use App\Models\Systems\Modules\SubModule;
use App\Traits\TranslationTrait;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NaviController extends Controller
{
	use TranslationTrait;
	/**
	 * Set Menu Navigation
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function index(Request $request)
	{
		$modules = Module::where("locale",$this->getLocale())->orderBy("seq","asc")->get();

		//dd($modules);
		$mods = [];
		foreach ($modules as $key => $module){
			//Util::dump($module->properties);
			$subMods = $this->getSubModules($module->code);
			$subMods ? $mods[] = [
				'text' => $module->descr,
				'iconCls'=> $module->properties->iconcls,
				'rowCls'=> $module->properties->rowcls,
//				'viewType'=> $module->properties->viewtype ? Util::clean($module->properties->viewtype) : "",
//				'leaf'=> false,
//				'expanded'=> false,
//				'selectable'=> false,
				'children'  => $subMods
			] :
			$mods[] = [
				'text' => $module->descr,
				'iconCls'=> $module->properties->iconcls,
				'rowCls'=> $module->properties->rowcls,
				'viewType'=> $module->properties->viewtype ? Util::clean($module->properties->viewtype) : "",
				'routeId' => $module->properties->routeid ? Util::clean($module->properties->routeid) : "",
				'itemId'=> $module->code ? Util::clean($module->code) : "",
				'leaf'=> $module->properties->leaf ? true : false
			];
		}

		$jsonData = [
			"success" => true,
			"data" => $mods
		];

		return response()->json($jsonData);

	}

	/**
	 * Set Menu Navigation
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function treeList(Request $request)
	{
		$modules = Module::where("locale",$this->getLocale())->orderBy("seq","asc")->get();
		$mods = [];
		foreach ($modules as $key => $module){
			//Util::dump($module->properties);
			$subMods = $this->getSubModules($module->code);
			$subMods ? $mods[] = [
				'text' => $module->descr,
				'iconCls'=> $module->properties->iconcls,
				'rowCls'=> $module->properties->rowcls,
//				'viewType'=> $module->properties->viewtype ? Util::clean($module->properties->viewtype) : "",
//				'leaf'=> false,
				'itemId'=> $module->code,
				'id'=> $module->code,
				'expanded'=> false,
				'selectable'=> true,
				'children'  => $subMods ? true : false
			] :
				$mods[] = [
					'text' => $module->descr,
					'iconCls'=> $module->properties->iconcls,
					'rowCls'=> $module->properties->rowcls,
					'viewType'=> $module->properties->viewtype ? Util::clean($module->properties->viewtype) : "",
					'routeId' => $module->properties->routeid ? Util::clean($module->properties->routeid) : "",
					'itemId'=> $module->code ? Util::clean($module->code) : "",
					'leaf'=> $module->properties->leaf ? true : false
				];
		}
		$code = (int) $request->get("node") ;
		$jsonData = [
			"success" => true,
			"data" => $code ? $this->getSubModules($code) :  $mods
		];
		return response()->json($jsonData);
	}

	/**
	 * Get the submodules
	 *
	 * @param int $code
	 * @return array
	 */
	private function getSubModules(int $code)
	{
		$submodules = SubModule::where([["locale",$this->getLocale()],["sysmodid",$code]])->orderBy("seq","asc")->get();
		$submods = [];
		if($submodules){
			foreach ($submodules as $key => $submodule){
				if ($code == $submodule->sysmodid){
					$submods[] = [
						'text' => $submodule->descr,
						'iconCls'=> $submodule->properties->iconcls,
						'viewType'=> $submodule->properties->viewtype ? Util::clean($submodule->properties->viewtype) : "",
						'leaf'=>  true
					];
				}
			}
		}
		return $submods;
	}
}
