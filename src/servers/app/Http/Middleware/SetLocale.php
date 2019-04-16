<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Config;
use App;

class SetLocale
{
	const SESSION_KEY = 'locale';
	/**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
	    //get available locale
	    $locale =  Config::get('translator.available');
	    if (!Session::get(self::SESSION_KEY)) {
		    Session::put(self::SESSION_KEY, $request->getPreferredLanguage($locale));
	    }
        return $next($request);
    }
}
