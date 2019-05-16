<?php

namespace App\Http\Controllers;

use App\Reunion;
use App\ReunionTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class ReunionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return json_encode(Reunion::where("DATE(date)", "=", "DATE(NOW())")->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $yesterday = date('Y-m-d', strtotime('-1 DAY +2 HOUR'));
        $today = date('Y-m-d');
        $tomorrow = date('Y-m-d', strtotime('+1 DAY +2 HOUR'));
        $afterTomorrow = date('Y-m-d', strtotime('+2 DAY +2 HOUR'));

        $reunions = [];
        $reunions['yesterday']  = Reunion::where([['date', '>=', $yesterday], ['date', '<', $today]])
            ->whereHas('races')
            ->get();
        $reunions['today']      = Reunion::where([['date', '>=', $today], ['date', '<', $tomorrow]])
            ->whereHas('races')
            ->get();
        $reunions['tomorrow']   = Reunion::where([['date', '>=', $tomorrow], ['date', '<', $afterTomorrow]])
            ->whereHas('races')
            ->get();

        return response()->json(['reunions'=>$reunions]);
    }

    public function getByDate($date) {

        $date = date('Y-m-d 00:00:00', strtotime($date));
        $dateAfter1Day = date('Y-m-d 00:00:00', strtotime($date.' +1 DAY'));
        $data = Reunion::where([['date', '>=', $date], ['date', '<', $dateAfter1Day]])->with('races')->get();

        return response()->json($data);
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
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function show(Reunion $reunion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $reunion = ReunionTranslation::where('reunionId', $id)->where('lang', 'hy')->first();

        if ($reunion == null) {
            $reunion = Reunion::find($id);
        }
        $reunion->id = $id;

        return view('reunion.edit', ["reunion" => $reunion]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $label = $request->input('label');
        $statusLabel = $request->input('statusLabel');
        $hippodromeName = $request->input('hippodromeName');
        $speciality = $request->input('speciality');
        if ($label == '') {
            return Redirect::back()->withErrors(['msg', 'The Message']);
        }
        $reunionTranslation = ReunionTranslation::firstOrNew(['reunionId' => $id, 'lang' => 'hy']);
        $reunionTranslation->label = $label;
        $reunionTranslation->statusLabel = $statusLabel;
        $reunionTranslation->hippodromeName = $hippodromeName;
        $reunionTranslation->speciality = $speciality;
        $reunionTranslation->lang = 'hy';

        $reunionTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reunion $reunion)
    {
        //
    }
}
