<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_user', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->string("emp")->unique();
            $table->string("api_token")->nullable();
            $table->string("remember_token")->nullable();
            $table->string("email");
            $table->string("password");
            $table->integer("status",2)->default("0");
            $table->timestamp("lastlogin")->nullable();
            $table->integer("created_by")->nullable();
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
        Schema::dropIfExists('sys_user');
    }
}
