<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysUserDashboardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_user_dashboard', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("userid")->index();
	        $table->integer("code")->index();
            $table->string("xtype",256)->nullable();
	        $table->string("usercls",256)->nullable();
            $table->tinyInteger("modtype")->nullable();
            $table->tinyInteger("status")->default(1);
            $table->tinyInteger("seq");
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
        Schema::dropIfExists('sys_user_dashboard');
    }
}
