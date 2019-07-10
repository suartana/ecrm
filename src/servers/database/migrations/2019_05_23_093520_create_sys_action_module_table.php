<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysActionModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_action_module', function (Blueprint $table) {
            $table->increments('id');
	        $table->integer("funcode");
	        $table->integer("code");
	        $table->string("descr")->nullable();
	        $table->string("locale",2);
	        $table->integer("created_by");
	        $table->integer("updated_by")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_action_module');
    }
}
