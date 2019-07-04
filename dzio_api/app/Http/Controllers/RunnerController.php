<?php

namespace App\Http\Controllers;

use App\Runner;
use App\RunnerTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use phpDocumentor\Reflection\Types\Integer;

class RunnerController extends Controller
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
     * @param  \App\Runner  $runner
     * @return \Illuminate\Http\Response
     */
    public function show(Runner $runner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Runner  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, $lang = 'hy')
    {
        $runner = RunnerTranslation::where('runnerId', $id)->where('lang', $lang)->first();

        if ($runner == null) {
            $runner = Runner::find($id);
        }

        $runner->id = $id;
        $runner->lang = $lang;

        return view('runner.edit', [
            "runner" => $runner,
            "previousPage" => route('racesList').'/?page=' . Session::get('currentPage', 1)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Integer  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $name = $request->input('name');
        $breed = $request->input('breed');
        $color = $request->input('color');
        $dress = $request->input('dress');
        $father = $request->input('father');
        $mother = $request->input('mother');
        $owner = $request->input('owner');
        $coach = $request->input('coach');
        $jokey = $request->input('jokey');
        $farmer = $request->input('farmer');
        $lang = $request->input('lang');

        if ($name == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }
        $runnerTranslation = RunnerTranslation::firstOrNew(['runnerId' => $id, 'lang' => $lang]);
        $runnerTranslation->name = $name;
        $runnerTranslation->breed = $breed;
        $runnerTranslation->color = $color;
        $runnerTranslation->dress = $dress;
        $runnerTranslation->father = $father;
        $runnerTranslation->mother = $mother;
        $runnerTranslation->owner = $owner;
        $runnerTranslation->coach = $coach;
        $runnerTranslation->jokey = $jokey;
        $runnerTranslation->farmer = $farmer;

        $runnerTranslation->lang = $lang;

        $runnerTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Runner  $runner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Runner $runner)
    {
        //
    }
}
