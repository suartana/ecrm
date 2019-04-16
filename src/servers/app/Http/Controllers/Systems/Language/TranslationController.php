<?php

namespace App\Http\Controllers\Systems\Language;

use App\Traits\JsonRespondController;
use App\Traits\Translatetable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Session;
use Config;

class TranslationController extends Controller
{
	use Translatetable, JsonRespondController;

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

		if (Auth::check()) {
			Auth::user()->setAttribute('locale', $locale)->save();
		} else {
			Session::put("locale", $locale);
		}

		return $this->respond([
			"success" => $locale ==  Session::get("locale") ? true : false,
			"message" => $locale ==  Session::get("locale")? $this->translate("info","languageChange") : $this->translate("error", "reportAdmin")
		]);
	}


}
