<?php

namespace App\Http\Controllers\Systems\Language;

use App\Helpers\Helper;
use App\Http\Resources\Systems\Languages\CountriesViewCollection;
use App\Traits\JsonRespondTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Systems\Language\CountriesView;


class CountriesController extends Controller
{
	use JsonRespondTrait;
	/**
	 * Provide countries list
	 *
	 * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
	 */
	public function index()
	{
		try {
			return new CountriesViewCollection( CountriesView::orderBy("code","asc")->get() );
		}catch (\Exception $e) {
			return  $this->respondWithError($e->getMessage());
		}
	}
}
