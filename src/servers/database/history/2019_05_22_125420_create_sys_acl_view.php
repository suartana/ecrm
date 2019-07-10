<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateSysAclView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    DB::statement( "
            CREATE OR REPLACE VIEW sys_acl_module_view
        	AS 
        	select 
			    acl.ID,
			    acl.ACLTYPEID,
			    acl.SYSUSERID,
			    acl.ROLEID,
			    acl.SPECROLEID,
			    acl.NOTE,
			    sysuse.ID,
			    sysuse.EMP,
			    sysuse.LOCALE,
			    sysuse.STATUS,
			    emp.CREF,
			    emp.FIRSTNAME,
			    emp.LASTNAME,
			    rol.ID as roleid,
			    rol.CODE as rolecode,
			    rol.DEPTLUID,
			    rol.MODCODE,
			    rol.MODTYPE,
			    rol.MCREATE,
			    rol.MREAD,
			    rol.MUPDATE,
			    rol.MDELETE,
			    rol.CREATED_BY as rolecreateby,
			    rol.CREATED_AT as rolecreateat,
			    rol.UPDATED_BY as roleupdateby,
			    rol.UPDATED_AT as roleupdateat,
			    rold.DESCR as roledescr,
			    dept.CODE as deptcode,
			    dept.DESCR as deptdesc ,
			    dept.LANG as deptlang,
			    smod.CODE as smodcode,
			    smod.DESCR as smodesc,
			    smod.LOCALE as smodlocale,
			    smod.SEQ as smodseq,
			    smodpro.CODE as smodprocode,
			    smodpro.ICONCLS,
			    smodpro.ROWCLS,
			    smodpro.VIEWTYPE,
			    smodpro.ROUTEID,
			    smodpro.ITEMID,
			    smodpro.LEAF,
			    smodpro.SELECTABLE,
			    smodpro.EXPANDED,
			    smodpro.MODTYPE as smodprotype
			from sys_acl acl
			inner join SYS_USER sysuse on acl.SYSUSERID = sysuse.ID
			join EMP_ADM emp on sysuse.EMP = emp.EMP
			join sys_roles rol  on acl.ROLEID = rol.CODE
			join SYS_ROLE_DESCRIPTION rold on rol.code = rold.ID
			join dept_lu dept on rol.DEPTLUID = dept.code
			inner join sys_modules smod on rol.MODCODE = smod.CODE
			join SYS_MODULES_PROPERTIES smodpro on smod.CODE = smodpro.CODE
			where rol.modtype = 1 and smodpro.modtype = 1 and sysuse.ID = 1 
        ");

	    DB::statement( "
            CREATE OR REPLACE VIEW sys_acl_submodule_view
        	AS 			        	
			select 
			    acl.ID,
			    acl.ACLTYPEID,
			    acl.SYSUSERID,
			    acl.ROLEID,
			    acl.SPECROLEID,
			    acl.NOTE,
			    sysuse.ID,
			    sysuse.EMP,
			    sysuse.LOCALE,
			    sysuse.STATUS,
			    emp.CREF,
			    emp.FIRSTNAME,
			    emp.LASTNAME,
			    rol.ID as roleid,
			    rol.CODE as rolecode,
			    rol.DEPTLUID,
			    rol.MODCODE,
			    rol.MODTYPE,
			    rol.MCREATE,
			    rol.MREAD,
			    rol.MUPDATE,
			    rol.MDELETE,
			    rol.CREATED_BY as rolecreateby,
			    rol.CREATED_AT as rolecreateat,
			    rol.UPDATED_BY as roleupdateby,
			    rol.UPDATED_AT as roleupdateat,
			    rold.DESCR as roledescr,
			    dept.CODE as deptcode,
			    dept.DESCR as deptdesc ,
			    dept.LANG as deptlang,
			    syssubmod.CODE as submodcode,
			    syssubmod.DESCR as submodesc,
			    syssubmod.LOCALE as submodlocale,
			    syssubmod.SEQ as submodseq,
			    smodpro.CODE as smodprocode,
			    smodpro.ICONCLS,
			    smodpro.ROWCLS,
			    smodpro.VIEWTYPE,
			    smodpro.ROUTEID,
			    smodpro.ITEMID,
			    smodpro.LEAF,
			    smodpro.SELECTABLE,
			    smodpro.EXPANDED,
			    smodpro.MODTYPE as smodprotype
			from sys_acl acl
			inner join SYS_USER sysuse on acl.SYSUSERID = sysuse.ID
			join EMP_ADM emp on sysuse.EMP = emp.EMP
			join sys_roles rol  on acl.ROLEID = rol.CODE
			join SYS_ROLE_DESCRIPTION rold on rol.code = rold.ID
			join dept_lu dept on rol.DEPTLUID = dept.code
			inner join SYS_SUBMODULES syssubmod on syssubmod.CODE = rol.MODCODE
			join SYS_MODULES_PROPERTIES smodpro on smodpro.CODE = syssubmod.CODE
			where rol.modtype = 2 and smodpro.modtype = 2 and sysuse.ID = 1 
        ");


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
