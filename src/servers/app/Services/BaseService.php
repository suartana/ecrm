<?php

namespace App\Services;

use App\Helpers\Helper;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

abstract class BaseService
{

	protected $error;

	public function getError(){
		return $this->error;
	}
	/**
	 * Get the validation rules that apply to the service.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [];
	}

	/**
	 * Validate all documents in an account.
	 *
	 * @param array $data
	 * @return bool
	 */
	public function validate(array $data)
	{
		$validator = Validator::make($data, $this->rules());
		$this->error = $validator->errors()->all();
		return $validator->fails() ? false : true;
	}

	/**
	 * Checks if the value is empty or null.
	 *
	 * @param mixed $data
	 * @param mixed $index
	 * @return mixed
	 */
	protected function nullOrValue($data, $index)
	{
		if (empty($data[$index])) {
			return;
		}

		return $data[$index] == '' ? null : $data[$index];
	}

	/**
	 * Checks if the value is empty or null and returns a date from a string.
	 *
	 * @param mixed $data
	 * @param mixed $index
	 * @return mixed
	 */
	protected function nullOrDate($data, $index)
	{
		if (empty($data[$index])) {
			return;
		}

		return $data[$index] == '' ? null : Carbon::parse($data[$index]);
	}
}

