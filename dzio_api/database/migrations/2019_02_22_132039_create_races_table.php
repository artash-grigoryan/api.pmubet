<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('races', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('raceDescription');
            $table->longText('raceGender');
            $table->longText('raceNumber');
            $table->longText('label');
            $table->longText('labelLong');
            $table->longText('distance');
            $table->longText('raceType');
            $table->longText('discipline');
            $table->longText('date');
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
        Schema::dropIfExists('races');
    }
}
