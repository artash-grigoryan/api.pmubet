<?php

namespace App\Http\Controllers;

use App\Reporter;
use App\ReporterTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class ReporterController extends Controller
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
     * @param  \App\Reporter  $reporter
     * @return \Illuminate\Http\Response
     */
    public function show(Reporter $reporter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Reporter $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, $lang = 'hy')
    {
        $reporter = ReporterTranslation::where('reporterId', $id)->where('lang', $lang)->first();

        if ($reporter == null) {
            $reporter = Reporter::find($id);
        }

        $reporter->id = $id;
        $reporter->lang = $lang;

        return view('reporter.edit', ["reporter" => $reporter]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reporter  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $society = $request->input('societe');
        $reporter = $request->input('reporter');
        $lang = $request->input('lang');

        if ($society == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }
        $reporterTranslation = ReporterTranslation::firstOrNew(['reporterId' => $id, 'lang' => $lang]);
        $reporterTranslation->societe = $society;
        $reporterTranslation->reporter = $reporter;


        $reporterTranslation->lang = $lang;

        $reporterTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reporter  $reporter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reporter $reporter)
    {
        //
    }
}
