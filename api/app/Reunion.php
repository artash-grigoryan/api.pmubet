<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

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
        "qn",
    ];

    public function racesLite()
    {
        return $this->hasMany('App\Race', "reunionId");
    }

    public function races()
    {
        return $this->hasMany('App\Race', "reunionId")->with("bets")->with("runners")->with("betResults")->with('reporters');
    }

    public function hasTranslation()
    {
        return $this->hasMany('App\ReunionTranslation', "reunionId")->exists();
    }

    public function translation()
    {
        $locale = App::getLocale();
        return $this->hasOne('App\ReunionTranslation', "reunionId")->where('lang', $locale);
    }

    public function translations()
    {
        return $this->hasMany('App\ReunionTranslation', "reunionId")->select('lang');
    }


}
