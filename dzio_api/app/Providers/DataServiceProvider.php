<?php

namespace App\Providers;

use App\Services\Interfaces\DataServiceInterface;
use App\Services\RecXMLService;
use Illuminate\Support\ServiceProvider;
use Sabre\Xml\Service;

class DataServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(DataServiceInterface::class, function ($app) {

            return new RecXMLService(new Service());
        });
    }
}
