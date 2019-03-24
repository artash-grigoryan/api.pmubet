<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bets', function (Blueprint $table) {
            $table->integer('code');
            $table->string('lib')->nullable();
            $table->string('libLong')->nullable();
            $table->integer('raceId')->unsigned();

            $table->primary(array('code', 'raceId'));

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
        Schema::dropIfExists('bets');
    }
}
