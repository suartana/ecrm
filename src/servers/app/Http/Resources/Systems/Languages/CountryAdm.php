<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryAdm extends JsonResource
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
		    "country" => $this->country,
		    "default_lang" => $this->default_lang,
		    "postal_prefix" => $this->postal_prefix,
		    "phone_prefix" => $this->phone_prefix,
		    "postcode_format" => $this->postcode_format,
		    "postcode_regex" => $this->postcode_regex,
		    "cdate" => $this->cdate,
		    "cemp" => $this->cemp,
		    "udate" => $this->udate,
		    "uemp" => $this->uemp,
	    ];
    }
}
