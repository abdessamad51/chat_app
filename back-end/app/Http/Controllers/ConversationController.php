<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\Invitation;
use App\Models\User;
use App\Models\Message;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Notifications\NewInvitationNotification;

class ConversationController extends Controller
{
    public function index()
    {
        $conversation_has_message = auth()->user()->conversationsParticipantsHasMessages()->pluck('conversation_id');
                                                     
        return ConversationParticipant::with('lastMessage:message,conversation_id')
                                    ->withAggregate('participant', 'full_name')
                                    ->whereIn('conversation_id', $conversation_has_message)
                                    ->whereHas('participant')
                                    ->get(['id', 'participant_id', 'conversation_id']);
    }

    public function store(Request $request)
    {
        try {
            Conversation::create($request->all()); // add request validate
            DB::commit();

            return response()->json(__('Conversation Created'));
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json($th->getMessage(), 402);
        } 
    }

    public function show(Conversation $conversation)
    {     
        $messages  = $conversation->messages;
        
        foreach($messages as $message ) {
            $message["message_user_connect"] = $message['user_id'] == Auth::user()->id ? true : false;
        }

        return  $messages;
    }

    public function update(Request $request, $id)
    {  
        // add class request for validate
        $conversation->update($request->all());

        return response()->json(__('Conversation updated'));  
    }

    public function destroy(Conversation $conversation)
    {
        $conversation->delete(); 
           
        return response()->json(__('Conversation updated'));
    }

    public function friends()
    {
        $conversation_ids = ConversationParticipant::where('participant_id', auth()->user()->id)->pluck('conversation_id');
        $friends = ConversationParticipant::with('participant:id,full_name')
                                        ->whereHas('participant')
                                        ->whereIn('conversation_id', $conversation_ids)
                                        ->get(['id','participant_id','conversation_id']);

        return $friends->map(function($friend) {
            $friend['is_friend'] = true;
            $friend['invitation_status'] = 'accepted';

            return $friend;
        });
    }

    public function getUsers($name = null) 
    {
        $users = User::where('full_name', 'like', '%'.$name.'%')
                    ->where('id', '!=', Auth::user()->id)
                    ->get(['id', 'full_name']);

        $auth_conversation_participans = Auth::user()->conversationsParticipants->pluck('conversation_id');

        return  $users->map(function($user) use($auth_conversation_participans) {

                $data = $user->load(['conversationsParticipants' => function($query) use($auth_conversation_participans) {
                    $query->whereIn('conversation_id', $auth_conversation_participans)->select('participant_id','conversation_id');
                }, 'invitationStatus:status,receiver_id'])->toArray();
                    
            return [
                'user_id'         => $data['conversations_participants'][0]['participant_id'] ?? null,
                'conversation_id' => $data['conversations_participants'][0]['conversation_id'] ?? null,
                'participant'     => [
                    'id' => $data['id'],
                    'full_name' => $data['full_name']
                ],
                'is_friend'         => $data['conversations_participants'] ? true : false,
                'invitation_status' => $data['invitation_status'] ? $data['invitation_status'][0]['status'] : null
            ];
            
        });
    }

    public function getChats($name = null) 
    {
        $conversation_has_message = Message::pluck('conversation_id');

        $conversation_ids = ConversationParticipant::where('participant_id', auth()->user()->id)
                            ->whereIn('conversation_id', $conversation_has_message)
                            ->pluck('conversation_id');
            
        return ConversationParticipant::whereIn('conversation_id', $conversation_ids)
                            ->with(['participant:id,full_name', 'conversation:id,name', 'conversation.lastMessage:message, conversation_id'])
                            ->whereHas('participant', function($q) use($name){
                                $q->where('full_name', 'like', '%'.$name.'%');
                            })
                            ->get(['id', 'participant_id', 'conversation_id']);
    }

    public function sendInvitation($receiver_id) 
    {
        try {
            
            $user = User::findOrfail($receiver_id);

            Invitation::create([
                'sender_id' => auth()->user()->id,
                'receiver_id' => $receiver_id
            ]);

            $user->notify(new NewInvitationNotification('invitation'));
           
            DB::commit();
            return response()->json(__('Invitation sending'));

         } catch (\Throwable $th) {
            
            DB::rollback();
            return response()->json($th->getMessage(), 402);
         } 
    }

    public function acceptInvitation($notification_id) 
    {
        try {

            $auth = Auth::user();
            $notification = $auth->notifications()->where('id', $notification_id)->first();
            
            $conversation = Conversation::create([
                'name' => Str::random(8) . '_' . 'con'
            ]); 

            ConversationParticipant::create([
              'participant_id'  => $auth->id,
              'conversation_id' => $conversation->id
            ]);

            ConversationParticipant::create([
                'participant_id'  => $notification['data']['sender_id'],
                'conversation_id' => $conversation->id
            ]);
            
            Invitation::where([
                'sender_id' => $notification['data']['sender_id'],
                'receiver_id' => $auth->id
            ])->update(['status' => 'accepted']);

           
            $receiver = User::findOrfail($notification['data']['sender_id']);

            $notification->markAsRead();

            $receiver->notify(new NewInvitationNotification('information', 'accepted your friend request.'));

            DB::commit();
            return response()->json($receiver);

        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 

    }

    public function refuseInvitation($notification_id) 
    {
        try {
            $auth = Auth::user();
            $notification = $auth->notifications()->where('id', $notification_id)->first();

            Invitation::where([
                'sender_id'   => $notification['data']['sender_id'],
                'receiver_id' => $auth->id
            ])->update(['status' => 'refused']);
            
            $notification->markAsRead();
            
            $receiver = User::find($notification['data']['sender_id']);
            
            $receiver->notify(new NewInvitationNotification('information', 'refused yout friend request'));
            
            DB::commit();
            
            return response()->json($receiver);

        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        }
    }
}
