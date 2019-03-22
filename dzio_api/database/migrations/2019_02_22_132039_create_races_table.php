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
            $table->integer('valnomPrixCourse');

            $table->string('totalAllocation');
            $table->string('firstAllocation');
            $table->string('secondAllocation');
            $table->string('thirdAllocation');
            $table->string('fourthAllocation');
            $table->string('fifthAllocation');
            $table->string('sixthAllocation');
            $table->string('seventhAllocation');

            $table->integer('raceNumber');
            $table->integer('raceExternNumber');
            $table->longText('label');
            $table->text('labelLong');
            $table->integer('distance');
            $table->tinyInteger('raceType');
            $table->text('discipline');
            $table->date('date');
            $table->date('countryCode');
            $table->integer('reunionId')->unsigned();;

            $table->foreign('reunionId')
                ->references('id')
                ->on('reunions')
                ->onDelete('cascade');
//            $table->timestamps();
        });
    }


//countryCode

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
