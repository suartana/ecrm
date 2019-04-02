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
            tb1.cic_id,tb1.fk_ccu_id,tb1.cic_status,tb2.ccu_id,tb2.ccu_name,
            (select concat(tb3.fname,' ',tb3.lname) as createdBy from auth_users tb3 where tb3.id = tb1.created_by) as createdBy , 
            (select concat(tb4.fname,' ',tb4.lname) as updatedBy from auth_users tb4 where tb4.id = tb1.updated_by) as updatedBy,
            tb1.created_at,tb1.updated_at,tb3.fcs_name
            from crm_isin_currency tb1 
            join crm_currency tb2 on tb2.ccu_id = tb1.fk_ccu_id    
            join sys_status tb3 on tb1.cic_status = tb3.fcs_id
            ");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::statement( 'DROP VIEW vw_crm_isin_base' );
	}
}
