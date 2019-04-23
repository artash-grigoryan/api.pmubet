<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Runner extends Model
{
    //
    protected $table = 'runners';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'number',
        'breed',
        'sex',
        'age',
        'dress',
        'birthday',
        'color',
        'father',
        'mother',
        'owner',
        'coach',
        'jokey',
        'farmer',
        'rank',
        'textRank',
        'reductionKm',
        'time',
        'comment',
        'nbRaces',
        'nbRacesWon',
        'nbPlaces',
        'reportRef',
        'reportEvol',
        'favorite',
        'signs',
        'tendency',
        'tendencySign',
        'doNotRun',
    ];
}
