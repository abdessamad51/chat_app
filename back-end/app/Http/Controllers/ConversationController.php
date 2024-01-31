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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $conversation_has_message = Message::pluck('conversation_id');
        $conversation_ids = ConversationParticipant::where('participant_id',$user->id)
                            ->whereIn('conversation_id',$conversation_has_message)
                            ->pluck('conversation_id');

        $conversation_participant = ConversationParticipant::whereIn('conversation_id',$conversation_ids)
                                    ->with(['participant:id,full_name','conversation:id,name','conversation.lastMessage:message,conversation_id'])
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
            Conversation::create($request->all());
            DB::commit();
            return response()->json(__('Conversation Created'), 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Conversation $conversation)
    {
    //  if(ConversationParticipant::where(['user_id' => Auth::user()->id,'conversation_id' =>$conversation->id])->count()) {
      
     
        $messages  = $conversation->messages;

        foreach($messages as $message ) {
            if($message['user_id'] == Auth::user()->id) {
                $message["message_user_connect"] = true;
                // return "in";
            } else {
                $message["message_user_connect"] = false;
            }
        }

        return  $messages;
    //  } else {
    //     return response()->json(__('permssien denied'), 404);  
    //  };
     // return $conversation->wherein('id',$conversation_access)->get();
       
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
            $conversation->update($request->all());
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
         $user = Auth::user();
        $conversation_ids = ConversationParticipant::where('participant_id',$user->id)->pluck('conversation_id');
        $friends = ConversationParticipant::whereIn('conversation_id',$conversation_ids)->with('participant:id,full_name')->whereHas('participant')->get(['id','participant_id'
             ,'conversation_id']);

        return $friends->map(function($friend) {
            $friend['is_friend'] = true;
            $friend['invitation_status'] = 'accepted';
            return $friend;
        });
    }

    public function getUsers($name='') 
    {
        // $auth = Auth::user();
        $users = User::where('full_name','like','%'.$name.'%')->where('id','!=',Auth::user()->id)->get(['id','full_name']);
        $auth_conversation_participans = Auth::user()->conversationsParticipants->pluck('conversation_id');

        // return ConversationParticipant::whereIn('conversation_id',$auth_conversation_participans)->with('participant:id,full_name')->get(['id','user_id'
        // ,'conversation_id']);
        $users = $users->map(function($user) use($auth_conversation_participans) {
                $data = $user->load(['conversationsParticipants' => function($query) use($auth_conversation_participans) {
                                $query->whereIn('conversation_id',$auth_conversation_participans)
                            ->select('participant_id','conversation_id');
            },'invitationStatus:status,receiver_id'])->toArray();
       
            return [
                'user_id' => $data['conversations_participants'][0]['participant_id'] ?? null,
                'conversation_id' => $data['conversations_participants'][0]['conversation_id'] ?? null,
                'participant' => [
                    'id' => $data['id'],
                    'full_name' => $data['full_name']
                ],
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
            // return $auth->invitationStatus;
            $user = User::find($receiver_id);
            Invitation::create([
                'sender_id' => $auth->id,
                'receiver_id' => $receiver_id
            ]);
            $user->notify(new NewInvitationNotification('invitation'));
           
            DB::commit();
             return response()->json(__('Invitation sending'), 200);
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
            return response()->json($receiver, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage(), 402);
        } 

    }


}
