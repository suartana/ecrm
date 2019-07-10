<?php

namespace App\Traits;

use App\Models\Users\UserView;

trait UserTrait
{
	/**
	 * Provide user fullname
	 *
	 * @param int $id
	 * @return string
	 */
	public function getFullName(int $id) : string
	{
		$user = UserView::findOrFail($id);
		return $user ? $user->firstname." ".$user->lastname : "";
	}

}