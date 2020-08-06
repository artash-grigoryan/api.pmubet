<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBetTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bets_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lib')->nullable();
            $table->string('libLong')->nullable();
            $table->integer('betId')->unsigned();
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
//        Schema::dropIfExists('bets_translations');
    }
}
