<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\JsonResource;

class Languages extends JsonResource
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
	    	"langid" => $this->lang_id,
		    "code" => $this->code,
		    "descr" => $this->descr,
		    "xlang" => $this->x_lang,
		    "pdcid" => $this->pdc_id,
		    "cdate" => $this->cdate,
		    "cemp" => $this->cemp,
		    "udate" => $this->udate,
		    "uemp" => $this->uemp,
		    "status" => $this->status,
	    ];
    }
}
