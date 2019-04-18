<?php

namespace App\Http\Controllers;

use App\Race;
use App\BetResult;
use App\Reunion;
use Illuminate\Http\Request;

class RaceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    public function getNext()
    {
        $now = date('Y-m-d H:m:s', strtotime('+2 HOUR'));

        $race = Race::where([['date', '>=', $now]])
            ->orderBy('date', 'ASC')
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->first();
        $race->reunion = Reunion::where('id', $race->reunionId)->first();
        $race->day = date('Y-m-d', strtotime($race->date));
        $race->time = date('H:i', strtotime($race->date));
        $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY'));
        $race->today = $race->day == date('Y-m-d');
        $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY'));
        $bet_results_names = BetResult::where('raceId', $race->id)->distinct()->pluck('typeReserveRapDef');
        $betResults = [];
        foreach($bet_results_names as $key=>$bet_results_name) {
            $betResults[$key]['name'] = $bet_results_name;
            $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('typeReserveRapDef', $bet_results_name)->get();
        }
        $race->betResults = $betResults;
        return response()->json(array('race'=>$race));
    }

    public function get($reunionId, $raceNumber)
    {
        $race = Race::where([['reunionId', '=', $reunionId], ['number', '=', $raceNumber]])
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->first();
        $race->reunion = Reunion::where('id', $race->reunionId)->first();
        $race->day = date('Y-m-d', strtotime($race->date));
        $race->time = date('H:i', strtotime($race->date));
        $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY'));
        $race->today = $race->day == date('Y-m-d');
        $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY'));
        $bet_results_names = BetResult::where('raceId', $race->id)->distinct()->pluck('typeReserveRapDef');
        $betResults = [];
        foreach($bet_results_names as $key=>$bet_results_name) {
            $betResults[$key]['name'] = $bet_results_name;
            $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('typeReserveRapDef', $bet_results_name)->get();
        }
        $race->betResults = $betResults;
        return response()->json(array('race'=>$race));
    }

    public function getNextQ5()
    {
        $now = date('Y-m-d H:m:s', strtotime('+2 HOUR'));

        $race = Race::where([['date', '>=', $now]])
            ->whereHas('bets', function($query){
                  $query->whereLib('QN');
              })
            ->orderBy('date', 'ASC')
            ->first();
        if($race) {

            $race->reunion = Reunion::where('id', $race->reunionId)->first();
            $race->day = date('Y-m-d', strtotime($race->date));
            $race->time = date('H:i', strtotime($race->date));
            $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY'));
            $race->today = $race->day == date('Y-m-d');
            $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY'));
            return response()->json(array(
                'race'=>$race
            ));
        }
        return response()->json(array(
            'race'=>[],
            'error'=>'No data'
        ));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        exit("qaqqaqaqa");
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        exit("qaqqaqaqa");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Race  $reunion
     * @return \Illuminate\Http\Response
     */
    public function show(Race $reunion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Race  $reunion
     * @return \Illuminate\Http\Response
     */
    public function edit(Race $reunion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Race  $reunion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Race $reunion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Race  $reunion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Race $reunion)
    {
        //
    }
}
