<?php

namespace App\Services\Users;

use App\Helpers\Helper;
use App\Models\Users\User;
use App\Services\BaseService;
use App\Traits\JsonRespondTrait;
use App\Traits\TranslationTrait;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
* Class UserService.
*/
class UserService extends BaseService
{

	use JsonRespondTrait,
	    ResetsPasswords,
	    TranslationTrait;

	protected $empKey = null;
    /**
     * Set rules for the validation
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'required|string|min:8',
            'emp' => 'required||string|min:3',
        ];
    }

    /**
     * Insert or Update data
     *
     * @param array $data
     * @return bool
     */
    public function execute(array $data, bool $action = false)
    {   // validation parameters

        if (!$this->validate($data)) {
            return false;
        }
        if($action){
        	$this->addNew($data);
        }
        // get users table
	    $user = $data["id"] ? User::find((int)$data["id"]) : new User();
        // if add new user
        if($this->empKey) {
	        $user->emp = $this->empKey;
        }
		$user->email = $data["email"];
        $user->locale = $this->getLocale();
        //set password
        if($data["password"]){
	        $user->password = Hash::make($data["password"]);
	        $user->setRememberToken(Str::random(60));
        }

        if( $data["id"] ){
        	$user->updated_by = $data["userid"];
        	$user->updated_at = now();
        }else{
	        $user->created_by = $data["userid"];
	        $user->created_at = now();
        }

    }

    public function saveEmpAdm(array $data)
    {

    }

    public function saveUserProfile(array $data)
    {

    }

    public function addNew(array  $data)
    {

    }

	/**
	 * Change user password
	 *
	 * @param $user
	 * @param array $data
	 * @return bool
	 */
    public function changePassword($user, $password) : bool
    {
	    $user->password = Hash::make($password);
	    $user->setRememberToken(Str::random(60));
	    return $user->save();
    }
}
