<?php

namespace App\Http\Controllers;

use App\Race;
use App\BetResult;
use App\RaceTranslation;
use App\Reunion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class RaceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $yesterday = date('Y-m-d', strtotime('-1 DAY +2 HOUR'));
        $today = date('Y-m-d', strtotime('+2 HOUR'));
        $tomorrow = date('Y-m-d', strtotime('+1 DAY +2 HOUR'));
        $afterTomorrow = date('Y-m-d', strtotime('+2 DAY +2 HOUR'));

        $races = [];
        $races['yesterday'] = Race::where([['date', '>=', $yesterday], ['date', '<', $today]])
            ->orderBy('date', 'ASC')
            ->with("runners")
            ->with("results")
            ->get();
        $races['today'] = Race::where([['date', '>=', $today], ['date', '<', $tomorrow]])
            ->orderBy('date', 'ASC')
            ->with("runners")
            ->with("results")
            ->get();
        $races['tomorrow'] = Race::where([['date', '>=', $tomorrow], ['date', '<', $afterTomorrow]])
            ->orderBy('date', 'ASC')
            ->with("runners")
            ->with("results")
            ->get();

        foreach ($races as $day=>$dayRaces) {

            foreach ($dayRaces as $key=>$race) {

                $races[$day][$key]->reunion = Reunion::where('id', $race->reunionId)->first();
                $races[$day][$key]->day = date('Y-m-d', strtotime($race->date));
                $races[$day][$key]->time = date('H:i', strtotime($race->date));
            }
        }

        return response()->json(array('races'=>$races));
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
            ->with('translation')
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
     * @param  \App\Race  $raceId
     * @return \Illuminate\Http\Response
     */
    public function edit($raceId)
    {
        //
        $reunion = RaceTranslation::where('raceId', $raceId)->where('lang', 'hy')->first();

        if ($reunion == null) {
            $reunion = Race::find($raceId);
        }
        $reunion->id = $raceId;

        return view('race.edit', ["race" => $reunion]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Race  $reunion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $raceId)
    {
        $label = $request->input('label');
        $description = $request->input('description', '');
        $gender = $request->input('gender', '');
        $labelLong = $request->input('labelLong');
        $type = $request->input('type');
        $discipline = $request->input('discipline');
        $comment = $request->input('comment');

        if ($label == '') {
            return Redirect::back()->withErrors(['msg', 'The Message']);
        }

        $raceTranslation = RaceTranslation::firstOrNew(['raceId' => $raceId, 'lang' => 'hy']);
        $raceTranslation->label = $label;
        $raceTranslation->description = $description;
        $raceTranslation->gender = $gender;
        $raceTranslation->labelLong = $labelLong;
        $raceTranslation->type = $type;
        $raceTranslation->discipline = $discipline;
        $raceTranslation->comment = $comment;
        $raceTranslation->lang = 'hy';

        $raceTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
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
