<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BetTranslation extends Model
{
    //
    protected $table = 'bets_translations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'betId',
        'code',
        'lib',
        'libLong',
    ];
}
