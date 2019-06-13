<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
        return $this->hasOne('App\PredictionTranslation', "predictionId")->where('lang', 'hy');
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
