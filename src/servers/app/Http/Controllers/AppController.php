<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
	/**
	 * Show the application controller.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$token = ['token' => "" ];
		return view('index', $token);
	}

}
