<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class UserView extends JsonResource
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
		    "compid" => $this->compid,
		    "emp" => $this->emp,
		    "salutation" => $this->anrede,
		    "salutation_lang" => $this->anrede_lang,
		    "country" => $this->country,
		    "cref" => $this->cref,
		    "dept" => $this->dept,
		    "descr" => $this->descr,
		    "email" => $this->email,
		    "firstname" => $this->firstname,
		    "lastname" => $this->lastname,
		    "occupation" => $this->occupation_str,
		    "addr" => $this->addr,
		    "mobile" => $this->mobile,
		    "phone" => $this->phone,
		    "postcode" => $this->postcode,
		    "sid" => $this->sid,
		    "status" => $this->status,
		    "team" => $this->team,
		    "town" =>$this->town,
		    "img" => $this->img,
		    "userlang" => $this->userlang,
		    "created_by" => $this->created_by,
		    "updated_by" => $this->updated_by,
		    "created_at" => $this->created_at,
		    "updated_at" => $this->updated_at,
	    ];
    }
}
