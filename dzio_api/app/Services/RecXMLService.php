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

class RecXMLService implements DataServiceInterface {

    const RECTXML_FOLDER_PATH = "./recxml_root";

    //UNUSED
    const MONTH_MEETINGS = "1_MONTH_MEETINGS"; // Toutes les réunions du mois
    const DAY_MEETENGS = "2_DAY_MEETENGS"; // Toutes les réunions du jour

    //USED
    const REUNIONS_FOLDER = "3_MEETING"; //Toutes les courses d'une réunion mais réunion detaillée
    const RACE_DETAILS = "171"; //Conditions de course, Image parcours et liste de tous les partants détaillée et de tous les paris


    const RACES_FOLDER = "4_RACE"; // Détails de la course
    const RUNNERS_FOLDER = "6_RUNNERS"; // Tous les partants d'une course
    const BETS_FOLDER = "16_BETS"; //Tous les paris d'une course

    const DEFINITIVE_DIVIDENDS_RAP = "20_DEFINITIVE_DIVIDENDS_RAP"; //Détails des gains
    const RESULT = "21_RESULT"; //description detaillée des arrivés
    const REPORT_CHASES = "23_REPORT_CHASES"; //Liste des arrivés non detaillé
    const COMPARED_PERFORMANCES = "27_COMPARED_PERFORMANCES/"; //
    const STATS_RUNNERS1 = "673"; //Statistiques detailées des partants, nb de victoires etc...
    const STATS_RUNNERS2 = "690"; //Statistiques detailées des partants, nb de victoires etc...
    const STATS_RUNNERS3 = "691"; //Statistiques detailées des partants en pourcentage
    const LAST_PERFORMANCES = "7_LAST_PERFORMANCES"; //Dernières perfs des partants
    const PRIZE_LIST = "8_PRIZE_LIST"; //Nombres de victoires par partants
    const RUNNERS_PRESENTATION = "11_RUNNERS_PRESENTATION"; //classement si course terminée

    public $xmlParser;

    public function __construct(Service $xmlParser)
    {
        $this->xmlParser = $xmlParser;
    }

    /**
     * @return array
     */
    public function scanReunionsFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = self::RECTXML_FOLDER_PATH . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::REUNIONS_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @return array
     */
    public function scanRacesFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = self::RECTXML_FOLDER_PATH . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RACES_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @return array
     */
    public function scanRunnersFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = self::RECTXML_FOLDER_PATH . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RUNNERS_FOLDER;

        return $this->scanFolder($folderPath);
    }

    /**
     * @return array
     */
    public function scanBetsFolder()
    {
        $dayFolder = (new \DateTime())->format("Ymd");
        $folderPath = self::RECTXML_FOLDER_PATH . DIRECTORY_SEPARATOR . $dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::BETS_FOLDER;

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
            "files" => file_exists($path) ? scandir($path) : []
        ];
    }

    /**
     * @param $filePath
     * @param $mappedFields
     * @return array|object|string
     * @throws \Sabre\Xml\ParseException
     */
    public function parseXMLFileByPath($filePath, $mappedFields)
    {
        $map = [];
        foreach ($mappedFields as $mappedField) {
            $map[$mappedField] = function(\Sabre\Xml\Reader $reader) {
                return \Sabre\Xml\Deserializer\keyValue($reader, '');
            };
        }
        $this->xmlParser->elementMap = $map;
        return $this->xmlParser->parse(file_get_contents($filePath));
    }
}