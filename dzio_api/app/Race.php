<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    protected $table = 'races';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'raceId',
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
        'label',
        'labelLong',
        'distance',
        'raceType',
        'discipline',
        'date',
        'countryCode',
        'distance'

    ];

    public function runners()
    {
        return $this->hasMany('App\Runner');
    }
}
