<?php

namespace App\Http\Controllers\Systems\ACL;

use App\Helpers\Helper;
use App\Http\Controllers\ApiController;
use App\Http\Resources\Systems\Modules\ModuleCollection;
use App\Http\Resources\Systems\Modules\ModuleViewCollection;
use App\Models\Systems\ACL\AclModule;
use App\Models\Systems\ACL\AclSubModule;
use App\Models\Systems\Modules\Module;
use App\Models\Systems\Modules\ModuleView;
use App\Models\Systems\Modules\SubModule;
use App\Models\Systems\Modules\SubModuleView;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\DataHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AclController extends ApiController
{
    use JsonRespondTrait, TranslationTrait;


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}



	public function accessRole()
	{

	}
	/**
	 * Set Menu Navigation
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function index(Request $request)
	{
		//set the modules
		$modules = Module::where("locale",$this->getLocale())->orderBy("seq","asc")->paginate(5);

	}
	/**
	 * Set Menu Navigation
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function treeList(Request $request)
	{
		$condition = [
			"userid" => Auth::user()->getAuthIdentifier(),
			"smodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		$modules = AclModule::data($condition);
		$code = (int) $request->get("node") ;
		$jsonData = [
			"success" => true,
			"recordCount" => count($modules),
			"locale" => $this->getLocale(),
			"data" => $code ? $this->subModules($code) :  $modules
		];
		return $this->respond($jsonData);
	}
	/**
	 * Get the submodulesisModuleExists
	 *
	 * @param int $code
	 * @return array
	 */
	public function subModules(int $code) : array
	{
		$condition = [
			"smodcode" => $code,
			"userid" => Auth::user()->getAuthIdentifier(),
			"submodlocale" => $this->getLocale(),
			"deptlang" => $this->mappingLocale($this->getLocale())
		];
		return AclSubModule::data($condition,$code);
	}


}
