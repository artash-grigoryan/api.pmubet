<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    //
    protected $table = 'reunion';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
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

    public function races()
    {
        return $this->hasMany('App\Race', "reunionId");
    }
}
