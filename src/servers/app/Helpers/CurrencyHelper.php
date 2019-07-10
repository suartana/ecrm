<?php


namespace App\Helpers;


class CurrencyHelper
{

	/**
	 * Currency formatting (Switzerland)
	 *
	 * @param float $number
	 * @param int $decimal
	 * @param string $decimalSeparator
	 * @param string $thousandsSeparator
	 * @param int $digitsGrouping
	 * @return string
	 */
	public static function swissCurrencyFormat(float $number, int $decimal = 3, string $decimalSeparator = '.', string $thousandsSeparator = '', int $digitsGrouping = 2) : string
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

		return "{$intPart}{$decimalSeparator}{$decPart}";
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

}