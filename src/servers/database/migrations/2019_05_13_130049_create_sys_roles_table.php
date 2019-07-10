<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_roles', function (Blueprint $table) {
            $table->increments('id');
	        $table->integer("code");
	        $table->integer("deptluid");
            $table->integer("modcode")->unsigned()->index()->foreign()->references("id")->on("sys_modules")->onDelete("cascade");
	       $table->tinyInteger("modtype")->default(1);
	        $table->tinyInteger("mcreate");
	        $table->tinyInteger("mread")->default(1);
	        $table->tinyInteger("mupdate");
	        $table->tinyInteger("mdelete");
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
        Schema::dropIfExists('sys_roles');
    }
}
