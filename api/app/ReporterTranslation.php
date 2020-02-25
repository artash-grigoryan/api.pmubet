<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReporterTranslation extends Model
{
    //
    protected $table = 'reporters_translations';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'reporterId',
        'societe',
        'reporter',
        'nb_pts',
        'reporter_rank',
        'raceId'
    ];
}
