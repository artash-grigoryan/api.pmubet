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
        $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY +2 HOUR'));
        $race->today = $race->day == date('Y-m-d');
        $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY +2 HOUR'));
        $race->betResults = [];
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
        $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY +2 HOUR'));
        $race->today = $race->day == date('Y-m-d');
        $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY +2 HOUR'));
        $betResultsGroups = BetResult::where('raceId', $race->id)->distinct()->pluck('code');
        $betResults = [];
        foreach($betResultsGroups as $key=>$code) {
            switch($code) {
                case 1:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = 'Simple';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->get();
                    break;
                case 2:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = 'Couplé';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->get();
                    break;
                case 4:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = '2 sur 4';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->orderBy('typeReserveRapDef', 'ASC')->get();
                    break;
                    $betResults[$key]['code'] = $code;
                case 7:
                    $betResults[$key]['name'] = 'Tiercé';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->orderBy('typeReserveRapDef', 'DESC')->get();
                    break;
                case 8:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = 'Quarté';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->orderBy('typeReserveRapDef', 'DESC')->get();
                    break;
                case 10:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = 'Multi';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->orderBy('typeReserveRapDef', 'ASC')->get();
                    break;
                case 14:
                    $betResults[$key]['code'] = $code;
                    $betResults[$key]['name'] = 'Quinté+';
                    $betResults[$key]['results'] = BetResult::where('raceId', $race->id)->where('code', $code)->orderBy('typeReserveRapDef', 'DESC')->get();
                    break;
            }
        }
        sort($betResults);
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
            $race->yesterday = $race->day == date('Y-m-d', strtotime('- 1DAY +2 HOUR'));
            $race->today = $race->day == date('Y-m-d');
            $race->tomorrow = $race->day == date('Y-m-d', strtotime('+ 1DAY +2 HOUR'));
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
