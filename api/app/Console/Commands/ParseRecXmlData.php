<?php

namespace App\Console\Commands;

use App\Bet;
use App\BetResult;
use App\Prediction;
use App\Race;
use App\Reporter;
use App\Runner;
use App\Reunion;
use App\Services\Interfaces\DataServiceInterface;
use Illuminate\Console\Command;

class ParseRecXmlData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recXML:parseData {date=today}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Will parse data sent from PMU Infocentre';

    /**
     * Create a new command instance.
     *
     * @return void
     */

    protected $dataService;
    protected $date;

    public function __construct()
    {
        parent::__construct();
        $this->date = (new \DateTime())->format("Ymd");
    }

    /**
     * @param DataServiceInterface $dataService
     * @throws \Exception
     */
    public function handle(DataServiceInterface $dataService)
    {
        $this->dataService = $dataService;
        $argDate = $this->argument('date');

        $this->dataService->setDayFolder(($argDate != 'today') ? $argDate : $this->date);

        $this->unzipHippodromes();
        $this->unzipCasaques();

        $this->parseDayReunionsXML();
        $this->parseReunionsXML();
        $this->parseRacesXML();
        $this->parseRunnersXML();
        $this->parseRunnerMusicsXML();
        $this->parseResultsXML();
        $this->parseResultsXML();
        $this->parseBetsXML();
        $this->parseBetResultsXML();

        $this->parsePressReunionXML();
        $this->parsePressQ5XML();
        $this->parseForcesPresenceXML();
        $this->parsePronoQ5XML();

        $this->parseNonRunnerXML();
        $this->parseLiveOddSSGXML();
        $this->parsePrizeListXML();

        $this->dataService->deleteFilesFromYesterday();

        return 0;
    }

    private function parseDayReunionsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getDayReunionsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                    ]

                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "label" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_reunion"]),
                            "statusLabel" => iconv('UTF-8', 'ISO-8859-1', $parsedXml["jour"]["libelle_statut_infos"]),
                            "speciality" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["specialite_reunion"]),
                            "category" => $reunion['value']["categorie_reunion"],
                            "type" => $reunion['value']["type_reunion"],
                            "audience" => $reunion['value']["audience_gpe_reunion"],
                            "progvalid" => $reunion['value']["progvalide_reunion"],
                            "hippodromeName" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_hippo_reunion"]),
                            "code" => $reunion['value']["code_hippo"],
                            "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " " . (!empty($reunion['value']["heure_reunion"]) ? $reunion['value']["heure_reunion"] : '00:00') . ":00")),
                            "racesNumber" => $reunion['value']["nbcourse_reunion"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];

                        try {
                            Reunion::updateOrInsert(
                                ["id" => $reunion['value']["id_nav_reunion"]],
                                $reunionArr
                            );
                        } catch (\Exception $e) {
                            print_r('
    parseDayReunionsXML => 
    ');
                            print_r(array_merge($reunionArr, ["id" => $reunion['value']["id_nav_reunion"]]));
                            print_r($e->getMessage());
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getDayReunionsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseReunionsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getReunionsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                    ]

                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "label" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_reunion"]),
                            "statusLabel" => iconv('UTF-8', 'ISO-8859-1', $parsedXml["jour"]["libelle_statut_infos"]),
                            "speciality" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["specialite_reunion"]),
                            "category" => $reunion['value']["categorie_reunion"],
                            "type" => $reunion['value']["type_reunion"],
                            "audience" => $reunion['value']["audience_gpe_reunion"],
                            "progvalid" => $reunion['value']["progvalide_reunion"],
                            "hippodromeName" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_hippo_reunion"]),
                            "code" => $reunion['value']["code_hippo"],
                            "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " " . (!empty($reunion['value']["heure_reunion"]) ? $reunion['value']["heure_reunion"] : '00:00') . ":00")),
                            "racesNumber" => $reunion['value']["nbcourse_reunion"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];

                        try {
                            Reunion::updateOrInsert(
                                ["id" => $reunion['value']["id_nav_reunion"]],
                                $reunionArr
                            );
                        } catch (\Exception $e) {
                            print_r('
    parseReunionsXML => 
    ');
                            print_r(array_merge($reunionArr, ["id" => $reunion['value']["id_nav_reunion"]]));
                            print_r($e->getMessage());
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getReunionsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseRacesXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getRacesFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "label" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_reunion"]),
                            "statusLabel" => iconv('UTF-8', 'ISO-8859-1', $parsedXml["jour"]["libelle_statut_infos"]),
                            "type" => $reunion['value']["type_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " " . $reunion['value']["heure_reunion"] . ":00")),
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {

                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'description' => iconv('UTF-8', 'ISO-8859-1', $race['value']["conditions_course"]["conditions_txt_course"]),
                                    'gender' => $race['value']["conditions_course"]["sexe_cond_course"],
                                    'valnomPrixCourse' => $race['value']["valnom_prix_course"],
                                    'totalAllocation' => $race['value']["allocations_course"]["montant_total_allocation"],
                                    'firstAllocation' => $race['value']["allocations_course"]["allocation_premier_partant"],
                                    'secondAllocation' => $race['value']["allocations_course"]["allocation_deuxieme_partant"],
                                    'thirdAllocation' => $race['value']["allocations_course"]["allocation_troisieme_partant"],
                                    'fourthAllocation' => $race['value']["allocations_course"]["allocation_quatrieme_partant"],
                                    'fifthAllocation' => $race['value']["allocations_course"]["allocation_cinquieme_partant"],
                                    'sixthAllocation' => $race['value']["allocations_course"]["allocation_sixieme_partant"],
                                    'seventhAllocation' => $race['value']["allocations_course"]["allocation_septieme_partant"],
                                    'externNumber' => $race['value']["num_externe_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    'label' => iconv('UTF-8', 'ISO-8859-1', $race['value']["libcourt_prix_course"]),
                                    'labelLong' => iconv('UTF-8', 'ISO-8859-1', $race['value']["liblong_prix_course"]),
                                    'distance' => $race['value']["distance_course"],
                                    'type' => iconv('UTF-8', 'ISO-8859-1', $race['value']["lib_corde_course"]),
                                    'discipline' => iconv('UTF-8', 'ISO-8859-1', $race['value']["discipline_course"]),
                                    'countryCode' => $race['value']["code_pays"],
                                    "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " " . $race['value']["heure_depart_course"] . ":00")),
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    Race::updateOrInsert(
                                        ['id' => $race['value']["id_nav_course"]],
                                        $raceArr
                                    );
                                } catch (\Exception $e) {
                                    print_r('
        parseRacesXML => 
        ');
                                    print_r(array_merge($raceArr, ['id' => $race['value']["id_nav_course"]]));
                                    print_r($e->getMessage());
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getRacesFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseRunnersXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getRunnersFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                        "partant",
                        "genealogie_partant",
                        "proprietaire_partant",
                        "entraineur_partant",
                        "eleveur_partant",
                        "monte_partant",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "type" => $reunion['value']["type_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "date" => date("Y-m-d 00:00:00", strtotime($reunion['value']["date_reunion"])),
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'description' => iconv('UTF-8', 'ISO-8859-1', $race['value']["conditions_course"]["conditions_txt_course"]),
                                    'gender' => $race['value']["conditions_course"]["sexe_cond_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    'label' => iconv('UTF-8', 'ISO-8859-1', $race['value']["libcourt_prix_course"]),
                                    'labelLong' => iconv('UTF-8', 'ISO-8859-1', $race['value']["liblong_prix_course"]),
                                    'distance' => $race['value']["distance_course"],
                                    "date" => date("Y-m-d 00:00:00", strtotime($reunion['value']["date_reunion"])),
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["partants"])) {
                                    foreach ($race['value']["partants"] as $runner) {

                                        $runnerArr = [
                                            'name' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["nom_cheval"]),
                                            'number' => $runner['value']["num_partant"],
                                            'breed' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["race_partant"]),
                                            'sex' => $runner['value']["sexe_partant"],
                                            'age' => $runner['value']["age_partant"],
                                            'dress' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["robe_partant"]),
                                            'birthday' => date('Y-m-d', strtotime($runner['value']["date_naiss_partant"])),
                                            'color' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["couleur_partant"]),
                                            'father' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["genealogie_partant"]["nom_pere"]),
                                            'mother' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["genealogie_partant"]["nom_mere"]),
                                            'owner' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["proprietaire_partant"]["nom_proprietaire"]),
                                            'coach' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["entraineur_partant"]["nom_entraineur"]),
                                            'jokey' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["monte_partant"]["nom_monte"]),
                                            'farmer' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["eleveur_partant"]["nom_eleveur"]),
                                            "raceId" => $raceObj->id,
                                        ];

                                        try {
                                            Runner::updateOrInsert(
                                                ['id' => $runner['value']["id_nav_partant"]],
                                                $runnerArr
                                            );
                                        } catch (\Exception $e) {
                                            print_r('
            parseRunnersXML => 
            ');
                                            print_r(array_merge($runnerArr, ['id' => $runner['value']["id_nav_partant"]]));
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getRunnersFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseRunnerMusicsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getRunnerMusicsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "partant",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "type" => $reunion['value']["type_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "date" => date("Y-m-d 00:00:00", strtotime($reunion['value']["date_reunion"])),
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["partants"])) {
                                    foreach ($race['value']["partants"] as $runner) {

                                        $runnerObj = Runner::where(['id' => $runner['value']["id_nav_partant"]])->first();
                                        try {
                                            $runnerObj->music = iconv('UTF-8', 'ISO-8859-1', $runner['value']["musique_partant"]);
                                            $runnerObj->save();
                                        } catch (\Exception $e) {
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getRunnerMusicsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseResultsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getResultsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                        "partant",
                        "genealogie_partant",
                        "proprietaire_partant",
                        "entraineur_partant",
                        "eleveur_partant",
                        "monte_partant",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["partants"])) {
                                    foreach ($race['value']["partants"] as $runner) {

                                        $runnerArr = [
                                            'name' => iconv('UTF-8', 'ISO-8859-1', $runner['value']["nom_cheval"]),
                                            'number' => $runner['value']["num_partant"],
                                            'rank' => $runner['value']['num_place_arrivee'],
                                            'textRank' => $runner['value']['texte_place_arrivee'],
                                            'reductionKm' => $runner['value']['reduction_km'],
                                            'time' => $runner['value']['temps_part'],
                                            "raceId" => $raceObj->id,
                                        ];

                                        try {
                                            Runner::updateOrInsert(
                                                ['id' => $runner['value']["id_nav_partant"]],
                                                $runnerArr
                                            );
                                        } catch (\Exception $e) {
                                            print_r('
            parseResultsXML => 
            ');
                                            print_r(array_merge($runnerArr, ['id' => $runner['value']["id_nav_partant"]]));
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getResultsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseNonRunnerXML()
    {


        $filesInfo = $this->dataService->scanFolder($this->dataService->getNonRunnerFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "partant",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["non_partants"])) {
                                    foreach ($race['value']["non_partants"] as $runner) {

                                        $runnerArr = [
                                            'doNotRun' => 1,
                                        ];

                                        $runnerObj = Runner::where(['id' => $runner['value']["id_nav_partant"]])->first();

                                        try {
                                            if (!empty($runnerObj)) {

                                                $runnerObj->update(
                                                    $runnerArr
                                                );
                                            }

                                        } catch (\Exception $e) {
                                            print_r('
            parseNonRunnerXML => 
            ');
                                            print_r($runnerArr);
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getNonRunnerFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseLiveOddSSGXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getLiveOddSSGFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                        "rapps_probs",
                        "rapp_prob_part",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if (!empty($race['value']["rapps_probs"]["rapps_probs_part"])) {
                                    foreach ($race['value']["rapps_probs"]["rapps_probs_part"] as $runner) {

                                        $runnerArr = [
                                            'reportRef' => !empty($runner['value']['rapp_ref']) ? $runner['value']['rapp_ref'] : '',
                                            'reportEvol' => !empty($runner['value']['rapp_evol']) ? $runner['value']['rapp_evol'] : '',
                                            'favorite' => !empty($runner['value']['favori']) ? $runner['value']['favori'] : '',
                                            'signs' => !empty($runner['value']['signes']) ? $runner['value']['signes'] : '',
                                            'tendency' => !empty($runner['value']['tendance']) ? $runner['value']['tendance'] : '',
                                            'tendencySign' => !empty($runner['value']['tendance_signe']) ? $runner['value']['tendance_signe'] : '',
                                        ];

                                        $runnerObj = Runner::where([
                                            ['number', $runner['value']['num_partant']],
                                            ["raceId", $raceObj->id],
                                        ])->first();

                                        try {
                                            if (!empty($runnerObj)) {
                                                $runnerObj->update(
                                                    $runnerArr
                                                );
                                            }
                                        } catch (\Exception $e) {
                                            print_r('
        parseLiveOddSSGXML => 
        ');
                                            print_r($runnerArr);
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getLiveOddSSGFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parsePrizeListXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getPrizeListFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                        "partant",
                        "carriere_partant",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["partants"])) {
                                    foreach ($race['value']["partants"] as $runner) {

                                        $runnerArr = [
                                            'nbRaces' => $runner['value']['carriere_partant']['nb_courses_partant'],
                                            'nbRacesWon' => $runner['value']['carriere_partant']['nb_vict_partant'],
                                            'nbPlaces' => $runner['value']['carriere_partant']['nb_places_partant'],
                                        ];

                                        $runnerObj = Runner::where(['id' => $runner['value']["id_nav_partant"]])->first();

                                        try {
                                            if (!empty($runnerObj)) {

                                                $runnerObj->update(
                                                    $runnerArr
                                                );
                                            }

                                        } catch (\Exception $e) {
                                            print_r('
            parsePrizeListXML => 
            ');
                                            print_r($runnerArr);
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getPrizeListFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseBetsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getBetsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "pari_course",
                        "conditions_course",
                        "allocations_course",
                        "etat_terrain_reunion",
                        "pari_course",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    'label' => iconv('UTF-8', 'ISO-8859-1', $race['value']["libcourt_prix_course"]),
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if (!empty($race['value']["paris_course"])) {

                                    $hasQN = false;
                                    foreach ($race['value']["paris_course"] as $bet) {

                                        $betArr = [
                                            'lib' => iconv('UTF-8', 'ISO-8859-1', $bet['value']["libcourt_pari_course"]),
                                            'libLong' => iconv('UTF-8', 'ISO-8859-1', $bet['value']["liblong_pari_course"])
                                        ];

                                        if($betArr['lib'] == 'QN') {
                                            $hasQN = $raceArr['number'];
                                        }

                                        try {
                                            Bet::updateOrInsert([
                                                'code' => $bet['value']["code_pari"],
                                                "raceId" => $raceObj->id
                                            ],
                                                $betArr
                                            );
                                        } catch (\Exception $e) {
                                            print_r('
        parseBetsXML => 
        ');
                                            print_r(array_merge($betArr, [
                                                'code' => $bet['value']["code_pari"],
                                                "raceId" => $raceObj->id
                                            ]));
                                            print_r($e->getMessage());
                                        }
                                    }
                                    if($hasQN) {

                                        $reunionObj = Reunion::where(['id' => $reunionArr["id"]])->first();

                                        try {
                                            if (!empty($reunionObj)) {

                                                $reunionObj->update(
                                                    ['qn' => $hasQN]
                                                );
                                            }

                                        } catch (\Exception $e) {
                                            print_r('
            parseBetsXML => 
            ');
                                            print_r($reunionObj);
                                            print_r($e->getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getBetsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseBetResultsXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getBetResultsFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "pari_course",
                        "combinaison",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if(!empty($race['value']["paris_course"])) {
                                    foreach ($race['value']["paris_course"] as $bet) {

                                        $betArr = [
                                            'code' => $bet['value']["code_pari_generique"],
                                            "raceId" => $raceObj->id,
                                        ];

                                        /*
                                            $BetObj = Bet::where([
                                                ["code", '=', $bet['value']["code_pari_generique"]],
                                                ["raceId", '=', $raceObj->id],
                                            ])->first();
                                        */
                                        $BetObj = new Bet($betArr);

                                        if(!empty($bet['value']["combinaisons"])) {
                                            foreach ($bet['value']["combinaisons"] as $betResult) {

                                                $betResultArr = [
                                                    'gagnant' => $betResult['value']['gagnant'],
                                                    'gagnantMb' => $betResult['value']['gagnant_mb'],
                                                    'place' => $betResult['value']['place'],
                                                    'placeMb' => $betResult['value']['place_mb'],
                                                    'sumMisesGagn' => $betResult['value']['sum_mises_gagn'],
                                                    'sumMisesPlace' => $betResult['value']['sum_mises_place'],
                                                    'sumMisesGagnTypeResRapDef' => $betResult['value']['sum_mises_gagn_type_res_rap_def'],
                                                    'sumMisesWPlaceTypeResRapDef' => $betResult['value']['sum_mises_place_type_res_rap_def'],
                                                ];

                                                try {
                                                    BetResult::updateOrInsert([
                                                        'combinaisonRapDef' => $betResult['value']['combinaison_rap_def'],
                                                        'typeReserveRapDef' => iconv('UTF-8', 'ISO-8859-1', $betResult['value']['type_reserve_rap_def']),
                                                        'code' => $BetObj->code,
                                                        "raceId" => $raceObj->id,
                                                    ],
                                                        $betResultArr
                                                    );
                                                } catch (\Exception $e) {
                                                    print_r('
                parseBetResultsXML => 
                ');
                                                    print_r(array_merge($betResultArr, [
                                                        'combinaisonRapDef' => $betResult['value']['combinaison_rap_def'],
                                                        'typeReserveRapDef' => iconv('UTF-8', 'ISO-8859-1', $betResult['value']['type_reserve_rap_def']),
                                                        'code' => $BetObj->code,
                                                        "raceId" => $raceObj->id,
                                                    ]));
                                                    print_r($e->getMessage());
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getBetResultsFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parsePressReunionXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getPressReunionFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "journal",
                        "journalistes",
                        "journaliste",
                        "pronostic"
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if (!empty($race['value']["journals"])) {
                                    foreach ($race['value']["journals"] as $journal) {

                                        $journalArr = [
                                            "societe" => iconv('UTF-8', 'ISO-8859-1', $journal['value']['societe']),
                                            "reporter" => iconv('UTF-8', 'ISO-8859-1', $journal['value']['journalistes']['journaliste']['nom_journaliste']),
                                            "raceId" => $raceObj->id,
                                        ];

                                        try {
                                            $ReporterObj = Reporter::where([
                                                ["societe", '=', iconv('UTF-8', 'ISO-8859-1', $journal['value']['societe'])],
                                                ["reporter", '=', iconv('UTF-8', 'ISO-8859-1', $journal['value']['journalistes']['journaliste']['nom_journaliste'])],
                                                ["raceId", '=', $raceObj->id],
                                            ])->first();

                                            if (empty($ReporterObj->id)) {

                                                $ReporterObj = new Reporter($journalArr);
                                                $ReporterObj->save();
                                            }

                                        } catch (\Exception $e) {
                                            var_dump($e->getMessage());
                                        }

                                        if (!empty($journal['value']['journalistes']['journaliste']["pronostics"])) {
                                            foreach ($journal['value']['journalistes']['journaliste']["pronostics"] as $pronostic) {

                                                $predictionArr = [
                                                    "number" => $pronostic['value']['num_partant'],
                                                    "runner" => iconv('UTF-8', 'ISO-8859-1', $pronostic['value']['nom_cheval']),
                                                ];

                                                try {
                                                    Prediction::updateOrInsert([
                                                        "rank" => $pronostic['value']['rang'],
                                                        "reporterId" => $ReporterObj->id
                                                    ],
                                                        $predictionArr
                                                    );
                                                } catch (\Exception $e) {
                                                    print_r('
        parsePressReunionXML => 
        ');
                                                    print_r(array_merge($predictionArr, [
                                                        "rank" => $pronostic['value']['rang'],
                                                        "reporterId" => $ReporterObj->id
                                                    ]));
                                                    print_r($e->getMessage());
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getPressReunionFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parsePressQ5XML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getPressQ5Folder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "journal",
                        "selection"
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Race($raceArr);

                                if (!empty($race['value']["journals"])) {
                                    foreach ($race['value']["journals"] as $journal) {

                                        $journalArr = [
                                            "societe" => iconv('UTF-8', 'ISO-8859-1', $journal['value']['societe']),
                                            "reporter" => iconv('UTF-8', 'ISO-8859-1', $journal['value']['journaliste']),
                                            "reporter_rank" => $journal['value']['rg_journaliste'],
                                            "nb_pts" => $journal['value']['nb_pts'],
                                            "raceId" => $raceObj->id,
                                        ];

                                        try {

                                            $ReporterObj = Reporter::where([
                                                ["societe", '=', iconv('UTF-8', 'ISO-8859-1', $journal['value']['societe'])],
                                                ["reporter", '=', iconv('UTF-8', 'ISO-8859-1', $journal['value']['journaliste'])],
                                                ["raceId", '=', $raceObj->id],
                                            ])->first();

                                            if (empty($ReporterObj->id)) {

                                                $ReporterObj = new Reporter($journalArr);
                                                $ReporterObj->save();
                                            }

                                        } catch (\Exception $e) {
                                            var_dump($e->getMessage());
                                        }

                                        if (!empty($journal['value']['selections'])) {
                                            foreach ($journal['value']['selections'] as $pronostic) {

                                                $predictionArr = [
                                                    "number" => $pronostic['value']['num_partant'],
                                                    "runner" => iconv('UTF-8', 'ISO-8859-1', $pronostic['value']['nom_cheval']),
                                                ];

                                                try {
                                                    Prediction::updateOrInsert([
                                                        "rank" => $pronostic['value']['rg_partant'],
                                                        "reporterId" => $ReporterObj->id
                                                    ],
                                                        $predictionArr
                                                    );
                                                } catch (\Exception $e) {
                                                    var_dump($e->getMessage());
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getPressQ5Folder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parseForcesPresenceXML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getForcesPresenceFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                        "partant"
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $raceArr = [
                                    'id' => $race['value']["id_nav_course"],
                                    'number' => $race['value']["num_course_pmu"],
                                    "reunionId" => $reunionObj->id
                                ];

                                try {
                                    //Race::insert(
                                    //    $raceArr
                                    //);
                                } catch (\Exception $e) {
                                }
                                $raceObj = new Reunion($raceArr);

                                if(!empty($race['value']['partants'])) {
                                    foreach ($race['value']['partants'] as $partant) {

                                        $RunnerObj = Runner::where([
                                            ['number', '=', $partant['value']["num_partant"]],
                                            ['raceId', '=', $raceObj->id],
                                        ])->first();

                                        $RunnerObj->comment = iconv('UTF-8', 'ISO-8859-1', $partant['value']['commentaire']);
                                        $RunnerObj->save();
                                    }
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getForcesPresenceFolder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function parsePronoQ5XML()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getPronoQ5Folder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $this->dataService->parseXMLFileByPath(
                    $filesInfo["path"] . DIRECTORY_SEPARATOR . $fileName,
                    [
                        "jours",
                        "jour",
                        "reunion",
                        "course",
                    ]
                );

                if(!empty($parsedXml["jour"]["reunions"])) {
                    foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                        $reunionArr = [
                            "id" => $reunion['value']["id_nav_reunion"],
                            "code" => $reunion['value']["code_hippo"],
                            "number" => $reunion['value']["num_reunion"],
                            "externNumber" => $reunion['value']["num_externe_reunion"],
                        ];
                        try {
                            //Reunion::insert(
                            //    $reunionArr
                            //);
                        } catch (\Exception $e) {
                        }
                        $reunionObj = new Reunion($reunionArr);

                        if(!empty($reunion['value']["courses"])) {
                            foreach ($reunion['value']["courses"] as $race) {

                                $RaceObj = Race::where('id', $race['value']["id_nav_course"])->first();
                                if (!empty($RaceObj)) {
                                    $RaceObj->comment = iconv('UTF-8', 'ISO-8859-1', $race['value']['commentaire']);
                                    $RaceObj->save();
                                }
                            }
                        }
                    }
                }
                // DELETE THE FILE
                $this->dataService->mvFileDone($this->dataService->getPronoQ5Folder() . DIRECTORY_SEPARATOR . $fileName);
            }
        }
    }

    private function unzipCasaques()
    {

        $filesInfo = $this->dataService->scanFolder($this->dataService->getCasaquesFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {

                $zip = new \ZipArchive();
                if ($zip->open($filesInfo['path'] . '/' . $fileName) === TRUE) {
                    $zip->extractTo(__DIR__ . '/../../../public/img/casaques/');
                    $zip->close();
                    // unlink($this->dataService->getCasaquesFolder().'/'.$fileName);
                    $this->dataService->mvFileDone($this->dataService->getCasaquesFolder() . DIRECTORY_SEPARATOR . $fileName);
                } else {
                    echo 'unzip error';
                }
            }
        }
    }

    private function unzipHippodromes()
    {
        $filesInfo = $this->dataService->scanFolder($this->dataService->getHippodromesFolder());
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $zip = new \ZipArchive();
                if ($zip->open($filesInfo['path'] . '/' . $fileName) === TRUE) {
                    $zip->extractTo(__DIR__ . '/../../../public/img/hippodromes/');
                    $zip->close();
                    // unlink($this->dataService->getHippodromesFolder().'/'.$fileName);
                    $this->dataService->mvFileDone($this->dataService->getHippodromesFolder() . DIRECTORY_SEPARATOR . $fileName);
                } else {
                    echo 'unzip error';
                }
            }
        }
    }
}
