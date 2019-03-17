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
        'id', 'label', 'type', 'code', 'date', 'externNumber', 'number'
    ];

    public function races()
    {
        return $this->hasMany('App\Race');
    }
}
