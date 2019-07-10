<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class CreateSysModulesView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    DB::statement("
			CREATE OR REPLACE VIEW sys_module_view 
		    AS select 
			    smod.*,
			    trans.text as transtext,
			    tlang.name as lang,
			    trans.LOCALE as locale,
			    ( select sview.FIRSTNAME || ' ' || sview.lastname from user_view sview where sview.anrede_lang='GER'and sview.id = smod.created_by) as createdby,
			    ( select sview.FIRSTNAME || ' ' || sview.lastname from user_view sview where sview.anrede_lang='GER'and sview.id = smod.updated_by) as updatedby 
			from SYS_MODULES smod 
			inner join TRANSLATOR_TRANSLATIONS trans on trans.item = smod.id
			left join TRANSLATOR_LANGUAGES tlang on trans.LOCALE = tlang.LOCALE
			where trans.TYPE='module'
	     "
	    );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
