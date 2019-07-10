<?php

namespace App\Providers;

use App\Models\Systems\ACL\Acl;
use App\Models\Systems\Modules\Module;
use App\Models\Users\User;
use App\Policies\AclPolicy;
use App\Policies\Systems\Modules\ModulesPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
	    'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
	    Passport::routes();
	    Passport::withoutCookieSerialization();
	    Passport::ignoreCsrfToken();
	    Passport::tokensExpireIn(now()->addDays(15));
	    Passport::refreshTokensExpireIn(now()->addDays(30));
    }
}
