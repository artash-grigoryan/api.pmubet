<?php

namespace App\Http\Controllers;

use App\Prediction;
use App\PredictionTranslation;
use App\RaceTranslation;
use App\Reporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class PredictionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @param  $lang
     * @return \Illuminate\Http\Response
     */
    public function edit($id, $lang = 'hy')
    {
        $prediction = PredictionTranslation::where('id', $id)->where('lang', $lang)->first();

        if ($prediction == null) {
            $prediction = Prediction::find($id);
        }
        $prediction->id = $id;
        $prediction->lang = $lang;

        return view('prediction.edit', [
            "prediction" => $prediction,
            "previousPage" => route('racesList').'/?page=' . Session::get('currentPage', 1)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $raceId
     * @return \Illuminate\Http\Response
     */
    public function addForm($raceId)
    {

        return view('prediction.add', ['raceId' => $raceId]);
    }

    public function add(Request $request, $raceId)
    {
        $number = $request->input('number');
        $runner = $request->input('runner', '');

        if ($number == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }
        $reporter = new Reporter([
            'societe' => 'PMU',
            'reporter' => 'dzio',
            'raceId' => $raceId,
        ]);
        $reporter->save();

        $numbers = [];
        $runners = [];
        if (preg_match('/,/', $runner)) {
            $runners = explode(',', $runner);
        }
        if (preg_match('/,/', $number)) {
            $numbers = explode(',', $number);
        }

        foreach ($numbers as $key=>$number) {

            $prediction = new Prediction([
                'number' => $number,
                'runner' => isset($runners[$key]) ? $runners[$key] : $runner,
                'rank' => $key,
                'reporterId' => $reporter->id
            ]);

            $prediction->save();
        }

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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

        $raceTranslation = RaceTranslation::firstOrNew(['raceId' => $id, 'lang' => $lang]);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
