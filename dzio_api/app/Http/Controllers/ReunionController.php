<?php

namespace App\Http\Controllers;

use App\Reunion;
use Illuminate\Http\Request;

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
        $yesterday = date('Y-m-d', strtotime('-1 DAY'));
        $today = date('Y-m-d');
        $tomorrow = date('Y-m-d', strtotime('+1 DAY'));
        $afterTomorrow = date('Y-m-d', strtotime('+2 DAY'));

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
    public function edit(Reunion $reunion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reunion $reunion)
    {
        //
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
