<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\JsonResource;

class Language extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
	    return [
		    "id" => $this->id,
		    "locale" => $this->locale,
		    "name" => $this->name,
		    "flag" => $this->setFlag($this->locale)
	    ];
    }

	/**
	 * Provide img country flag
	 *
	 * @param string $locale
	 * @return string
	 */
    private function setFlag(string $locale) : string
    {
    	switch ($locale){
		    case 'en':
		    	    $img = "uk_flag";
		        break;
		    case 'de':
			        $img = "ge_flag";
			    break;
		    case 'fr':
			        $img = "fr_flag";
			    break;
		    case 'it':
			        $img = "it_flag";
			    break;
	    }
	    $imgsrc = "<img src='resources/images/icons/{$img}.png'>";
	    return $imgsrc;
    }
}
