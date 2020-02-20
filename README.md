**Dzio project is a PMU project for Armenia** developed by *Nicolas Cramail* and *Artashes Grigoryan*

Once project cloned you should build it, by following instructions below.

*You can see project in live [here](https://dzio.am/).*

---

## Requirements

Find out required softwares below

1. **Docker** should be running.
2. Temporarily Nodejs in your local installed.

---

## Build project

Next, you’ll add a new file to this repository.

1. **docker-compose up -d --build** To build containers:
    * Apache, Php.
    * Mysql.
    * Pma.

2. **source .bashrc** to made composer and npm command linked with container.
3. **composer install**.
4. **cp .env.example .env**.

artisan migrate:fresh --seed to migrate database

If you see this error
*No Application Encryption Key Has Been Specified*
Try to generate the key with this command **docker exec -it dzio_www_1 /bin/sh -c 'cd dzio_api/;php artisan key:generate'** 

Enjoy in [localhost](http://localhost/)!

---