<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    protected $table = 'races';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'raceDescription',
        'raceGender',
        'valnomPrixCourse',
        'totalAllocation',
        'firstAllocation',
        'secondAllocation',
        'thirdAllocation',
        'fourthAllocation',
        'fifthAllocation',
        'sixthAllocation',
        'seventhAllocation',
        'raceNumber',
        'raceExternNumber',
        'label',
        'labelLong',
        'distance',
        'raceType',
        'discipline',
        'date',
        'countryCode',
        'comment',
    ];

    public function runners()
    {
        return $this->hasMany('App\Runner', "raceId");
    }

    public function bets()
    {
        return $this->hasMany('App\Bet', "raceId");
    }

    public function betResults()
    {
        return $this->hasMany('App\BetResult', 'raceId');
    }

    public function reporters()
    {
        return $this->hasMany('App\Reporter', 'raceId');
    }
}
