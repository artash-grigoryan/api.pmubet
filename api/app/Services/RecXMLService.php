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

    //const RECTXML_FOLDER_PATH = "/var/www/recxml_root";
    const RECTXML_FOLDER_PATH_TODO = "/var/www/docker/recxml_root";
    const RECTXML_FOLDER_PATH_DONE = "./../recxml_done";

    //UNUSED
    const MONTH_REUNIONS_FOLDER = "1_MONTH_MEETINGS"; // Toutes les réunions du mois
    const LAST_PERFORMANCES_FOLDER = "7_LAST_PERFORMANCES"; //Dernières perfs des partants
    const RUNNERS_PRESENTATION_FOLDER = "11_RUNNERS_PRESENTATION"; //classement si course terminée
    const REPORT_CHASES_FOLDER = "23_REPORT_CHASES"; //Liste des arrivés non detaillé
    const STATS_RUNNERS1_FOLDER = "673"; //Statistiques detailées des partants, nb de victoires etc...
    const STATS_RUNNERS2_FOLDER = "690"; //Statistiques detailées des partants, nb de victoires etc...
    const STATS_RUNNERS3_FOLDER = "691"; //Statistiques detailées des partants en pourcentage
    const RACE_DETAILS_FOLDER = "171"; //Conditions de course, Image parcours et liste de tous les partants détaillée et de tous les paris
    const GNY_SYNTHESE_PRESS_Q5_FOLDER = "104_GNY_SYNTHESE_PRESS_Q5"; //SOMME DES JOURNAUX AVEC POINTS EN FONCTION DU CLASSEMENT
    const GNY_PRONO_NAT_FOLDER = "108_GNY_PRONO_NAT"; //GET RUNNERS COMMENTS FROM THERE

    //USED
    const DAY_REUNIONS_FOLDER = "2_DAY_MEETENGS"; // Toutes les réunions du jour
    const REUNIONS_FOLDER = "3_MEETING"; //Toutes les courses d'une réunion mais réunion detaillée
    const RACES_FOLDER = "4_RACE"; // Détails de la course
    const RUNNERS_FOLDER = "6_RUNNERS"; // Tous les partants d'une course
    const RUNNERS_MUSIC_FOLDER = "171"; // Tous les partants d'une course
    const BETS_FOLDER = "16_BETS"; //Tous les paris d'une course
    const RESULT_FOLDER = "21_RESULT"; //description detaillée des arrivés
    const DEFINITIVE_DIVIDENDS_RAP_FOLDER = "20_DEFINITIVE_DIVIDENDS_RAP"; //Détails des gains
    const COMPARED_PERFORMANCES_FOLDER = "27_COMPARED_PERFORMANCES"; //
    const GNY_PRESS_REUNION_FOLDER = "102_GNY_PRESS_REUNION"; //JOURNAUX PRONOSTICS
    const GNY_SELECTION_PRESS_Q5_FOLDER = "103_GNY_SELECTION_PRESS_Q5"; //JOURNAUX PRONOSTICS Q5
    const GNY_FORCES_PRESENCE_FOLDER = "111_GNY_FORCES_PRESENCE"; //GET RUNNER COMMENTS FROM THERE
    const GNY_PRONO_Q5_FOLDER = "110_GNY_PRONO_Q5"; //GET BIG Q5 COMMENT
    const NON_RUNNER_FOLDER = "24_NON_RUNNER";
    const LIVE_ODDS_SG_FOLDER = "51_LIVE_ODDS_SG";
    const PRIZE_LIST_FOLDER = "8_PRIZE_LIST"; //Nombres de victoires par partants

    const CASAQUES_FOLDER = "casaques"; //Casaques
    const HIPPODROMES_FOLDER = "ParcoursHippodromes"; //Parcours Hippodromes


    public $xmlParser;
    public $dayFolder;

    public function __construct(Service $xmlParser)
    {
        $this->xmlParser = $xmlParser;

        $this->dayFolder = (new \DateTime())->format("Ymd");

        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE)) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE);
        }
    }

    /**
     * @return string
     */
    public function getDayFolder(): string
    {
        return $this->dayFolder;
    }

    /**
     * @param string $dayFolder
     */
    public function setDayFolder(string $dayFolder)
    {
        $this->dayFolder = $dayFolder;
        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder)) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder);
        }
        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "XML")) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "XML");
        }
        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY")) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY");
        }
    }

    public function createIsNotDir($dir) {

        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . $dir)) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . $dir);
        }
    }

    public function createIsNotDirBinary($dir) {

        if(!is_dir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY" . DIRECTORY_SEPARATOR . $dir)) {
            mkdir(self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY" . DIRECTORY_SEPARATOR . $dir);
        }
    }

    /**
     * @return string
     */
    public function getDayReunionsFolder()
    {
        $this->createIsNotDir(self::DAY_REUNIONS_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::DAY_REUNIONS_FOLDER;
    }

    /**
     * @return string
     */
    public function getMonthReunionsFolder()
    {
        $this->createIsNotDir(self::MONTH_REUNIONS_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::MONTH_REUNIONS_FOLDER;
    }

    /**
     * @return string
     */
    public function getReunionsFolder()
    {
        $this->createIsNotDir(self::REUNIONS_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::REUNIONS_FOLDER;
    }

    /**
     * @return string
     */
    public function getRacesFolder()
    {
        $this->createIsNotDir(self::RACES_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RACES_FOLDER;
    }

    /**
     * @return string
     */
    public function getRunnersFolder()
    {
        $this->createIsNotDir(self::RUNNERS_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RUNNERS_FOLDER;
    }

    /**
     * @return string
     */
    public function getRunnerMusicsFolder()
    {
        $this->createIsNotDir(self::RUNNERS_MUSIC_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RUNNERS_MUSIC_FOLDER;
    }

    /**
     * @return string
     */
    public function getBetsFolder()
    {
        $this->createIsNotDir(self::BETS_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::BETS_FOLDER;
    }

    /**
     * @return string
     */
    public function getBetResultsFolder()
    {
        $this->createIsNotDir(self::DEFINITIVE_DIVIDENDS_RAP_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::DEFINITIVE_DIVIDENDS_RAP_FOLDER;
    }

    /**
     * @return string
     */
    public function getResultsFolder()
    {
        $this->createIsNotDir(self::RESULT_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::RESULT_FOLDER;
    }

    /**
     * @return string
     */
    public function getPressReunionFolder()
    {
        $this->createIsNotDir(self::GNY_PRESS_REUNION_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::GNY_PRESS_REUNION_FOLDER;
    }

    /**
     * @return string
     */
    public function getPressQ5Folder()
    {
        $this->createIsNotDir(self::GNY_SELECTION_PRESS_Q5_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::GNY_SELECTION_PRESS_Q5_FOLDER;
    }

    /**
     * @return string
     */
    public function getForcesPresenceFolder()
    {
        $this->createIsNotDir(self::GNY_FORCES_PRESENCE_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::GNY_FORCES_PRESENCE_FOLDER;
    }

    /**
     * @return string
     */
    public function getPronoQ5Folder()
    {
        $this->createIsNotDir(self::GNY_PRONO_Q5_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::GNY_PRONO_Q5_FOLDER;
    }

    /**
     * @return string
     */
    public function getNonRunnerFolder()
    {
        $this->createIsNotDir(self::NON_RUNNER_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::NON_RUNNER_FOLDER;
    }

    /**
     * @return string
     */
    public function getLiveOddSSGFolder()
    {
        $this->createIsNotDir(self::LIVE_ODDS_SG_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::LIVE_ODDS_SG_FOLDER;
    }

    /**
     * @return string
     */
    public function getPrizeListFolder()
    {
        $this->createIsNotDir(self::PRIZE_LIST_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "XML" . DIRECTORY_SEPARATOR . self::PRIZE_LIST_FOLDER;
    }

    /**
     * @return string
     */
    public function getCasaquesFolder()
    {
        $this->createIsNotDirBinary(self::CASAQUES_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY" . DIRECTORY_SEPARATOR . self::CASAQUES_FOLDER;
    }

    /**
     * @return string
     */
    public function getHippodromesFolder()
    {
        $this->createIsNotDirBinary(self::HIPPODROMES_FOLDER);
        return $this->dayFolder . DIRECTORY_SEPARATOR . "BINARY" . DIRECTORY_SEPARATOR . self::HIPPODROMES_FOLDER;
    }

    public function getTodoFolderPath($path) {

        return self::RECTXML_FOLDER_PATH_TODO . DIRECTORY_SEPARATOR . $path;
    }

    public function getDoneFolderPath($path) {

        return self::RECTXML_FOLDER_PATH_DONE . DIRECTORY_SEPARATOR . $path;
    }

    /**
     * @param $path
     * @return array
     */
    public function scanFolder($path)
    {
        $path = $this->getTodoFolderPath($path);
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

    public function mvFileDone($filePath) {

        rename($this->getTodoFolderPath($filePath), $this->getDoneFolderPath($filePath));
    }

    public function deleteFilesFromYesterday() {

        $this->deleteFiles(self::RECTXML_FOLDER_PATH_TODO. DIRECTORY_SEPARATOR .date('Ymd', strtotime($this->dayFolder .' -10DAY')));
        $this->deleteFiles(self::RECTXML_FOLDER_PATH_DONE. DIRECTORY_SEPARATOR .date('Ymd', strtotime($this->dayFolder .' -10DAY')));
    }

    function deleteFiles($target) {
        if(is_dir($target)){
            $files = glob( $target . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned

            foreach( $files as $file ){
                $this->deleteFiles( $file );
            }

            if(is_dir($target)) {
                rmdir( $target );
            }
        } elseif(is_file($target)) {
            unlink( $target );
        }
    }
}
