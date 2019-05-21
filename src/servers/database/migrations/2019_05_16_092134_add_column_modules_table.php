<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

	    //
	    Schema::table('sys_modules', function (Blueprint $table) {
		    $table->tinyInteger('seq')->nullable()->after("id");
	    });

	    //
	    Schema::table('sys_submodules', function (Blueprint $table) {
		    $table->tinyInteger('seq')->nullable()->after("id");
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
