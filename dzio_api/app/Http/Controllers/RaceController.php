<?php

namespace App\Http\Controllers;

use App\Race;
use App\BetResult;
use App\RaceTranslation;
use App\Reunion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class RaceController extends Controller
{
    public function getNext()
    {
        $now = date('Y-m-d H:m:s', strtotime('+2 HOUR'));

        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', $now]])
            ->orderBy('date', 'ASC')
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->with('translation')
            ->first();

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

        $race->betResults = [];
        return response()->json(array('race'=>$race));
    }

    public function get($date, $reunionNumber, $raceNumber)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->join('reunions', 'reunions.id', '=', 'races.reunionId')
            ->where([
                [DB::raw('DATE(reunions.date)'), '=', date('Y-m-d', strtotime($date))],
                ['reunions.number', '=', $reunionNumber],
                ['races.number', '=', $raceNumber]
            ])
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->with('translation')
            ->first();

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

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
                case 7:
                    $betResults[$key]['code'] = $code;
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

    public function getFirstByDate($date)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->join('reunions', 'reunions.id', '=', 'races.reunionId')
            ->where([
                [DB::raw('DATE(reunions.date)'), '=', date('Y-m-d', strtotime($date))]
            ])
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->with('translation')
            ->orderBy('races.number', 'ASC')
            ->first();

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

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
                case 7:
                    $betResults[$key]['code'] = $code;
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

    public function getFirstByReunion($date, $reunionNumber)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->join('reunions', 'reunions.id', '=', 'races.reunionId')
            ->where([
                [DB::raw('DATE(reunions.date)'), '=', date('Y-m-d', strtotime($date))],
                ['reunions.number', '=', $reunionNumber]
            ])
            ->with("bets")
            ->with("runners")
            ->with("results")
            ->with('reportersTop')
            ->with('reportersGeny')
            ->with('reportersBest')
            ->with('reportersOthers')
            ->with('translation')
            ->orderBy('races.number', 'ASC')
            ->first();

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

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
                case 7:
                    $betResults[$key]['code'] = $code;
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

        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', $now]])
            ->whereHas('bets', function($query){
                  $query->whereLib('QN');
              })
            ->with('translation')
            ->orderBy('date', 'ASC')
            ->first();
        if($race) {

            $race->reunion = Reunion::where('id', $race->reunionId)
                ->with('translation')
                ->first();

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
