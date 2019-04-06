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
        exit("qaqqaqaqa");
        //
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
        $after3days = date('Y-m-d', strtotime('+3 DAY'));
        $after4days = date('Y-m-d', strtotime('+4 DAY'));
        $after5days = date('Y-m-d', strtotime('+5 DAY'));
        $after6days = date('Y-m-d', strtotime('+6 DAY'));
        $after7days = date('Y-m-d', strtotime('+7 DAY'));
        $after8days = date('Y-m-d', strtotime('+8 DAY'));
        $data = [];

        $data[$yesterday] = Reunion::where([['date', '>=', $yesterday], ['date', '<', $today]])->with('races')->get();

        $data[$today] = Reunion::where([['date', '>=', $today], ['date', '<', $tomorrow]])->with('races')->get();

        $data[$tomorrow] = Reunion::where([['date', '>=', $tomorrow], ['date', '<', $afterTomorrow]])->with('races')->get();

        $data[$afterTomorrow] = Reunion::where([['date', '>=', $afterTomorrow], ['date', '<', $after3days]])->with('races')->get();
        $data[$after3days] = Reunion::where([['date', '>=', $after3days], ['date', '<', $after4days]])->with('races')->get();
        $data[$after4days] = Reunion::where([['date', '>=', $after4days], ['date', '<', $after5days]])->with('races')->get();
        $data[$after5days] = Reunion::where([['date', '>=', $after5days], ['date', '<', $after6days]])->with('races')->get();
        $data[$after6days] = Reunion::where([['date', '>=', $after6days], ['date', '<', $after7days]])->with('races')->get();
        $data[$after7days] = Reunion::where([['date', '>=', $after7days], ['date', '<', $after8days]])->with('races')->get();

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
