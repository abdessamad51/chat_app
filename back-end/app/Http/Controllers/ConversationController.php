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
use Illuminate\Support\Facades\Storage;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();        
        $conversation_has_message = $user->conversationsParticipantsHasMessages()->pluck('conversation_id');
                                                     
        $conversation_participant = ConversationParticipant::whereIn('conversation_id',$conversation_has_message)
                                    ->withAggregate('participant','full_name')
                                    ->withAggregate('participant','image')
                                    ->with('lastMessage:message,conversation_id')
                                    ->whereHas('participant')
                                    ->get(['id','participant_id','conversation_id']);
        
        return $conversation_participant;
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $valdited = $request->valited([
               'name' =>  $request->input('name')
            ]);
            Conversation::create($valdited);
            DB::commit();
            return response()->json(__('Conversation Created'), 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 
    }


    public function show(Conversation $conversation)
    {

        $messagesConvesation  = $conversation->messages;

        foreach($messagesConvesation as $message ) {
            
            if($message['user_id'] == Auth::user()->id) {
                $message["message_user_connect"] = true;
            } else {
                $message["message_user_connect"] = false;
            }
        }

        return  $messagesConvesation;
       
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
            $conversation = Conversation::find($id);
            if(!$conversation)  {
               return response()->json(__('conversation not found'), 404);  
            }  
            $valdited = $request->valited([
                'name' =>  $request->input('name')
             ]);
            $conversation->update($valdited);
            DB::commit();
            return response()->json(__('Conversation updated'), 200);  

        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Conversation $conversation)
    {
        try {
            $conversation->delete(); 
            DB::commit();
             return response()->json(__('Conversation updated'), 200);
         } catch (\Throwable $th) {
            DB::rollback();
             return response()->json($th->getMessage(), 402);
         } 
    }

    public function friends()
    {
        $auth = Auth::user();
        $conversation_ids = $auth->conversationsParticipants()->pluck('conversation_id');
        $friends = ConversationParticipant::whereIn('conversation_id',$conversation_ids)
                                        ->withAggregate('participant','full_name')
                                        ->withAggregate('participant','image')
                                        ->whereHas('participant')
                                        ->get(['participant_id','conversation_id']);
             

        return $friends->map(function($friend) use($auth) {
            $friend['id'] = $friend['participant_id'];
            $friend['is_friend'] = true;
            $friend['invitation_status'] = 'accepted';
            unset($friend['participant_id']);
            return $friend;
        });
    }

    public function getUsers($name='') 
    {
        // $auth = Auth::user();
        $users = User::where('full_name','like','%'.$name.'%')->where('id','!=',Auth::user()->id)->get(['id','full_name','image']);
        // get conversations has auth
        $auth_conversation_participans = Auth::user()->conversationsParticipants->pluck('conversation_id');

       // compare conversations auth with conversations users
        $users = $users->map(function($user) use($auth_conversation_participans) {
                $data = $user->load(['conversationsParticipants' => function($query) use($auth_conversation_participans) {
                                $query->whereIn('conversation_id',$auth_conversation_participans)
                                ->select('participant_id');
            },'invitationStatus:status,receiver_id'])->toArray();
       
            return [
                'id' => $user['id'],
                'conversation_id' => $data['conversations_participants'][0]['conversation_id'] ?? null,
                'participant_full_name' => $data['full_name'],
                'participant_image' => $data['image'],
                'is_friend' => $data['conversations_participants'] ? true : false,
                'invitation_status' => $data['invitation_status'] ? $data['invitation_status'][0]['status'] : null
            ];
            
        });
        return $users;
        

    }
    public function getChats($name='') 
    {
        $user = Auth::user();
        // get converstion on messages
        $conversation_has_message = Message::pluck('conversation_id');
        // search on conversation user participent in
        $conversation_ids = ConversationParticipant::where('participant_id',$user->id)
                            ->whereIn('conversation_id',$conversation_has_message)
                            ->pluck('conversation_id');
            
        $conversation_participant = ConversationParticipant::whereIn('conversation_id',$conversation_ids)
                            ->with(['participant:id,full_name','conversation:id,name','conversation.lastMessage:message,conversation_id'])
                            ->whereHas('participant', function($q) use($name){
                                $q->where('full_name','like','%'.$name.'%');
                            })
                            ->get(['id','participant_id','conversation_id']);


        return $conversation_participant;
        
    }

    public function sendInvitation($receiver_id) 
    {
        // return 'cc';
        try {
            $auth = Auth::user();
            $user = User::find($receiver_id);
            Invitation::create([
                'sender_id' => $auth->id,
                'receiver_id' => $receiver_id
            ]);
            $user->notify(new NewInvitationNotification('invitation'));
           
            DB::commit();
            $response = [
                'message' => 'invitation sending',
                'data' => [
                    'receiver_id' => $receiver_id
                ] 
            ];
            return response()->json($response, 200);
         } catch (\Throwable $th) {
            DB::rollback();
             return response()->json($th->getMessage(), 402);
         } 
    }

    public function acceptInvitation($notification_id) 
    {
        
        // return $notification_id;
        // Notification::select('data')->find($auth()->user()->notifications()->where('id', $id)->first());
        try {
            $auth = Auth::user();
            $notification = $auth->notifications()->where('id', $notification_id)->first();
            // $notification_data = json_decode($notification['data']);
            
           $conversation = Conversation::create([
                'name' => Str::random(8) . '_' . 'con'
            ]); 
            ConversationParticipant::create([
              'participant_id' => $auth->id,
              'conversation_id' => $conversation->id
            ]);

            ConversationParticipant::create([
                'participant_id' => $notification['data']['sender_id'],
                'conversation_id' => $conversation->id
            ]);
            
            Invitation::where(['sender_id' =>  $notification['data']['sender_id'],'receiver_id' => $auth->id])->update(['status' => 'accepted']);

           
            $receiver = User::find($notification['data']['sender_id']);
            $notification->markAsRead();
            $receiver->notify(new NewInvitationNotification('information','accepted your friend request.'));
            DB::commit();
            $response = [
                'message' => 'accepted invitation success',
                'data' => [
                    'notification_id' => $notification_id
                ] 
            ];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 

    }

    public function refuseInvitation($notification_id) {

        try {
            $auth = Auth::user();
            $notification = $auth->notifications()->where('id', $notification_id)->first();

            Invitation::where(['sender_id' =>  $notification['data']['sender_id'],'receiver_id' => $auth->id])->update(['status' => 'refused']);
            $notification->markAsRead();
            $receiver = User::find($notification['data']['sender_id']);
            $receiver->notify(new NewInvitationNotification('information','refused yout friend request'));
            DB::commit();
            $response = [
                'message' => 'accepted invitation success',
                'data' => [
                    'notification_id' => $notification_id
                ] 
            ];
            return response()->json($response,200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 

    }


}
