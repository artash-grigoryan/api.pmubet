<?php
/**
 * Created by IntelliJ IDEA.
 * User: agrigorian
 * Date: 22/02/2019
 * Time: 14:51
 */

namespace App\Services;


use App\Services\Interfaces\DataServiceInterface;
use Sabre\Xml\Service;

class RecXMLService implements DataServiceInterface
{

    const RACES_FOLDER = "4_RACE";
    const RUNNERS_FOLDER = "6_RUNNERS";
    const BETS_FOLDER = "16_BETS";

    public $xmlParser;

    public function __construct(Service $xmlParser)
    {
        $this->xmlParser = $xmlParser;
    }

    /**
     * @return array
     */
    public function scanRacesFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = "/var/www/recxml_root" . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RACES_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @return array
     */
    public function scanRunnersFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = "/var/www/recxml_root" . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RUNNERS_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @return array
     */
    public function scanBetsFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = "/var/www/recxml_root" . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::BETS_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @param $path
     * @return array
     */
    private function scanFolder($path)
    {

        return [
            "path" => $path,
            "files" => scandir($path)
        ];
    }

    /**
     * @param $filePath
     * @return array of Parsed XML file
     * @throws \Sabre\Xml\ParseException
     */
    public function parseXMLFileByPath($filePath)
    {

        return $this->xmlParser->parse(file_get_contents($filePath));
    }
}