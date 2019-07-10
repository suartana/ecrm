<?php

namespace App\Http\Resources\Systems\Modules;

use App\Helpers\DateHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SubModule extends JsonResource
{
	/**
	 * Transform the resource collection into an array.
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
			"created_at" => DateHelper::getTimestamp($this->created_at),
			"updated_at" => DateHelper::getTimestamp($this->updated_at),
			"seq" => $this->seq,
			"languages" => $this->translation::where("item")
		];
	}
}
