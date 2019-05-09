<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRunnerTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('runner_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('runnerId')->unsigned();
            $table->string('name')->nullable();
            $table->string('breed')->nullable();
            $table->string('dress')->nullable();
            $table->string('color')->nullable();
            $table->string('father')->nullable();
            $table->string('mother')->nullable();
            $table->string('owner')->nullable();
            $table->string('coach')->nullable();
            $table->string('jokey')->nullable();
            $table->string('farmer')->nullable();
            $table->string('rank')->nullable();
            $table->string('textRank')->nullable();
            $table->string('reductionKm')->nullable();
            $table->string('time')->nullable();
            $table->text('comment')->nullable();
            $table->integer('nbRaces')->nullable();
            $table->integer('nbRacesWon')->nullable();
            $table->integer('nbPlaces')->nullable();
            $table->text('favorite')->nullable();
            $table->text('signs')->nullable();
            $table->text('tendency')->nullable();
            $table->text('tendencySign')->nullable();
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
        Schema::dropIfExists('runner_translations');
    }
}
