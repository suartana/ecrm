<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class CreateSysSubmodulesView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE VIEW sys_submodule_view 
		    AS  select 
				submod.*,
				trans.text as transtext,
			    tlang.name as lang,
			    trans.LOCALE as locale,
				( select sview.FIRSTNAME || ' ' || sview.lastname from user_view sview where sview.anrede_lang='GER'and sview.id = submod.created_by) as createdby,
				( select sview.FIRSTNAME || ' ' || sview.lastname from user_view sview where sview.anrede_lang='GER'and sview.id = submod.updated_by) as updatedby 
			from SYS_SUBMODULES submod 
			inner join TRANSLATOR_TRANSLATIONS trans on trans.item = submod.code
			left join TRANSLATOR_LANGUAGES tlang on trans.LOCALE = tlang.LOCALE
			where trans.TYPE='submodule'
        ");
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
