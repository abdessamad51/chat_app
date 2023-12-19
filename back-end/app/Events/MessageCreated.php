<?php

namespace App\Events;

use App\Models\ConversationParticipant;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $receiver_user_id;

    /**
     * Create a new event instance.
     * 
     * @return void
     */
    public function __construct(Message $message,$receiver_user_id)
    {
        $this->message = $message;
        $this->receiver_user_id = $receiver_user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat.'.$this->receiver_user_id);
    }

    public function broadcastAs()
    {
        return 'message';
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message->message,
            'receiver_user_id' =>  $this->receiver_user_id,
            'created_at' => $this->message->created_at,
        ];
    }
}
