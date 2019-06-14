<?php

namespace App\Http\Controllers;

use App\Banner;
use App\Prediction;
use App\Race;
use App\Reporter;
use App\Reunion;
use App\Runner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reunions = Reunion::orderBy('date', 'DESC')->paginate(15);

        return view('home', ["reunions" => $reunions]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function racesList()
    {
        $races = Race::orderBy('date', 'DESC')->paginate(15);

        return view('race.list', ["races" => $races]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function runnersList()
    {
        $runners = Runner::select('runners.*')
            ->with('race')
            ->join('races', 'runners.raceId', '=', 'races.id')
            ->orderBy('races.date', 'DESC')
            ->paginate(15);

        return view('runners', ["runners" => $runners]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function predictions()
    {
        $predictions = Prediction::select('predictions.*')
            ->with('reporter')
            ->join('reporters', 'predictions.reporterId', '=', 'reporters.id')
            ->join('races', 'reporters.raceId', '=', 'races.id')
            ->orderBy('races.date', 'DESC')
            ->paginate(15);

        return view('prediction.list', ["predictions" => $predictions]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function bannerEdit()
    {
        $banner = '';

        return view('home.banner', ["banner" => $banner]);
    }

    /**
     * @param $request
     * @return mixed
     */
    public function bannerUpdate(Request $request)
    {

        $text = $request->input('text', '');
        $date = $request->input('date', '');
        $lang = $request->input('lang');
        if ($date == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }

        request()->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:250048',
        ]);

        $imageName = time().'.'.request()->image->getClientOriginalExtension();

        request()->image->move(public_path('img/banner'), $imageName);

        $banner = new Banner([
            'image' => $imageName,
            'date' => $date,
            'text' => $text,
            'lang' => $lang,
        ]);

        $banner->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function reportersList()
    {
        $runners = Reporter::select('reporters.*')
            ->with('race')
            ->join('races', 'reporters.raceId', '=', 'races.id')
            ->orderBy('races.date', 'DESC')
            ->paginate(15);

        return view('reporters', ["reporters" => $runners]);
    }
}
