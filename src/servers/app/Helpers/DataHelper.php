<?php


namespace App\Helpers;


use phpDocumentor\Reflection\Types\Boolean;

class DataHelper
{

	/**
	 * Clear empty space
	 *
	 * @param $string
	 * @return mixed
	 */
	public static function clean($string)
	{
		if($string) {
			$string = preg_replace('/\s+/', '', $string);
			return str_replace(' ', '', $string);
		}

	}
	/**
	 * Get file extension
	 *
	 * @param string $filename
	 * @return mixed
	 */
	public static function getFileExtension($filename)
	{
		$info = new \SplFileInfo($filename);
		$extension = pathinfo($info->getFilename(), PATHINFO_EXTENSION);
		return $extension;
	}

	/**
	 * Replacing Spaces with underscores
	 *
	 * @param string $strName
	 * @return mixed
	 */
	public static function replacingSpacesWithUnderscores($strName)
	{
		return preg_replace('/\s+/', '_', trim($strName));
	}

	/**
	 * Set unique array in multi dimension
	 *
	 * @param unknown $array
	 * @return array
	 */
	public static function uniqueMultiArray($array)
	{
		$result = array_map("unserialize", array_unique(array_map("serialize", $array)));

		foreach ($result as $key => $value)
		{
			if ( is_array($value) )
			{
				$result[$key] = self::uniqueMultiArray($value);
			}
		}

		return $result;
	}


	/**
	 * Convert array to array group by
	 *
	 * @param array $arr
	 * @param array $keys
	 * @return mixed[]|unknown
	 */
	public static function arrayGroupBy(array $arr, array $keys)
	{
		if (! is_array($arr)) {
			trigger_error('array_group_by(): The first argument should be an array', E_USER_ERROR);
		}
		if (count($keys) == 0) {
			trigger_error('array_group_by(): The Second argument Array can not be empty', E_USER_ERROR);
		}

		// Load the new array, splitting by the target key
		$grouped = [];
		foreach ($arr as $value) {
			if (is_array($value)) {
				$grouped[$value[$keys[0]]][] = $value;
			}
		}

		// Recursively build a nested grouping if more parameters are supplied
		// Each grouped array value is grouped according to the next sequential key
		if (count($keys) > 1) {
			foreach ($grouped as $key => $value) {
				$parms = array_merge([
					$value
				], [
					array_slice($keys, 1, count($keys))
				]);
				$grouped[$key] = call_user_func_array('array_group_by', $parms);
			}
		}
		return $grouped;
	}
	/**
	 * Check if the multiple array key exists
	 *
	 * @param array $arr
	 * @param $key
	 * @return bool
	 */
	public static function multiKeyExists(array $arr, $key): bool
	{

		// is in base array?
		if (array_key_exists($key, $arr)) {
			return true;
		}

		// check arrays contained in this array
		foreach ($arr as $element) {
			if (is_array($element)) {
				if (multiKeyExists($element, $key)) {
					return true;
				}
			}
		}

		return false;
	}

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