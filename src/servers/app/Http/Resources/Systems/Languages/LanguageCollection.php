<?php

namespace App\Http\Resources\Systems\Languages;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LanguageCollection extends ResourceCollection
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
		    'data' => $this->collection,
		    'success' => $this->collection ? true : false
	    ];
    }
}