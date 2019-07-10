<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysFunctionModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_function_module', function (Blueprint $table) {
            $table->increments('id');
	        $table->integer("submodcode");
	        $table->integer("code");
	        $table->string("descr",256);
	        $table->string("xtype",256)->nullable();
	        $table->string("locale",2);
	        $table->integer("created_by");
	        $table->integer("updated_by")->nullable();
	        $table->softDeletes();
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
        Schema::dropIfExists('sys_function_module');
    }
}
