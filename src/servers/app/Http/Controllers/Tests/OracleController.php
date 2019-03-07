<?php

namespace App\Http\Controllers\Tests;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class OracleController extends Controller
{
	//
	public function index()
	{
		//phpinfo(); exit;
		//$data = DB::connection("oracle")->table("users")->get();

		//$data = DB::table('emp_adm')->get();
		//var_dump($data);
		return view ( 'welcome' );
	}
}
