<?php
/**
 * Created by PhpStorm.
 * User: gede
 * Date: 11.03.19
 * Time: 12:59
 */
namespace App\Utils;

use Carbon\Carbon;
use phpDocumentor\Reflection\Types\Static_;
use \Datetime;

class Util
{

	/**
	 * set Status created
	 *
	 * @var integer
	 */
	static $created = 1;

	/**
	 * set Status in Trash
	 *
	 * @var integer
	 */
	static $inTrash = 4;

	/**
	 * set Status in Archive
	 *
	 * @var integer
	 */
	static $inArchive = 3;

	/**
	 * set Status updated
	 *
	 * @var integer
	 */
	static $updated = 2;

	/**
	 * set Status in progress
	 *
	 * @var integer
	 */
	static $inProgress = 2;

	/**
	 * set Status incomplete
	 *
	 * @var integer
	 */
	static $inComplete = 6;

	/**
	 * set Status completed
	 *
	 * @var integer
	 */
	static $completed = 5;

	/**
	 * Set status reopen
	 *
	 * @var integer
	 */
	static $reOpen = 16;

	/**
	 * set 1st level
	 *
	 * @var integer
	 */
	static $int1stLevel = 1;

	/**
	 * Set Deputy 1st level
	 *
	 * @var integer
	 */
	static $intDeputy1stLevel = 4;

	/**
	 * set 2nd level
	 *
	 * @var integer
	 */
	static $int2ndLevel = 2;

	/**
	 * set 3rd level
	 *
	 * @var integer
	 */
	static $int3rdLevel = 3;

	/**
	 * set approved
	 *
	 * @var integer
	 */
	static $approved = 13;

	/**
	 * Set inactive
	 *
	 * @var integer
	 */
	static $inActive = 10;

	/**
	 * Set rejected
	 *
	 * @var integer
	 */
	static $rejected = 4;

	/**
	 * Set foreign exchange daily
	 *
	 * @var integer
	 */
	static $forExDaily = 1;

	/**
	 * Set foreign exchange tax
	 *
	 * @var integer
	 */
	static $forExTax = 2;

	/**
	 * Set stock exchange order buy
	 *
	 * @var integer
	 */
	static $stexTypeBuy = 1;

	/**
	 * Set stock exchange order sell
	 *
	 * @var integer
	 */
	static $stexTypeSell = 2;

	/**
	 * Set status donwloaded
	 *
	 * @var integer
	 */
	static $downloaded = 5;

	/**
	 * Set status sended
	 *
	 * @var integer
	 */
	static $sended = 6;

	/**
	 * Set status settled
	 *
	 * @var integer
	 */
	static $settled = 7;

	/**
	 * Set status matched
	 *
	 * @var integer
	 */
	static $matched = 8;

	/**
	 * Set status unmathced
	 *
	 * @var integer
	 */
	static $unmatched = 9;

	/**
	 * Set status instructed
	 *
	 * @var integer
	 */
	static $Instructed = 10;

	/**
	 * Set status pre matched
	 *
	 * @var integer
	 */
	static $PreMatched = 11;

	/**
	 * Set status Failure
	 *
	 * @var integer
	 */
	static $failure = 12;

	/**
	 * Set user cronjob id
	 *
	 * @var integer
	 */
	static $userCronJob = 999;

	/**
	 * Set settlement mail confirmation
	 *
	 * @var integer
	 */
	static $settlementAvailable = 7;

	/**
	 * Set swiss currency id
	 *
	 * @var integer
	 */
	static $swissCurrencyId = 88;

	/**
	 * Set tape intern
	 *
	 * @var integer
	 */
	static $tapeIntern = 1;

	/**
	 * Set tape extern
	 *
	 * @var integer
	 */
	static $tapeExtern = 2;

	/**
	 * Set actual
	 *
	 * @var integer
	 */
	static $actual = 1;

	/**
	 * Set Curent Datetime
	 *
	 * @return string
	 */
	public static function getTimeStamp()
	{
		$d = new \DateTime();

		return $d->format('Y-m-d H:i:s');
	}

	/**
	 * Formating String Date to MySQL DateFormat
	 *
	 * @param string $strDate
	 * @return string
	 */
	public static function formatDate2SQL($strDate, $strFormat = 'Y-m-d H:i:s')
	{
		$strFind = "(";

		$isExists = strpos($strDate, $strFind);

		if ($isExists !== false) {
			$date = strstr($strDate, " (", true);
			$formatedDate = \Carbon\Carbon::parse($date)->format($strFormat);
		} else {
			$formatedDate = \Carbon\Carbon::parse($strDate)->format($strFormat);
		}
		return $formatedDate;
	}

	public static function formatDate($strDate, $strFormat = 'd.m.Y H:i')
	{
		$formatedDate = \Carbon\Carbon::parse($strDate)->format($strFormat);
		return $formatedDate;
	}

	public static function formatTime($strTime, $strFormat = 'H:i')
	{
		$formatTime = \Carbon\Carbon::parse($strTime)->format($strFormat);
		return $formatTime;
	}

