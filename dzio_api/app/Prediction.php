<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Prediction extends Model
{
    protected $table = 'predictions';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'number',
        'runner',
        'rank',
        'reporterId',
    ];

    public function hasTranslation()
    {
        return $this->hasMany('App\PredictionTranslation', "predictionId")->exists();
    }

    public function translation()
    {
        $locale = App::getLocale();
        return $this->hasOne('App\PredictionTranslation', "predictionId")->where('lang', $locale);
    }

    public function translations()
    {
        return $this->hasMany('App\PredictionTranslation', "predictionId")->select('lang');
    }

    public function reporter()
    {
        return $this->belongsTo('App\Reporter', "reporterId")->with("race");
    }
}
