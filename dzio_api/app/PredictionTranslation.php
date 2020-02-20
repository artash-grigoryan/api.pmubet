<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PredictionTranslation extends Model
{
    protected $table = 'prediction_translations';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'runner'
    ];
}
