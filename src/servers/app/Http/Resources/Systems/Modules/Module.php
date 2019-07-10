<?php

namespace App\Http\Resources\Systems\Modules;

use App\Helpers\DateHelper;
use App\Models\Systems\Language\Translation;
use App\Traits\TranslationTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class Module extends JsonResource
{
	use TranslationTrait;
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
			"descr" => $this->descr,
			"created_by" => $this->created_by,
			"updated_by" => $this->updated_by,
			"created_at" => DateHelper::getTimestamp($this->created_at),
			"updated_at" => DateHelper::getTimestamp($this->updated_at),
			"seq" => $this->seq
		];
	}
}
