<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BetResult extends Model {

    protected $table = 'bet_results';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'combinaisonRapDef',
        'code',
        'gagnant',
        'gagnantMb',
        'place',
        'placeMb',
        'typeReserveRapDef',
        'sumMisesGagn',
        'sumMisesPlace',
        'sumMisesGagnTypeResRapDef',
        'sumMisesWPlaceTypeResRapDef',
        'raceId',
    ];
}
