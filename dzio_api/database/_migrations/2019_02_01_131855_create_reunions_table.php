<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReunionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reunions', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('statusLabel' )->nullable();
            $table->string('label')->nullable();
            $table->char('speciality', 50)->nullable();
            $table->text('category')->nullable();
            $table->char('type', 1)->nullable();
            $table->char('code', 3)->nullable();
            $table->timestamp('date');
            $table->tinyInteger('externNumber')->nullable();
            $table->tinyInteger('number')->nullable();
            $table->char("audience", 10)->nullable();
            $table->char("progvalid", 1)->nullable();
            $table->text("hippodromeName")->nullable();
            $table->tinyInteger('racesNumber')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::dropIfExists('reunions');
    }
}
