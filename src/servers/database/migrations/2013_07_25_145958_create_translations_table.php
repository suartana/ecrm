<?php

use Illuminate\Database\Migrations\Migration;

class CreateTranslationsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('translator_translations', function ($table) {
            $table->increments('id');
            $table->string('locale', 6);
            $table->string('namespace', 150)->default('*');
            $table->string('type', 150);
            $table->string('item', 150);
            $table->text('text');
            $table->boolean('unstable')->default(false);
            $table->boolean('locked')->default(false);
            $table->foreign('locale')->references('locale')->on('translator_languages');
            $table->unique(['locale', 'namespace', 'type', 'item']);
            $table->string("created_by");
	        $table->string("updated_by");
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
        Schema::drop('translator_translations');
    }

}