	/**
	 *
	 * @param array $arr
	 * @param mix $key
	 */
	public static function multiKeyExists(array $arr, $key)
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
	 * Set trial Expires 90 days
	 *
	 * @param string $date
	 * @return \Carbon\Carbon
	 */
	public static function getNinetyDaysFromDate(string $date)
	{
		$current = Carbon::parse($date);
		$trialExpires = $current->addDays(90)->format("Y-m-d");
		return $trialExpires;
	}

	/**
	 * Get 15 days in the future
	 *
	 * @param string $date
	 * @return string
	 */
	public static function getNextFifteenDaysDate(string $date)
	{
		$current = Carbon::parse($date);
		$trialExpires = $current->addDays(15)->format("Y-m-d");
		return $trialExpires;
	}

	/**
	 * Get the current date
	 *
	 * @param string $formatDate
	 * @return string date
	 */
	public static function getCurrentDate(string $formatDate = "Y-m-d")
	{
		$date = new \DateTime();
		$curDate = $date->format($formatDate);
		return $curDate;
	}
	/**
	 *  Get the tomorrow date
	 *
	 * @param string $formatDate
	 * @param int $interval
	 * @return unknown
	 */
	public static function getTomorrowDate(string $formatDate = "Y-m-d",int $interval = 1)
	{
		$date = self::getCurrentDate();
		$current = Carbon::parse($date);
		$tomorrow = $current->addDays($interval)->format($formatDate);
		return $tomorrow;
	}

