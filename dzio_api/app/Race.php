<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

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
        return $this->hasMany('App\Runner', "raceId")->with('translation');
    }

    public function reunion()
    {
        return $this->belongsTo('App\Reunion', "reunionId");
    }

    public function results()
    {
        return $this->hasMany('App\Runner', "raceId")
            ->whereNotNull('rank')
            ->orderBy('rank');
            //->limit(8);
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
        return $this->hasMany('App\Reporter', 'raceId')
            ->orderBy('nb_pts', 'DESC')
            ->orderBy('id', 'DESC')
            ->with('predictions');
    }

    public function reportersTop()
    {
        return $this->hasOne('App\Reporter', 'raceId')
            ->where('societe', 'PMU')
//            ->where('societe', 'geny.com')
//            ->orWhere('societe', 'AIP')
            ->orderBy('nb_pts', 'DESC')
            ->orderBy('id', 'DESC')
            ->with('predictions');
    }

    public function reportersGeny()
    {
        return $this->reporters()
            ->where('societe', 'geny.com');
            //->skip(1)
            //->take(100);
    }

    public function reportersBest()
    {
        return $this->reporters()
            ->where('societe', 'AIP');
    }

    public function reportersOthers()
    {
        return $this->reporters()
            ->where('societe', '!=', 'PMU');
            //->where('societe', '!=', 'AIP')
            //->where('societe', '!=', 'geny.com');
    }

    public function hasTranslation()
    {
        return $this->hasMany('App\RaceTranslation', "raceId")->exists();
    }

    public function translation()
    {
        $locale = App::getLocale();

        return $this->hasOne('App\RaceTranslation', "raceId")->where('lang', $locale);
    }

    public function translations()
    {
        return $this->hasMany('App\RaceTranslation', "raceId")->select('lang');
    }
}
