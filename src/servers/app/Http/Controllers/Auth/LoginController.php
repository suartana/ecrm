<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Utils\Util;
use Illuminate\Http\Request;
use App\Traits\JsonRespondController;
use App\Models\Users\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */
    use AuthenticatesUsers;
	use JsonRespondController;
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/user';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

	/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function login(Request $request)
	{

		$this->validateRequest($request);

		try {
			$credentials = $request->only('email', 'password');
			if(Auth::attempt($credentials)) {
				$user  = Auth::user();
				$result = [
					"success" => true,
					"user" => $user,
				];
				//$this->redirectTo("/user/#dashboard");
				return $this->respond($result);
			}else{
				return $this->respondUnauthorized("Login password or E-mail did not match");
			}
		} catch (\Exception $e) {
			return $this->respondUnauthorized("Login password or E-mail did not match");
		}
	}

	/**
	 * Validate the request.
	 *
	 * @param  Request $request
	 * @return \Illuminate\Http\JsonResponse|true
	 */
	private function validateRequest(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'email|required',
			'password' => 'required',
		]);

		if ($validator->fails()) {
			return $this->respondValidatorFailed($validator);
		}

		// Check if email exists. If not respond with an Unauthorized, this way a hacker
		// doesn't know if the login email exist or not, or if the password os wrong
		$count = User::where('email', $request->get('email'))->count();
		if ($count === 0) {
			return $this->respondUnauthorized();
		}

		return true;
	}


	public function getProfile()
	{
		print "I am keepalive...";
		$success = Auth::user();

		$success['token'] = $success ? $success->createToken('docrmv3')->accessToken : false;

		return response()->json(['data'=> $success, 'status_code'=> $this->httpStatusCode,
			'status_message'=>'success'], $this->httpStatusCode);
	}


	/**
	 * details api
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function details()
	{   print "I am here....";
		if (Auth::check()) {
			$user = Auth::user();
			return response()->json(['success' => $user], $this->httpStatusCode);
		}
	}

}
