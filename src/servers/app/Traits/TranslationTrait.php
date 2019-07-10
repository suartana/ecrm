<?php
namespace App\Traits;


use App\Models\Systems\Language\Translation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App;
use Config;

trait TranslationTrait
{
	/**
	 * Translate external with internal locale
	 *
	 * @param string $lang
	 * @param bool $external
	 * @return string
	 */
	public function mappingLocale(string $lang, bool $external = true ):string
	{
		$mapping = $external ? [
			"GER" => "de",
			"ENG" => "en",
			"FRA" => "fr",
			"ITA" => "it"
		] :
		[
			"de" => "GER",
			"en" => "ENG",
			"fr" => "FRA",
			"it" => "ITA",
			"de" => "SWI"
		] ;

		$defaultLocale = $external ?  $this->getLocale() : "GER" ;

		return  $lang ? array_search($lang, $mapping) : $defaultLocale;
	}

	/**
	 * Set the locale language
	 *
	 * @return string
	 */
	public function getLocale(): string
	{
		$userlang = Auth::user() ? Auth::user()->lang : Config::get('app.locale');
		return Session::get("locale") ? Session::get("locale") : $userlang;
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

	/**
	 * Translation with parameters
	 *
	 * @param string $type
	 * @param string $item
	 * @param array $params
	 * @return mixed
	 */
	public function translateWithParams(string $type, string $item, array $params)
	{
		$locale     =  $this->getLocale();
		$condition = ['type' => $type,'item' => $item,'locale' => $locale ];
		$condition = is_array($params) ? array_merge($params,$condition) : $condition;
		$translate  = Translation::select('text')->where($condition)->get();
		return $translate;
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
	/**
	 * Provide module translations
	 *
	 * @param int $code
	 * @return Translation
	 */
	public function moduleTranslation(int $code)
	{
		$translation = Translation::select("id","locale","type","item","text")
			->where("item",$code)
			->orderBy("id","asc")->get();
		$data = [];
		foreach ($translation as $key => $trans){
			$data[$trans->locale] = [
				"id" => $trans->id,
				"locale" => $trans->locale,
				"type" => $trans->type,
				"item" => $trans->item,
				"text" => $trans->text,
			];
		}
		return $data;
	}
}
