<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\JsonResource;

class Country extends JsonResource
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
		    "iso_code" => $this->iso_code,
		    "descr" => $this->descr,
		    "pdc_id" => $this->pdc_id,
		    "deutsche_post" => $this->deutsche_post,
		    "eu_flag" => $this->eu_flag,
		    "active" => $this->active,
		    "cdate" => $this->cdate,
		    "cemp" => $this->cemp,
		    "udate" => $this->udate,
		    "uemp" => $this->uemp,
	    ];
    }
}
