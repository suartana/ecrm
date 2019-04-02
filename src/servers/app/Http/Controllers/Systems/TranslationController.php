<?php

namespace App\Http\Controllers\Systems;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class TranslationController extends Controller
{
	/**
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function jstranslations(Request $request){
		$request = $request ? $request : null;
		$translation = [
			'success' => true,
			"translation" => ["pass" => Hash::make("gedebali")]
		];
		return  response()->json($translation);
	}
}
