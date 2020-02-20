<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

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

    public function hasTranslation()
    {
        return $this->hasMany('App\RunnerTranslation', "runnerId")->exists();
    }

    public function race()
    {
        return $this->belongsTo('App\Race', "raceId");
    }

    public function translation()
    {
        $locale = App::getLocale();

        return $this->hasOne('App\RunnerTranslation', "runnerId")->where('lang', $locale);
    }

    public function translations()
    {
        return $this->hasMany('App\RunnerTranslation', "runnerId")->select('lang');
    }
}
