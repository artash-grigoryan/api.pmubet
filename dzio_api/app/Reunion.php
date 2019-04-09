<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    /** @var string  */
    protected $table = 'reunions';

    public $timestamps = false;


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

    public function racesLite()
    {
        return $this->hasMany('App\Race', "reunionId");
    }

    public function races()
    {
        return $this->hasMany('App\Race', "reunionId")->with("bets")->with("runners")->with("betResults")->with('reporters');
    }


}
