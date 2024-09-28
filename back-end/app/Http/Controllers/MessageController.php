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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  Auth::user()->messages;
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        try {
            $message = Message::create([
                'message' => $request->message,
                'conversation_id' => $request->conversation_id,
                'user_id' => $user->id
            ]);
            $message = $message->withAggregate('conversation','id')->first();
            $receiver_user_id = $this->getReceiverMessageUser($message);
            event(new MessageCreated($message,$receiver_user_id));
            DB::commit();
            return response()->json($message, 200);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 402);
        }
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $conversation = Message::find($id);
            if(!$conversation)  {
               return response()->json(__('Message not found'), 404);  
            }  
            $conversation->update([
                'message' => $request->message
            ]);
            DB::commit();
            return response()->json(__('Message updated'), 200);  

        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 402);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $conversation = Message::find($id);
            if(!$conversation)  {
               return response()->json(__('conversation not found'), 404);  
            }  
            $conversation->delete();
            DB::commit();
            return response()->json(__('Conversation updated'), 200);  

        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 402);
        }
    }

    private function getReceiverMessageUser($message) 
    {
        $conversation = $message->conversation;
        $receiver_user_id = ConversationParticipant::where('conversation_id',$conversation->id)->with('participant:id')->whereHas('participant')->first(['id','conversation_id','participant_id'])['participant']['id'];
        return $receiver_user_id;
    }

    public function lastMessage($conversation_id)  
    {
        $lastMessage = Message::where('conversation_id',$conversation_id)
                    ->orderBy('created_at','DESC')
                    ->pluck('message');
        return $lastMessage;
    }
}
