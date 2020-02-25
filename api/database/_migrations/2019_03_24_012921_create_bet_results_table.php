<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBetResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bet_results', function (Blueprint $table) {

            $table->increments('id');
            $table->string('combinaisonRapDef');
            $table->string('code');
            $table->string('gagnant')->nullable();
            $table->string('gagnantMb')->nullable();
            $table->string('place')->nullable();
            $table->string('placeMb')->nullable();
            $table->string('typeReserveRapDef')->nullable();
            $table->string('sumMisesGagn')->nullable();
            $table->string('sumMisesPlace')->nullable();
            $table->string('sumMisesGagnTypeResRapDef')->nullable();
            $table->string('sumMisesWPlaceTypeResRapDef')->nullable();
            $table->integer("raceId")->unsigned();

            $table->foreign('raceId')
                ->references('id')
                ->on('races')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::dropIfExists('bet_results');
    }
}
