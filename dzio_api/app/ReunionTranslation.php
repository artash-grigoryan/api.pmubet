<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReunionTranslation extends Model
{
    //
    protected $table = 'reunions_translations';
    public $timestamps = false;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'reunionId',
        'statusLabel',
        'label',
        'speciality',
        'audience',
        'category',
        'type',
        'code',
        'date',
        'externNumber',
        'number',
        "audience",
        "progvalid",
        "hippodromeName",
        "racesNumber",
    ];
}
