<?php

namespace App\Console\Commands;

use App\Bet;
use App\Race;
use App\Runner;
use App\Reunion;
use App\Services\Interfaces\DataServiceInterface;
use Illuminate\Console\Command;
use Mockery\Exception;

class ParseRecXmlData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recXML:parseData';

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
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param DataServiceInterface $dataService
     */
    public function handle(DataServiceInterface $dataService) {

        $this->parseReunionsXML($dataService);
        $this->parseRacesXML($dataService);
        $this->parseRunnersXML($dataService);
        $this->parseBetsXML($dataService);
    }

    private function parseReunionsXML($dataService) {

        $filesInfo = $dataService->scanReunionsFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
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

                foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                    $reunionArr = [
                        "label" => iconv('UTF-8', 'ISO-8859-1',$reunion['value']["lib_reunion"]),
                        "statusLabel" => iconv('UTF-8', 'ISO-8859-1',$parsedXml["jour"]["libelle_statut_infos"]),
                        "speciality" => iconv('UTF-8', 'ISO-8859-1',$reunion['value']["specialite_reunion"]),
                        "category" => $reunion['value']["categorie_reunion"],
                        "type" => $reunion['value']["type_reunion"],
                        "audience" => $reunion['value']["audience_gpe_reunion"],
                        "progvalid" => $reunion['value']["progvalide_reunion"],
                        "hippodromeName" => iconv('UTF-8', 'ISO-8859-1',$reunion['value']["lib_hippo_reunion"]),
                        "code" => $reunion['value']["code_hippo"],
                        "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " ".$reunion['value']["heure_reunion"] . ":00")),
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
                        var_dump($e->getMessage());
                    }
                }
                //@TODO DELETE THE FILE
            }
        }
    }

    private function parseRacesXML($dataService) {

        $filesInfo = $dataService->scanRacesFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
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

                foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                    $reunionArr = [
                        "id" => $reunion['value']["id_nav_reunion"],
                        "label" => iconv('UTF-8', 'ISO-8859-1', $reunion['value']["lib_reunion"]),
                        "statusLabel" => iconv('UTF-8', 'ISO-8859-1', $parsedXml["jour"]["libelle_statut_infos"]),
                        "type" => $reunion['value']["type_reunion"],
                        "code" => $reunion['value']["code_hippo"],
                        "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " ".$reunion['value']["heure_reunion"] . ":00")),
                        "number" => $reunion['value']["num_reunion"],
                        "externNumber" => $reunion['value']["num_externe_reunion"],
                    ];
                    try {
                        Reunion::insert(
                            $reunionArr
                        );
                    } catch (\Exception $e) {

                    }
                    $reunionObj = new Reunion(array('id'=>$reunion['value']["id_nav_reunion"]));

                    foreach ($reunion['value']["courses"] as $race) {

                        $raceArr = [
                            'description' => iconv('UTF-8', 'ISO-8859-1',$race['value']["conditions_course"]["conditions_txt_course"]),
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
                            'label' => iconv('UTF-8', 'ISO-8859-1',$race['value']["libcourt_prix_course"]),
                            'labelLong' => iconv('UTF-8', 'ISO-8859-1',$race['value']["liblong_prix_course"]),
                            'distance' => $race['value']["distance_course"],
                            'type' => iconv('UTF-8', 'ISO-8859-1',$race['value']["lib_corde_course"]),
                            'discipline' => iconv('UTF-8', 'ISO-8859-1',$race['value']["discipline_course"]),
                            'countryCode' => $race['value']["code_pays"],
                            "date" => date("Y-m-d H:i:s", strtotime($reunion['value']["date_reunion"] . " ".$reunion['value']["heure_reunion"] . ":00")),
                            "reunionId" => $reunion['value']["id_nav_reunion"]
                        ];

                        Race::updateOrInsert(
                            ['id' => $race['value']["id_nav_course"]],
                            $raceArr
                        );
                    }
                    //@TODO DELETE THE FILE
                }
            }
        }
    }

    private function parseRunnersXML($dataService) {

        $filesInfo = $dataService->scanRunnersFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
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
                        Reunion::insert(
                            $reunionArr
                        );
                    } catch (\Exception $e) {}
                    $reunionObj = new Reunion(array('id'=>$reunion['value']["id_nav_reunion"]));

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
                            "reunionId" => $reunion['value']["id_nav_reunion"]
                        ];

                        try {
                            Race::insert(
                                $raceArr
                            );
                        } catch (\Exception $e) {}
                        $raceObj = new Race(array('id'=>$race['value']["id_nav_course"]));

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
                                "raceId" => $race['value']["id_nav_course"],
                            ];

                            Runner::updateOrInsert(
                                ['id' => $runner['value']["id_nav_partant"]],
                                $runnerArr
                            );
                        }
                    }
                    //@TODO DELETE THE FILE
                }
            }
        }
    }

    private function parseBetsXML($dataService) {

        $filesInfo = $dataService->scanBetsFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
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

                foreach ($parsedXml["jour"]["reunions"] as $reunion) {

                    $reunionArr = [
                        "id" => $reunion['value']["id_nav_reunion"],
                        "code" => $reunion['value']["code_hippo"],
                        "number" => $reunion['value']["num_reunion"],
                        "externNumber" => $reunion['value']["num_externe_reunion"],
                    ];
                    try {
                        Reunion::insert(
                            $reunionArr
                        );
                    } catch (\Exception $e) {}
                    $reunionObj = new Reunion(array('id'=>$reunion['value']["id_nav_reunion"]));

                    foreach ($reunion['value']["courses"] as $race) {

                        $raceArr = [
                            'id' => $race['value']["id_nav_course"],
                            'number' => $race['value']["num_course_pmu"],
                            'label' => iconv('UTF-8', 'ISO-8859-1', $race['value']["libcourt_prix_course"]),
                            "reunionId" => $reunion['value']["id_nav_reunion"]
                        ];

                        try {
                            Race::insert(
                                $raceArr
                            );
                        } catch (\Exception $e) {}
                        $raceObj = new Race(array('id'=>$race['value']["id_nav_course"]));

                        foreach ($race['value']["paris_course"] as $bet) {

                            $betArr = [
                                'lib' => iconv('UTF-8', 'ISO-8859-1', $bet['value']["libcourt_pari_course"]),
                                'libLong' => iconv('UTF-8', 'ISO-8859-1', $bet['value']["liblong_pari_course"]),
                                "raceId" => $race['value']["id_nav_course"],
                            ];

                            try {
                                Bet::updateOrInsert(
                                    ['id' => $bet['value']["code_pari"]],
                                    $betArr
                                );
                            } catch (\Exception $e) {}
                        }
                    }
                    //@TODO DELETE THE FILE
                }
            }
        }
    }
}
