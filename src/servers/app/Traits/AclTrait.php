<?php

namespace App\Traits;

use App\Helpers\Helper;
use App\Models\Systems\ACL\AclModule;
use App\Models\Users\User;
use Doctrine\DBAL\Query\QueryException;

trait AclTrait
{
	use ModuleTrait;
	/**
	 * Set superuser id
	 *
	 * @var int
	 */
	protected $superuser = 2;

	/**
	 * Set admin id
	 *
	 * @var int
	 */
    protected $admin = 3;
	/**
	 * Set root id
	 *
	 * @var int
	 */
    protected $root = 4;
	/**
	 * Set default permission value
	 *
	 * @var int
	 */
    protected $permission = 1;
	/**
	 * Check if the user account has admin rights
	 *
	 * @param int $userId
	 * @return bool
	 */
    public function isAdmin(int $userId) : bool
    {
	    return $this->aclType($userId) == $this->admin ? true : false;
    }
	/**
	 * Check if the user account has root rights
	 *
	 * @param int $userId
	 * @return bool
	 */
	public function isRoot(int $userId) : bool
	{
		return $this->aclType($userId) == $this->admin ? true : false;
	}
	/**
	 * Check if the user account has superuser rights
	 *
	 * @param int $userId
	 * @return bool
	 */
	public function isSuperUser(int $userId) : bool
	{
		return $this->aclType($userId) == $this->superuser ? true : false;
	}
	/**
	 * Provide acl type id
	 *
	 * @param int $userid
	 * @return int
	 */
	public function aclType (int $userid) : int
	{
		$aclmode =  AclModule::select("ACLTYPEID")->where("SYSUSERID",$userid)->first();
		return (int) $aclmode->acltypeid;
	}

	/**
	 * Get the user permission
	 *
	 * @param string $crud
	 * @param string $modType
	 * @param string $itemId
	 * @param int $userid
	 * @return bool|QueryException|\Exception
	 */
	public function acl(string $crud, string $modType,string $itemId, int $userId)
	{
		if($this->isAdmin($userId)){
			return true;
		}

		try {
			$acl = $this->getModule($modType, $itemId, $userId);
			switch ($crud) {
				case 'create':
					$permission = $this->create($userId, $acl);
					break;
				case 'read':
					$permission = $this->read($userId, $acl);
					break;
				case 'update':
					$permission = $this->update($userId, $acl);
					break;
				case 'delete':
					$permission = $this->delete($userId, $acl);
					break;
			}
			return $acl && $userId ? $permission : false;
		}catch (QueryException $exception){
			return $exception;
		}
	}
	/**
	 * Check if user has permission to create data entry into the database
	 *
	 * @param integer $userid
	 * @param dynamic object $acl [ new AclModule() ]
	 * @return bool
	 */
	public function create(int $userid, $acl) : bool
	{
		return $userid == $acl->sysuserid && $acl->mcreate = $this->permission ? true : false;
	}

	/**
	 * Check if user has permission to read data entry from the database
	 *
	 * @param integer $userid
	 * @param dynamic object $acl [ new AclModule() ]
	 * @return bool
	 */
	public function read(int $userid, $acl)  : bool
	{
		return $userid == $acl->sysuserid && $acl->mread = $this->permission ? true : false;
	}

	/**
	 * Check if user has permission to modify/update data entry from the database
	 *
	 * @param integer $userid
	 * @param dynamic object $acl [ new AclModule() ]
	 * @return bool
	 */
	public function update(int $userid, $acl)  : bool
	{
		return $userid == $acl->sysuserid && $acl->mupdate = $this->permission ? true : false;
	}

	/**
	 *Check if user has permission to delete/destroy data entry from the database
	 *
	 * @param integer $userid
	 * @param dynamic object $acl [ new AclModule() ]
	 * @return bool
	 */
	public function delete(int $userid, $acl)  : bool
	{
		return $userid == $acl->sysuserid && $acl->mdelete = $this->permission ? true : false;
	}
}