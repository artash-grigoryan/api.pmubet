<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    //
    protected $table = 'reunion';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'date', 'time'
    ];

    public function races()
    {
        return $this->hasMany('App\Race');
    }
}
