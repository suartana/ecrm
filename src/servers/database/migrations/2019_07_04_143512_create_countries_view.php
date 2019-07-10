<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateCountriesView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    DB::statement("
            CREATE OR REPLACE VIEW countries_view 
		    AS select 
			    cou.descr, 
			    cou.code, 
			    cou.EU_FLAG as  flag,
			    cou.active, 
			    cdm.DEFAULT_LANG as deflang, 
			    cdm.PHONE_PREFIX  as postprefix,
			    cdm.PHONE_PREFIX as phoneprefix,
			    cdm.POSTCODE_FORMAT as postformat,
			    cdm.POSTCODE_REGEXP as postregex
			from country_lu cou left join country_adm cdm on cou.CODE = cdm.country
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries_view');
    }
}
