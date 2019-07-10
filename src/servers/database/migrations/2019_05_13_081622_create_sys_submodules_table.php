<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysSubmodulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_submodules', function (Blueprint $table) {
	        $table->increments('id');
	        $table->integer("modcode");
	        $table->integer("code");
	        $table->string("descr");
	        $table->string("locale",2);
	        $table->tinyInteger('status')->default(0);
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
        Schema::dropIfExists('sys_submodules');
    }
}
