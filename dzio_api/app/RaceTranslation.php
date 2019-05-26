<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RaceTranslation extends Model
{
    //
    protected $table = 'races_translations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'raceId',
        'raceDescription',
        'raceGender',
        'label',
        'labelLong',
        'distance',
        'raceType',
        'discipline',
        'date',
        'countryCode',
        'comment',
    ];
}
