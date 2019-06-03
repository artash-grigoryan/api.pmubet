<?php

namespace App\Http\Controllers;

use App\Race;
use App\Reunion;
use App\Runner;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reunions = Reunion::orderBy('date', 'DESC')->paginate(15);

        return view('home', ["reunions" => $reunions]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function racesList()
    {
        $races = Race::orderBy('date', 'DESC')->paginate(15);

        return view('races', ["races" => $races]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function runnersList()
    {
        $runners = Runner::select('runners.*')
            ->with('race')
            ->join('races', 'runners.raceId', '=', 'races.id')
            ->orderBy('races.date', 'DESC')
            ->paginate(15);

        return view('runners', ["runners" => $runners]);
    }
}
