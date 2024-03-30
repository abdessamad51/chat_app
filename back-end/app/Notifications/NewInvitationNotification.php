<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class NewInvitationNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $sender;
    private $typeNotification;
    private $message;
    public function __construct($typeNotification,$message=null)
    {
        $this->sender = Auth::user();
        $this->typeNotification = $typeNotification;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
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
            'type_notification' => $this->typeNotification,
            'sender_fullName' => $this->sender->full_name,
            'sender_image' => $this->sender->image,
            'sender_id' => $this->sender->id,
            'message' => $this->message
        ];
    }


    public function toBroadcast($notifiable)
    {
        return [
            'body' => 'sent invitation',
            'notifiable' => $notifiable->full_name
        ];
    }
}
