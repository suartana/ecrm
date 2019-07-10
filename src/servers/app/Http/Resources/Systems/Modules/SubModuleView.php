<?php

namespace App\Http\Resources\Systems\Modules;

use App\Helpers\DateHelper;
use App\Traits\ModuleTrait;
use App\Traits\TranslationTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class SubModuleView extends JsonResource
{
    use TranslationTrait,
	    ModuleTrait;
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
		    "modcode" => $this->modcode,
		    "code" => $this->code,
		    "status" => $this->status,
		    "descr" => $this->descr,
		    "transtext" => $this->transtext,
		    "locale" => $this->locale,
		    "lang" => $this->lang,
		    "createdby" => $this->createdby,
		    "updatedby" => $this->updatedby,
		    "created_at" => DateHelper::getTimestamp($this->created_at),
		    "updated_at" => DateHelper::getTimestamp($this->updated_at),
		    "seq" => $this->seq,
		    "languages" => $this->moduleTranslation($this->code),
		    "properties" => $this->moduleProperties($this->id)
	    ];
    }
}
