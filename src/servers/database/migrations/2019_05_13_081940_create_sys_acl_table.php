<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysAclTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_acl', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("acltypeid");
            $table->integer("sysuserid")->unsigned()->index()->foreign()->references("id")->on("sys_user")->onDelete("cascade");
            $table->integer("roleid")->unsigned()->index()->foreign()->references("id")->on("sys_roles")->onDelete("cascade");;
	        $table->integer("specroleid")->nullable()->unsigned()->index();
	        $table->text("note")->nullable();
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
        Schema::dropIfExists('sys_acl');
    }
}
