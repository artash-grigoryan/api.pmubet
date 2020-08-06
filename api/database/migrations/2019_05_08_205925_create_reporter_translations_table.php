<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReporterTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporters_translations', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer("reporterId")->unsigned();
            $table->string('societe');
            $table->string('reporter');
            $table->char("lang", 3)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::dropIfExists('reporters_translations');
    }
}
