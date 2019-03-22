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
            $table->increments('id');
            $table->string('statusLabel');
            $table->string('label');
            $table->char('speciality', 50);
            $table->char('audience', 1);
            $table->text('category');
            $table->char('type', 1);
            $table->char('code', 3);
            $table->timestamp('date');
            $table->tinyInteger('externNumber');
            $table->tinyInteger('number');
            $table->char("audience", 1);
            $table->char("progvalid", 1);
            $table->text("hippodromeName");
            $table->tinyInteger('racesNumber');
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
        Schema::dropIfExists('reunions');
    }
}
