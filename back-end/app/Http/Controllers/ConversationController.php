<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $conversation_ids = ConversationParticipant::where('user_id',$user->id)->whereIn('conversation_id',$conversation_has_message)->pluck('conversation_id');
        return ConversationParticipant::whereIn('conversation_id',$conversation_ids)->with('participant:id,full_name')->whereHas('participant')->get(['id','user_id'
        ,'conversation_id']);
       
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
             return response()->json($th->getMessage(), 402);
         } 
    }

    public function friends()
    {
        $user = Auth::user();
        $conversation_ids = ConversationParticipant::where('user_id',$user->id)->pluck('conversation_id');
        return ConversationParticipant::whereIn('conversation_id',$conversation_ids)->with('participant:id,full_name')->whereHas('participant')->get(['id','user_id'
        ,'conversation_id']);
    }


}
