<?php
/**
 * Created by IntelliJ IDEA.
 * User: agrigorian
 * Date: 22/02/2019
 * Time: 14:51
 */

namespace App\Services;



use App\Services\Interfaces\DataServiceInterface;

class RecXMLService implements DataServiceInterface
{

    const RACES_FOLDER = "4_RACE";
    const RUNNERS_FOLDER = "6_RUNNERS";
    const BETS_FOLDER = "16_BETS";

    public function scanRacesFolder ()
    {
        $qaq = scandir("/var/www/recxml_root");
        var_dump($qaq);
    }
}