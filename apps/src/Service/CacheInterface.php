<?php
/**
 * Created by PhpStorm.
 * User: gede
 * Date: 2018/08/12
 * Time: 1:08 PM
 */

namespace App\Service;

interface CacheInterface
{
    public function __construct();

    public function setToken(string $timestamp, string $email): string;

    public function getEmailByToken(string $id, string $token): string;
}