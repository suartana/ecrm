<?php

namespace App\Http\Controllers\Systems\Modules;

use App\Helpers\Helper;
use App\Http\Resources\Systems\Modules\ModuleResource;
use App\Http\Resources\Systems\Modules\ModuleViewCollection;
use App\Http\Resources\Systems\Modules\SubModuleViewCollection;
use App\Models\Systems\Modules\ModuleView;
use App\Services\Systems\Modules\ModuleService;
use App\Services\Systems\Modules\PropertiesService;
use App\Services\Systems\Modules\SubmoduleService;
use App\Traits\AclTrait;
use App\Traits\JsonRespondTrait;
use App\Traits\ModuleTrait;
use App\Traits\TranslationTrait;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Query\QueryException;
use Dotenv\Exception\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class ModuleController
 * @package App\Http\Controllers\Systems\Modules
 */
class ModuleController extends Controller
{
    use JsonRespondTrait, TranslationTrait, AclTrait, ModuleTrait;
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Provide module list
	 *
	 * @access limited
	 * @param Request $request
	 * @return ModuleViewCollection
	 */
	public function index(Request $request)
    {
	    $sort = $this->decode($request->sort);
	    $lang = $request->lang ? mb_strtolower($request->lang) : $this->getLocale();
	    $modules = ModuleView::where("locale","=","$lang")->orderBy($sort->property,$sort->direction)->paginate($request->limit);
	    return new ModuleViewCollection($modules);
    }

	/**
	 * Provide submodule list
	 *
	 * @access limited
	 * @param Request $request
	 * @return SubModuleViewCollection
	 */
    public function submodule(Request $request)
    {
	    $sort = $this->decode($request->sort);
	    $lang = $request->lang ? mb_strtolower($request->lang) : $this->getLocale();
	    $condition= [
	    	"locale" => $lang,
		    "modcode" => $request->modcode
	    ];

	    $submodules = \App\Models\Systems\Modules\SubModuleView::where($condition)
		                ->orderBy($sort->property,$sort->direction)->paginate($request->limit);

	    return new SubModuleViewCollection($submodules);
    }

	/**
	 * Save the data record into the module and translation_translator tables
	 *
	 * @access limited
	 * @param Request $request
	 * @param ModuleService $moduleService
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function save(Request $request, ModuleService $moduleService)
	{

		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ;
			//define user permission
			if(!$this->acl("create","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToCreateThisItem"));
			}
			// set module service
			if($moduleService->execute($request->all() + ['userid' => $userId] )){
				$data = [
					"success" => true,
					"update" => $request->get("id") ? true : false,
					"message" => $this->translate("info","TheDataHasBeenSaved")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery();
		}
	}

	/**
	 * Delete module from the Table
	 *
	 * @access limited
	 * @param Request $request
	 * @param ModuleService $moduleService
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function delete(Request $request, ModuleService $moduleService)
	{
		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ;
			//define user permission
			if(!$this->acl("delete","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToDeleteThisItem"));
			}
			if($this->getModuleChilds( (int) $request->get("id"))){
				return $this->respondItemHasChilds($this->translate("error","YouCannotDeleteAItemThatHasChildItems"));
			}else {
				// set module service
				if ($moduleService->delete($request->all() + ['userid' => $userId])) {
					$data = [
						"success" => true,
						"message" => $this->translate("info", "TheDataHasBeenDeleted")
					];
					return $this->respond($data);
				} else {
					return $this->respondValidatorFailed($this->translate("error", "ReportAdmin"));
				}
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery();
		}
	}

	/**
	 * Save the module properties [insert or update a record]
	 *
	 * @access limited
	 * @param Request $request
	 * @param PropertiesService $propertiesService
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function saveProperties(Request $request, PropertiesService $propertiesService)
	{

		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ; //Helper::xdump($request->all());
			//define user permission
			if(!$this->acl("create","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToDeleteThisItem"));
			}

			$modtype = $request->get("submodulecode") ? 2 : 1;
			//save the record into the table
			if($propertiesService->execute($request->all() + ['userid' => $userId, "modtype" => $modtype])){
				$data = [
					"success" => true,
					"message" => $this->translate("info","TheDataHasBeenSaved")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery($e->getMessage());
		}
	}

	/**
	 * Delete module properties from the record
	 *
	 * @access limited
	 * @param Request $request
	 * @param PropertiesService $propertiesService
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function deleteProperties(Request $request, PropertiesService $propertiesService)
	{
		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ;
			//define user permission
			if(!$this->acl("delete","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToDeleteThisItem"));
			}

			//save the record into the table
			if($propertiesService->delete((int) $request->get("id") )){
				$data = [
					"success" => true,
					"message" => $this->translate("info","TheDataHasBeenDeleted")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery();
		}
	}

	public function saveSubModule(Request $request, SubmoduleService $submoduleService)
	{

		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ;
			//define user permission
			if(!$this->acl("create","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToCreateThisItem"));
			}
			// set submodule service
			if($submoduleService->execute($request->all() + ['userid' => $userId] )){
				$data = [
					"success" => true,
					"update" => $request->get("id") ? true : false,
					"message" => $this->translate("info","TheDataHasBeenSaved")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery();
		}
	}

	public function submoduleDelete(Request $request, SubmoduleService $submoduleService)
	{
		try {
			//set user id
			$userId = (int) Auth::user()->getAuthIdentifier() ;
			//define user permission
			if(!$this->acl("delete","aclsubmodule","module",$userId)){
				return $this->respondNoPermission($this->translate("error","YouDoNotHavePermissionToDeleteThisItem"));
			}

			//save the record into the table
			if($submoduleService->delete($request->all() + ['userid' => $userId] )){
				$data = [
					"success" => true,
					"message" => $this->translate("info","TheDataHasBeenDeleted")
				];
				return $this->respond($data);
			}else{
				return $this->respondValidatorFailed($this->translate("error","ReportAdmin"));
			}

		} catch (ModelNotFoundException $e) {
			return $this->respondNotFound();
		} catch (ValidationException $e) {
			return $this->respondValidatorFailed($e->validator);
		} catch (QueryException $e) {
			return $this->respondInvalidQuery();
		}
	}

}
