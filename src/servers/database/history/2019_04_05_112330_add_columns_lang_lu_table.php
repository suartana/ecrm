<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 *
 *
 * Class AddColumnsLangLuTable
 */
class AddColumnsLangLuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
	    Schema::table('lang_lu', function (Blueprint $table) {
	    	$table->integer('lang_id')->nullable();
		    $table->integer('status')->default(0)->after('nls_lang');
	    });

	    DB::statement("update lang_lu set lang_id = rownum");

	    DB::statement("alter table lang_lu modify lang_id number(10) not null");

	    DB::statement("ALTER TABLE  lang_lu  ADD CONSTRAINT lang_lu_id_pk PRIMARY KEY (lang_id)");

	    DB::statement("CREATE SEQUENCE  LANG_LU_ID_SEQ START WITH 31 INCREMENT BY 1 NOCACHE ");

	    DB::statement("
	      create or replace trigger lang_lu_id_trg
            before insert on lang_lu
            for each row
                begin
            if :new.lang_id is null then
                select LANG_LU_ID_SEQ.nextval into :new.lang_id from dual;
            end if;
            end;
	    ");
    }

    /**
     * Reverse the migrations.9
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
