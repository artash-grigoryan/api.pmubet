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
            $table->longText('description')->nullable();
            $table->string('gender')->nullable();
            $table->integer('valnomPrixCourse')->nullable();

            $table->string('totalAllocation')->nullable();
            $table->string('firstAllocation')->nullable();
            $table->string('secondAllocation')->nullable();
            $table->string('thirdAllocation')->nullable();
            $table->string('fourthAllocation')->nullable();
            $table->string('fifthAllocation')->nullable();
            $table->string('sixthAllocation')->nullable();
            $table->string('seventhAllocation')->nullable();

            $table->integer('number')->nullable();
            $table->integer('externNumber')->nullable();
            $table->longText('label')->nullable();
            $table->text('labelLong')->nullable();
            $table->integer('distance')->nullable();
            $table->text('type')->nullable();
            $table->text('discipline')->nullable();
            $table->timestamp('date')->nullable();
            $table->char('countryCode', 3)->nullable();
            $table->longText('comment')->nullable();
            $table->integer('reunionId')->unsigned();

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
//        Schema::dropIfExists('races');
    }
}
