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
            $table->string('name');
            $table->string('breed');
            $table->char('sex', 1);
            $table->tinyInteger('age');
            $table->string('dress');
            $table->string('birthday');
            $table->string('color');
            $table->string('father');
            $table->string('mother');
            $table->string('owner');
            $table->string('coach');
            $table->string('jokey');
            $table->string('farmer');
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
