<?php
namespace App\Traits;


use App\Models\Systems\Language\Translation;
use App\Utils\Util;
use Illuminate\Support\Facades\Session;
use App;
use Config;

trait TranslationTrait
{


	/**
	 * Set the locale language
	 *
	 * @return string
	 */
	public function getLocale(): string
	{
		return Session::get("locale") ? Session::get("locale") : Config::get('app.locale') ;
	}


	/**
	 * Translation
	 *
	 * @param string $group
	 * @param string $key
	 * @return string
	 */
	public function translate(string $type, string $key)
	{   $locale     =  $this->getLocale();
		$translate  = Translation::select('text')->where(['type' => $type,'item' => $key,'locale' => $locale ])->first();
		return $translate ? $translate->text : $this->splitAtUpperCase($key);
	}

	/**
	 * Explode a string on upper case characters
	 *
	 * @param string $key
	 * @return string|string[]|null
	 */
	private function splitAtUpperCase(string $key)
	{
		return preg_replace('/([a-z0-9])?([A-Z])/','$1 $2',$key);
	}

	public function translateWithParams(string $group, string $key, array $params)
	{

	}
	/**
	 * Get all the translation
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function translations()
	{   $locale    =  $this->getLocale();
		$translate = Translation::select("text","type","item","locale")->where(["locale" =>$locale])->get();
		$translate = $translate ? $translate : false ;
		return $translate;
	}
}