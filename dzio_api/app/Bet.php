<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model {

    protected $table = 'bets';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'code',
        'lib',
        'libLong',
    ];

    public function betResults()
    {
        return $this->hasMany('App\BetResults', "betId");
    }

}
