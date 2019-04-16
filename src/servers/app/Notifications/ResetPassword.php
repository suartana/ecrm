<?php

namespace App\Notifications;

use App\Models\Users\User;
use App\Models\Users\UserView;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class ResetPassword extends Notification
{
    use Queueable;
	protected $token;
	protected $email;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $token, string $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
	    $user = UserView::where('email', $this->email )->first();
	    $link = url("/reset?token=". $this->token);
	    return (new MailMessage)
		    ->subject('Reset Password Notification')
		    ->greeting("Hi ". $user->firstname )
		    ->line('You are receiving this email because we received a password reset request for your account.')
		    ->action('Reset Password', $link)
		    ->line('This password reset link will expire in '. config('auth.passwords.users.expire').' minutes')
		    ->line('If you did not request a password reset, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
