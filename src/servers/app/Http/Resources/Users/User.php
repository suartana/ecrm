<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
		    "code" => $this->code,
		    "descr" => $this->descr,
		    "locale" => $this->locale,
		    "created_by" => $this->created_by,
		    "updated_by" => $this->updated_by,
		    "created_at" => $this->created_at,
		    "updated_at" => $this->updated_at,
		    "seq" => $this->seq,
	    ];
    }
}