	/**
	 * Convert timestamp to string date
	 *
	 * @param string $strdDate
	 * @return string
	 */
	public static function timeStamp2Date(string $strdDate)
	{
		return date("d.m.Y", $strdDate);
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
	 * Get Status in Trash
	 *
	 * @return number
	 */
	public static function getStatusInTrash()
	{
		return self::$inTrash;
	}

	/**
	 * Get Status updated
	 *
	 * @return number
	 */
	public static function getStatusUpdated()
	{
		return self::$updated;
	}

	/**
	 * Get Status incomplete
	 *
	 * @return number
	 */
	public static function getStatusIncomplete()
	{
		return self::$inComplete;
	}

	/**
	 * Get Status in Archive
	 *
	 * @return number
	 */
	public static function getStatusInArchive()
	{
		return self::$inArchive;
	}

	/**
	 * Get Status created
	 *
	 * @return number
	 */
	public static function getStatusCreated()
	{
		return self::$created;
	}

	/**
	 * Get 1st Level
	 *
	 * @return number
	 */
	public static function get1stLevel()
	{
		return self::$int1stLevel;
	}

	public static function getDeputy1stlevel()
	{
		return self::$intDeputy1stLevel;
	}

	/**
	 * Get 2nd Level
	 *
	 * @return number
	 */
	public static function get2ndLevel()
	{
		return self::$int2ndLevel;
	}

	/**
	 * Get 3rd Level
	 *
	 * @return number
	 */
	public static function get3rdLevel()
	{
		return static::$int3rdLevel;
	}

	/**
	 * Get in progress status
	 *
	 * @return number
	 */
	public static function getInProgress()
	{
		return Static::$inProgress;
	}

	/**
	 * Get completed status
	 *
	 * @return unknown
	 */
	public static function getCompleted()
	{
		return static::$completed;
	}

	/**
	 * Get approved status
	 *
	 * @return number
	 */
	public static function getApproved()
	{
		return static::$approved;
	}

	/**
	 * Get inactive status
	 *
	 * @return number
	 */
	public static function getInActive()
	{
		return static::$inActive;
	}

	/**
	 * Get rejected status
	 *
	 * @return number
	 */
	public static function getRejected()
	{
		return static::$rejected;
	}

	/**
	 * Get foreign exchange daily type
	 *
	 * @return number
	 */
	public static function getForExDaily()
	{
		return static::$forExDaily;
	}

	/**
	 * Get foreign exvhange tax type
	 *
	 * @return number
	 */
	public static function getForExTax()
	{
		return static::$forExTax;
	}

	/**
	 * Get stock exchange order buy
	 *
	 * @return number
	 */
	public static function getStockExchangerOrderBuy()
	{
		return static::$stexTypeBuy;
	}

	/**
	 * Get stock exchange order sell
	 *
	 * @return number
	 */
	public static function getStockExchangerOrderSell()
	{
		return static::$stexTypeSell;
	}

	/**
	 * Get status downloaded
	 *
	 * @return number
	 */
	public static function getStatusDownloaded()
	{
		return self::$downloaded;
	}

	/**
	 * Get status sended
	 *
	 * @return number
	 */
	public static function getStatusSended()
	{
		return self::$sended;
	}

	/**
	 * Get status settled
	 *
	 * @return number
	 */
	public static function getStatusSettled()
	{
		return self::$settled;
	}

	/**
	 * Get status matched
	 *
	 * @return number
	 */
	public static function getStatusMatched()
	{
		return self::$matched;
	}

	/**
	 * Get status unmatched
	 *
	 * @return number
	 */
	public static function getStatusUnmatched()
	{
		return self::$unmatched;
	}

	/**
	 * Get status instructed
	 *
	 * @return number
	 */
	public static function getStatusInstructed()
	{
		return self::$Instructed;
	}

	/**
	 * Get status pre-matched
	 *
	 * @return number
	 */
	public static function getStatusPreMatched()
	{
		return self::$PreMatched;
	}

	/**
	 * Get user cronjob id
	 *
	 * @return number
	 */
	public static function getUserCronjobId()
	{
		return self::$userCronJob;
	}

	/**
	 *
	 * @param float $number
	 * @param int $decimal
	 * @param string $decimalSeparator
	 * @param string $thousandsSeparator
	 * @param int $digitsGrouping
	 * @return boolean|string
	 */
	public static function getSwissCurrencyFormat(float $number, int $decimal = 3, string $decimalSeparator = '.', string $thousandsSeparator = '', int $digitsGrouping = 2)
	{

		// Prepare variables
		$decimal = $decimal * 1;

		// Explode the string received after DOT sign (this is the ISO separator of decimals)
		$aux = explode(".", $number);
		// Extract decimal and integer parts
		$intPart = $aux[0];
		$decPart = isset($aux[1]) ? $aux[1] : '';

		// Adjust decimal part (increase it, or minimize it)
		if ($decimal > 0) {
			// Check actual size of decimal_part
			// If its length is smaller than number of decimals, add trailing zeros, otherwise round it
			if (strlen($decPart) < $decimal) {
				$decPart = str_pad($decPart, $decimal, "0");
			} else {
				$decPart = substr($decPart, 0, $decimal);
			}
		} else {
			// Completely eliminate the decimals, if there $decimal is a negative number
			$decimalSeparator = '';
			$decPart = '';
		}

		// Format the integer part (digits grouping)
		if ($digitsGrouping > 0) {
			$aux = strrev($intPart);
			$intPart = '';
			for ($i = strlen($aux) - 1; $i >= 0; $i --) {
				if ($i % $digitsGrouping == 0 && $i != 0) {
					$intPart .= "{$aux[$i]}{$thousandsSeparator}";
				} else {
					$intPart .= $aux[$i];
				}
			}
		}

		$processedNumber = "{$intPart}{$decimalSeparator}{$decPart}";
		return $processedNumber;
	}

	/*
	 * Get intern tape
	 *
	 * @return number
	 */
	public static function getInternTape()
	{
		return self::$tapeIntern;
	}

	/**
	 * Get extern tape
	 *
	 * @return number
	 */
	public static function getExternTape()
	{
		return self::$tapeExtern;
	}

	/**
	 * Get actual
	 *
	 * @return number
	 */
	public static function getActual()
	{
		return self::$actual;
	}

	/**
	 * Converts Javascript date format into php date format..
	 *
	 * @param
	 *            Javascript date $date.
	 * @return DateTime.
	 */
	public static function formateJsFullDateToPhpDate($date, $pattern)
	{
		$strDate = explode("(", $date);
		$d = new DateTime($strDate[0]);
		return $d->format($pattern);
	}

	/**
	 * Set bussiness 5 days
	 *
	 * @return string[]
	 */
	public static function getBusinessDay()
	{
		$bussinessDay = array(
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday'
		);

		return $bussinessDay;
	}

	/**
	 * Get settlement email confirmation
	 *
	 * @return number
	 */
	public static function getMailConfirmation()
	{
		return self::$settlementAvailable;
	}

	/**
	 * Get status reopen
	 *
	 * @return number
	 */
	public static function getStatusReOpen()
	{
		return self::$reOpen;
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
	 * print object in string
	 *
	 * @param mixed $object
	 * @param boolean $exit
	 */
	public static function xdump($object)
	{
		print "<pre>";
		var_dump($object);
		print "</pre>";
		exit();

	}

	/**
	 * Get the swiss currency
	 *
	 * @return number
	 */
	public static function getSwissCurrencyId()
	{
		return self::$swissCurrencyId;
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
	 * Get status unsettled
	 *
	 * @return number[]
	 */
	public static function getStatusUnsettled()
	{
		$aStatus = [
			self::$created,
			self::$updated,
			self::$downloaded,
			self::$sended,
			self::$matched,
			self::$unmatched,
			self::$Instructed
		];

		return $aStatus;
	}

	/**
	 * Formating number to the swiss number format
	 *
	 * @param float $number
	 * @return string
	 */
	public static function swissNumberFormat(float $number)
	{
		return number_format($number, 2, '.', "'");
	}

	/**
	 * Set overdue value
	 *
	 * @param int $days
	 * @return NULL|string
	 */
	public static function setOverdue(int $days)
	{
		$overdue = null;
		if ($days < 0) {
			$overdueResult = abs($days);
			if ($overdueResult == 1) {
				$overdue = "+$overdueResult Day";
			} else {
				$overdue = "+$overdueResult Days";
			}
		}
		return $overdue;
	}
	/**
	 * Set status failure
	 *
	 * @return number
	 */
	public static function getStatusFailure(){
		return self::$failure;
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


}
