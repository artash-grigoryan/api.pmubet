<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FluxController extends Controller
{
    //
    public function photos($date) {

        $folderPath = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/BINARY/photos";
        $content = ["message" => "File Not found" ] ;
        if (is_dir($folderPath)) {
            $content = scandir($folderPath);
        }

        return response()->json($content);
    }

    public function photosFile($date, $file) {

        $filePath = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/BINARY/photos/" .$file;
        $content = "File Not found";
        if (file_exists($filePath)) {
            return response()->file($filePath);
        }
        return response($content)->header('Content-Type', 'text/xml;charset=ISO-8859-1');
    }

    public function flux($date, $parent, $folder, $fileName) {

        $path = dirname(dirname(__DIR__)) . "/recxml_root/" . $date . "/" .$parent . "/" .$folder . "/" . $fileName. "";
        $content = "File Not found";
        if (file_exists($path)) {
            $content = file_get_contents($path);
        }

        return response($content)->header('Content-Type', 'text/xml;charset=ISO-8859-1');
    }
}
