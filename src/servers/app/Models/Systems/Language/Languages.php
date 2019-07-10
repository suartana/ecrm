<?php

namespace App\Models\Systems\Language;

use Illuminate\Database\Eloquent\Model;

class Languages extends Model
{
	/**
	 * Set default table
	 *
	 * @var string
	 */
    protected $table = "lang_lu";
	/**
	 * Set default primary key
	 *
	 * @var string
	 */
    protected $primaryKey = "lang_id";
}
