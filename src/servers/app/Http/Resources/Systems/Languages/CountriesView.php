<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\JsonResource;

class CountriesView extends JsonResource
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
		    "code" => $this->code,
		    "descr" => $this->descr,
		    "flag" => $this->flag,
		    "active" => $this->active,
		    "deflang" => $this->deflang,
		    "postprefix" => $this->postprefix,
		    "phoneprefix" => $this->phoneprefix,
		    "postformat" => $this->postformat,
		    "postregex" => $this->postregex,
	    ];
    }
}
