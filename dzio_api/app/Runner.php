<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Runner extends Model
{
    //
    protected $table = 'runner';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'runnerId',
        'name',
        'number',
        'breed',
        'sex',
        'age',
        'dress',
        'birthday',
        'color',
        'father',
        'mother',
        'owner',
        'coach',
        'jokey',
        'farmer',
    ];
}
