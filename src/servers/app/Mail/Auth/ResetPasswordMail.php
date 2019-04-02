<?php
/**
 * Reset Passswor Mail Services
 */
namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

	/**
	 * Set public token
	 *
	 * @var strinfg
	 */
	public $token;
	protected $fullname;
	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct($token,$fullname)
	{
		$this->token = $token;
		$this->fullname = $fullname;
	}
	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->markdown('emails.passwordReset')->with([
			'token' => $this->token,
			'fullname' => $this->fullname
		]);
	}
}
