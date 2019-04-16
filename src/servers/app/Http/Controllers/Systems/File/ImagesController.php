<?php

namespace App\Http\Controllers\Systems\File;

use App\Utils\Util;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}
	/**
	 * Display images
	 *
	 * @param $filename
	 * @return mixed
	 */
	public function displayImage(Request $request)
	{
		$filename = "images/userprofile/".$request->filename;
		$path = Storage::disk("public")->get($filename);
		$exists = Storage::disk('public')->exists($filename);
		return !$exists ? abort(404) : $path;
	}
}
