<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class Salutation extends JsonResource
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
		    "lettertext" => $this->letter_text,
		    "lang" => $this->lang,
		    "created_by" => $this->created_by,
		    "updated_by" => $this->updated_by,
		    "created_at" => $this->created_at,
		    "updated_at" => $this->updated_at,
	    ];
    }
}
