<?php

namespace App\Console\Commands;

use App\Race;
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
    }

    private function parseReunionsXML($dataService) {

        $filesInfo = $dataService->scanReunionsFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
                    [
                        "jours" => 'Sabre\Xml\Deserializer\keyValue',
                        "jour" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunions" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunion" => 'Sabre\Xml\Deserializer\keyValue',
                        "courses" => 'Sabre\Xml\Deserializer\keyValue',
                        "course" => 'Sabre\Xml\Deserializer\keyValue',
                        "conditions_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "allocations_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "etat_terrain_reunion" => 'Sabre\Xml\Deserializer\keyValue',

                    ]
                );

                foreach ($parsedXml["{}jour"]["{}reunions"] as $reunion) {

                    $reunionArr[] = [
                        "id" => $reunion["{}id_nav_reunion"],
                        "label" => $reunion["{}lib_reunion"],
                        "statusLabel" => $parsedXml["{}jour"]["{}libelle_statut_infos"],
                        "speciality" => $reunion["{}specialite_reunion"],
                        "category" => $reunion["{}categorie_reunion"],
                        "type" => $reunion["{}type_reunion"],
                        "audience" => $reunion["{}audience_gpe_reunion"],
                        "progvalid" => $reunion["{}progvalide_reunion"],
                        "hippodromeName" => $reunion["{}lib_hippo_reunion"],
                        "code" => $reunion["{}code_hippo"],
                        "date" => date("Y-m-d H:i:s", strtotime($reunion["{}date_reunion"] . " ".$reunion["{}heure_reunion"] . ":00")),
                        "racesNumber" => $reunion["{}nbcourse_reunion"],
                        "number" => $reunion["{}num_reunion"],
                        "externNumber" => $reunion["{}num_externe_reunion"],
                    ];
                }
            }
        }

        try {
            $reunionsResponse = Reunion::insert($reunionArr);
            var_dump($reunionsResponse);
            //@TODO DELETE THE FILE
        } catch (\Exception $e) {

        }


    }

    private function parseRacesXML($dataService) {

        $filesInfo = $dataService->scanRacesFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
                    [
                        "jours" => 'Sabre\Xml\Deserializer\keyValue',
                        "jour" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunions" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunion" => 'Sabre\Xml\Deserializer\keyValue',
                        "courses" => 'Sabre\Xml\Deserializer\keyValue',
                        "course" => 'Sabre\Xml\Deserializer\keyValue',
                        "conditions_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "allocations_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "etat_terrain_reunion" => 'Sabre\Xml\Deserializer\keyValue',
                    ]
                );

                foreach ($parsedXml["{}jour"]["{}reunions"] as $reunion) {
                    $reunionObj = new Reunion([
                        "reunionId" => $reunion["{}id_nav_reunion"],
                        "label" => $reunion["{}lib_reunion"],
                        "type" => $reunion["{}type_reunion"],
                        "code" => $reunion["{}code_hippo"],
                        "date" => strtotime($reunion["{}date_reunion"] . " ".$reunion["{}heure_reunion"]),
                        "number" => $reunion["{}num_reunion"],
                        "externNumber" => $reunion["{}num_externe_reunion"],
                    ]);
                    $races = [];
                    foreach ($reunion["{}courses"] as $race) {

                        $races[] = new Race([
                            'id' => $race["{}id_nav_course"],
                            'raceDescription' => $race["{}conditions_course"]["{}conditions_txt_course"],
                            'raceGender' => $race["{}conditions_course"]["{}sexe_cond_course"],
                            'valnomPrixCourse' => $race["{}valnom_prix_course"],
                            'totalAllocation' => $race["{}allocations_course"]["{}montant_total_allocation"],
                            'firstAllocation' => $race["{}allocations_course"]["{}allocation_premier_partant"],
                            'secondAllocation' => $race["{}allocations_course"]["{}allocation_deuxieme_partant"],
                            'thirdAllocation' => $race["{}allocations_course"]["{}allocation_troisieme_partant"],
                            'fourthAllocation' => $race["{}allocations_course"]["{}allocation_quatrieme_partant"],
                            'fifthAllocation' => $race["{}allocations_course"]["{}allocation_cinquieme_partant"],
                            'sixthAllocation' => $race["{}allocations_course"]["{}allocation_sixieme_partant"],
                            'seventhAllocation' => $race["{}allocations_course"]["{}allocation_septieme_partant"],
                            'raceExternNumber' => $race["{}num_externe_course"],
                            'raceNumber' => $race["{}num_course_pmu"],
                            'label' => $race["{}libcourt_prix_course"],
                            'labelLong' => $race["{}liblong_prix_course"],
                            'distance' => $race["{}distance_course"],
                            'raceType' => $race["{}lib_corde_course"],
                            'discipline' => $race["{}discipline_course"],
                            'countryCode' => $race["{}code_pays"],
                            "date" => date("Y-m-d H:i:s", strtotime($reunion["{}date_reunion"] . " ".$reunion["{}heure_reunion"] . ":00")),
                            "reunionId" => $reunion["{}id_nav_reunion"]
                        ]);
                        var_dump($races);exit;
                    }

                    var_dump($reunionObj->races()->saveMany($races));
                    exit("aqqaqaqa");
                }


            }
        }
    }

    private function parseRunnersXML($dataService) {

        $filesInfo = $dataService->scanRacesFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                $parsedXml = $dataService->parseXMLFileByPath(
                    $filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName,
                    [
                        "jours" => 'Sabre\Xml\Deserializer\keyValue',
                        "jour" => 'Sabre\Xml\Deserializer\keyValue',
                        "id_nav_reunion" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunions" => 'Sabre\Xml\Deserializer\keyValue',
                        "reunion" => 'Sabre\Xml\Deserializer\keyValue',
                        "courses" => 'Sabre\Xml\Deserializer\keyValue',
                        "course" => 'Sabre\Xml\Deserializer\keyValue',
                        "conditions_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "allocations_course" => 'Sabre\Xml\Deserializer\keyValue',
                        "etat_terrain_reunion" => 'Sabre\Xml\Deserializer\keyValue',
                    ]
                );

                foreach ($parsedXml["{}jour"]["{}reunions"] as $reunion) {

                    $reunionObj = new Reunion([
                        "reunionId" => $reunion["{}id_nav_reunion"],
                        "label" => $reunion["{}lib_reunion"],
                        "type" => $reunion["{}type_reunion"],
                        "code" => $reunion["{}code_hippo"],
                        "date" => strtotime($reunion["{}date_reunion"] . " ".$reunion["{}heure_reunion"]),
                        "number" => $reunion["{}num_reunion"],
                        "externNumber" => $reunion["{}num_externe_reunion"],
                    ]);
                    $races = [];
                    foreach ($reunion["{}courses"] as $race) {

                        $races[] = new Race([
                            'id' => $race["{}id_nav_course"]
                        ]);
                    }

                    var_dump($reunionObj->races()->saveMany($races));
                    exit;
                }


            }
        }
    }
}
