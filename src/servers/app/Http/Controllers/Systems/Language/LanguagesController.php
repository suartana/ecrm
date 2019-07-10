<?php

namespace App\Http\Controllers\Systems\Language;

use App\Http\Resources\Systems\Languages\LanguagesCollection;
use App\Models\Systems\Language\Languages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LanguagesController extends Controller
{
	/**
	 * Provide languages list
	 *
	 * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
	 */
	public function index()
	{
		try{
			return new LanguagesCollection(Languages::orderBy("pdc_id","asc")->get());
		}catch (\Exception $e){
			return  $this->respondWithError($e->getMessage());
		}
	}
}
