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
	        $table->integer("sysmodcode")->unsigned()->index()->foreign()->references("code")->on("sys_modules")->onDelete("cascade");
	        $table->integer("syssubmodcode")->nullable()->unsigned()->index()->foreign()->references("code")->on("sys_submodules")->onDelete("cascade");
	        $table->string("iconcls")->nullable();
	        $table->string("rowCls")->nullable();
	        $table->string("viewtype")->nullable();
	        $table->char("routeid")->nullable();
	        $table->char("itemid")->nullable();
	        $table->char("leaf")->nullable();
	        $table->char("selectable")->nullable();
	        $table->char("expanded")->nullable();
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
