<?php

namespace App\Http\Controllers\Systems\Language;

use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Session;
use Config;

class TranslationController extends Controller
{
	use TranslationTrait, JsonRespondTrait;

	public function jstranslations ()
	{
		return $this->respond($this->translations());
	}

	/**
	 * Set locale if it's allowed.
	 *
	 * @param Request $request
	 */
	public function setLocale(Request $request)
	{

		$config =  Config::get('translator.available');
		$locale = $request->get("lang");
		// Check if is allowed and set default locale if not
		if (!in_array($locale,$config)) {
			$locale = Config::get('app.locale');
		}

		Session::put("locale", $locale);

		if (Auth::check()) {
			Auth::user()->setAttribute('locale', $locale)->save();
		}

		return $this->respond([
			"success" => $locale ==  Session::get("locale") ? true : false,
			"datalang" => $this->translations(),
			"message" => $locale ==  Session::get("locale")? $this->translate("info","LanguageChange") : $this->translate("error", "reportAdmin")
		]);
	}


}
