<?php


namespace App\Helpers;


class Helper
{

	/**
	 * print object in string
	 *
	 * @param mixed $object
	 * @param boolean $exit
	 */
	public static function dump($object, $exit = false)
	{
		print "<pre>";
		var_dump($object);
		print "</pre>";
		if ($exit) {
			exit();
		}
	}

	/**
	 * print object in string with exit
	 *
	 * @param mixed $object
	 */
	public static function xdump($object)
	{
		print "<pre>";
		print_r($object);
		print "</pre>";
		exit();
	}

	/**
	 * print object in string
	 *
	 * @param $object
	 */
	public static function pre($object)
	{
		print "<pre>";
		print_r($object);
		print "</pre>";
	}
}