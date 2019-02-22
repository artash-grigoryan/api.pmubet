<?php

namespace App\Console\Commands;

use App\Services\Interfaces\DataServiceInterface;
use Illuminate\Console\Command;

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
    public function handle(DataServiceInterface $dataService)
    {
        $filesInfo = $dataService->scanRacesFolder();
        foreach ($filesInfo["files"] as $fileName) {
            if ($fileName !== "." && $fileName !== "..") {
                var_dump($fileName);
                var_dump($dataService->parseXMLFileByPath($filesInfo["path"]. DIRECTORY_SEPARATOR. $fileName));
                exit("qaq");
            }
        }

    }
}
