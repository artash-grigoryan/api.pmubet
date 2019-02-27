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
        'raceId', 'raceDescription', 'raceGender', 'raceNumber', 'label', 'labelLong', 'distance', 'raceType', 'discipline', 'date'
    ];
}
