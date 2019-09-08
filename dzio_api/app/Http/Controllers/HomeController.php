<?php

namespace App\Http\Controllers;

use App\Banner;
use App\Prediction;
use App\Race;
use App\Reporter;
use App\Reunion;
use App\Runner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
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
        $year = Input::get('year', date('Y'));
        $month = Input::get('month', date('m'));
        $day = Input::get('day', date('d'));
        $date = Date('Y-m-d', strtotime($year.'-'.str_pad($month, 2, '0', STR_PAD_LEFT).'-'.str_pad($day, 2, '0', STR_PAD_LEFT)));
        //dd($date);
        $reunions = Reunion::orderBy('reunions.number', 'ASC')
            ->select('reunions.*')
            ->join('races', 'races.reunionId', '=', 'reunions.id')
            ->where('reunions.date', 'LIKE', $date.'%')
            ->distinct()
            ->paginate(15);

        return view('home', ["reunions" => $reunions, "year" => $year, "month" => $month, "day" => $day]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function racesList()
    {
        $page = Input::get('page', 1);
        $reunionId = Input::get('reunionId', 0);

        Session::put('currentPage', $page);

        $reunion = Reunion::where('id', '=', $reunionId)->first();

        $races = Race::orderBy('number', 'ASC')
            ->where('reunionId', '=', $reunionId)
            ->paginate(15);

        return view('race.list', ["reunion" => $reunion, "races" => $races]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function runnersList()
    {
        $page = Input::get('page', 1);
        $raceId = Input::get('raceId', 0);
        Session::put('currentPage', $page);

        $runners = Runner::select('runners.*')
            ->with('race')
            ->join('races', 'runners.raceId', '=', 'races.id')
            ->where('races.id', '=', $raceId)
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
        $page = Input::get('page', 1);
        Session::put('currentPage', $page);

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

        $image = $request->input('image', '');
        $text = $request->input('text', '');
        $date = $request->input('date', '');
        $lang = $request->input('lang');
        if ($date == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }
        $imageName = '';
        if ($image != '') {

            request()->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:250048',
            ]);

            $imageName = time().'.'.request()->image->getClientOriginalExtension();

            request()->image->move(public_path('img/banner'), $imageName);
        }
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
        $page = Input::get('page', 1);
        Session::put('currentPage', $page);

        $runners = Reporter::select('reporters.*')
            ->with('race')
            ->join('races', 'reporters.raceId', '=', 'races.id')
            ->orderBy('races.date', 'DESC')
            ->paginate(15);

        return view('reporters', ["reporters" => $runners]);
    }
}
