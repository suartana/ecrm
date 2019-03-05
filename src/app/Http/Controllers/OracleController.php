<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OracleController extends Controller
{
    //
     //
     public function index()
     {
        //phpinfo(); exit;
        //$data = DB::connection("oracle")->table("users")->get();
        $data = DB::table('emp_adm')->get();
        var_dump($data);
     }
}
