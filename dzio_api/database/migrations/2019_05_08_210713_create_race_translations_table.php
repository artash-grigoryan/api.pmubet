<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRaceTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('races_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('raceId')->unsigned();
            $table->longText('description')->nullable();
            $table->string('gender')->nullable();
            $table->longText('label')->nullable();
            $table->text('labelLong')->nullable();
            $table->text('type')->nullable();
            $table->text('discipline')->nullable();
            $table->longText('comment')->nullable();
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
        Schema::dropIfExists('races_translations');
    }
}
