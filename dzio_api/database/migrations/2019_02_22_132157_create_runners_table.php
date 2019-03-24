<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRunnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //@TODO fix types
        Schema::create('runners', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->tinyInteger('number')->nullable();
            $table->string('breed')->nullable();
            $table->char('sex', 1)->nullable();
            $table->tinyInteger('age')->nullable();
            $table->string('dress')->nullable();
            $table->date('birthday')->nullable();
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
            $table->integer('raceId')->unsigned();

            $table->foreign('raceId')
                ->references('id')
                ->on('races')
                ->onDelete('cascade');
//            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('runners');
    }
}
