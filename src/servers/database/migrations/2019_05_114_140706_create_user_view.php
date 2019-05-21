<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class CreateUserView extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// create view

		DB::statement( "
           CREATE OR REPLACE VIEW user_view
        	AS select 
				tb1.emp,
				tb1.anrede,
				tb3.DESCR,
				tb1.firstname,
				tb1.lastname,
				tb1.addr,
				tb1.postcode,
				tb1.town,
				tb1.dept,
				tb1.team,
				tb1.cref,
				tb1.compid,
				tb1.phone,
				tb1.iphone,
				tb1.mobile,
				tb1.sid,
				tb1.lang as userlang,
				tb1.country,
				tb1.OCCUPATION_STR,
				tb1.img,
				tb2.API_TOKEN,
				tb2.REMEMBER_TOKEN,
				tb2.LASTLOGIN,
				tb2.EMAIL,
				tb2.PASSWORD,
				tb2.STATUS,
				tb2.CREATED_AT,
				tb2.CREATED_BY,
				tb2.UPDATED_AT,
				tb2.UPDATED_BY,
				tb2.ID,
				tb3.LANG as anrede_lang
			from emp_adm tb1 
			inner JOIN sys_user tb2 on tb1.emp = tb2.emp
			left join anrede_lu tb3 on tb1.ANREDE = tb3.CODE
            ");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//DB::statement( 'DROP VIEW user_view' );
	}
}
