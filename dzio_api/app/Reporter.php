<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reporter extends Model
{
    protected $table = 'reporters';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'societe',
        'reporter',
        'nb_pts',
        'reporter_rank',
        'raceId'
    ];

    public function predictions()
    {
        return $this->hasMany('App\Prediction', "reporterId");
    }

    public function hasTranslation()
    {
        return $this->hasMany('App\ReporterTranslation', "reporterId")->exists();
    }

    public function race()
    {
        return $this->belongsTo('App\Race', "raceId");
    }

    public function translation()
    {
        return $this->hasOne('App\ReporterTranslation', "reporterId")->where('lang', 'hy');
    }

    public function translations()
    {
        return $this->hasOne('App\ReporterTranslation', "reporterId")->select('lang');
    }
}
