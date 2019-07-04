<?php

namespace App\Http\Controllers;

use App\Banner;
use App\Race;
use App\BetResult;
use App\RaceTranslation;
use App\Reunion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class RaceController extends Controller
{


    /**
     * Show the application dashboard.
     *
     * @param $locale
     * @return \Illuminate\Http\Response
     */
    public function lastBanner($locale)
    {
        $banner = Banner::where('lang', '=', $locale)->orderBy('id', 'desc')->first();
        if (!empty($banner)) {

            return json_encode($banner);
        } else {

            return json_encode([]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll($locale)
    {
        $races = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', date('Y-m-d', strtotime('-1 DAY'))], ['date', '<=', date('Y-m-d', strtotime('+2 DAY'))]])
            ->whereRaw('date >= ADDDATE(ADDDATE(NOW(), INTERVAL -1 DAY), 2 HOUR)')
            ->whereRaw('date >= ADDDATE(ADDDATE(NOW(), INTERVAL 2 DAY), 2 HOUR)')
            ->orderBy('date', 'ASC')
            ->with("runners")
            ->with("results")
            ->with('translation')
            ->get();

        if(empty($races)) {
            return response()->json(array(
                'races'=>[],
                'error'=>'No data'
            ));
        }

        foreach ($races as $key=>$race) {

            $races[$key]->reunion = Reunion::where('id', $race->reunionId)
                ->with('translation')
                ->first();
        }

        return response()->json(array('races'=>$races));
    }

    public function getAllByDate($locale, $date)
    {
        $races = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', date('Y-m-d', strtotime($date.' + 2 HOUR'))], ['date', '<', date('Y-m-d', strtotime($date.' +1 DAY + 2 HOUR'))]])
            ->orderBy('date', 'ASC')
            ->with("runners")
            ->with("results")
            ->with('translation')
            ->get();

        if(empty($races)) {
            return response()->json(array(
                'races'=>[],
                'error'=>'No data'
            ));
        }

        foreach ($races as $key=>$race) {

            $races[$key]->reunion = Reunion::where('id', $race->reunionId)
                ->with('translation')
                ->first();
        }

        return response()->json(array('races'=>$races));
    }

    public function getNext($locale)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->whereRaw('date >= ADDDATE(NOW(), INTERVAL 2 HOUR)')
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

        if(empty($race)) {
            return response()->json(array(
                'race'=>'',
                'error'=>'No data'
            ));
        }

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

        $race->betResults = [];
        return response()->json(array('race'=>$race));
    }

    public function get($locale, $date, $reunionNumber, $raceNumber)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
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

        if(empty($race)) {
            return response()->json(array(
                'race'=>'',
                'error'=>'No data'
            ));
        }

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

    public function getFirstByDate($locale, $date)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
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

        if(empty($race)) {
            return response()->json(array(
                'race'=>'',
                'error'=>'No data'
            ));
        }

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

    public function getFirstByReunion($locale, $date, $reunionNumber)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
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

        if(empty($race)) {
            return response()->json(array(
                'race'=>'',
                'error'=>'No data'
            ));
        }

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

    public function getNextQ5($locale)
    {
        $race = Race::select(DB::raw('races.*, DATE_FORMAT(races.date,\'%Y%m%d\') as datePath, DATE_FORMAT(races.date,\'%Y-%m-%d\') as day, DATE_FORMAT(races.date,\'%H:%i\') as  time'))
            ->whereRaw('date >= ADDDATE(NOW(), INTERVAL 2 HOUR)')
            ->whereHas('bets', function($query){
                  $query->whereLib('QN');
              })
            ->with('translation')
            ->orderBy('date', 'ASC')
            ->first();

        if(empty($race)) {
            return response()->json(array(
                'race'=>'',
                'error'=>'No data'
            ));
        }

        $race->reunion = Reunion::where('id', $race->reunionId)
            ->with('translation')
            ->first();

        return response()->json(array(
            'race'=>$race
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
    public function edit($raceId, $lang = 'hy')
    {
        $race = RaceTranslation::where('raceId', $raceId)->where('lang', $lang)->first();

        if ($race == null) {
            $race = Race::find($raceId);
        }
        $race->id = $raceId;
        $race->lang = $lang;

        return view('race.edit', [
            "race" => $race,
            "previousPage" => route('racesList').'/?page=' . Session::get('currentPage', 1)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Race  $race
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
        $lang = $request->input('lang');

        if ($label == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }

        $raceTranslation = RaceTranslation::firstOrNew(['raceId' => $raceId, 'lang' => $lang]);
        $raceTranslation->label = $label;
        $raceTranslation->description = $description;
        $raceTranslation->gender = $gender;
        $raceTranslation->labelLong = $labelLong;
        $raceTranslation->type = $type;
        $raceTranslation->discipline = $discipline;
        $raceTranslation->comment = $comment;
        $raceTranslation->lang = $lang;

        $raceTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Race  $race
     * @return \Illuminate\Http\Response
     */
    public function destroy(Race $race)
    {
        //
    }
}
