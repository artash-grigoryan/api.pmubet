<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RunnerTranslation extends Model
{
    //
    protected $table = 'runners_translations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'runnerId',
        'name',
        'breed',
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
        'favorite',
        'signs',
        'tendency',
        'tendencySign',
    ];
}
