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
}
