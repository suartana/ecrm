<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysModulesPropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_modules_properties', function (Blueprint $table) {
	        $table->increments('id');
	        $table->integer("code")->index();
	        $table->string("iconcls",256)->nullable();
	        $table->string("rowCls",256)->nullable();
	        $table->string("viewtype")->nullable();
	        $table->char("routeid")->nullable();
	        $table->char("itemid")->nullable();
	        $table->char("leaf")->nullable();
	        $table->char("selectable")->nullable();
	        $table->char("expanded")->nullable();
	        $table->tinyInteger("modtype")->default(1);
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
        Schema::dropIfExists('sys_modules_properties');
    }
}
