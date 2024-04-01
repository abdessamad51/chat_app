<?php

namespace App\Http\Controllers;

use App\Events\MessageCreated;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ConversationParticipant;

class MessageController extends Controller
{
    public function index()
    {
        return auth()->user()->messages;
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        try {
            $message = Message::create([
                'message'         => $request->message,
                'conversation_id' => $request->conversation_id,
                'user_id'         => $user->id
            ]);

            $message = $message->withAggregate('conversation', 'id')->first();

            $receiver_user_id = $this->getReceiverMessageUser($message);

            event(new MessageCreated($message, $receiver_user_id));

            DB::commit();
            return response()->json($message);

        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 402);
        }
    }

    public function update(Request $request, Message $message)
    { 
        $message->update($request->all());

        return response()->json(__('Message updated'));  
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json(__('Message deleted'));  
    }

    private function getReceiverMessageUser($message) 
    {
        $conversation = $message->conversation;

        return ConversationParticipant::with('participant:id')
                        ->whereHas('participant')
                        ->where('conversation_id', $conversation->id)
                        ->first(['id', 'conversation_id', 'participant_id'])['participant']['id'];
    }

    public function lastMessage($conversation_id)  
    {
        return Message::where('conversation_id', $conversation_id)
                    ->orderByDesc('created_at') // or use latest()
                    ->pluck('message');
    }
}
