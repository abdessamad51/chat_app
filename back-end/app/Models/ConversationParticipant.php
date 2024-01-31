<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class ConversationParticipant extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = "conversation_participant";
    protected $fillable = [
        'participant_id',
        'conversation_id'
    ];

    public function participant() {
        return $this->belongsTo(User::class,'participant_id')->where('id','!=',Auth::user()->id);
    }
    
    public function conversation()
    {
        return $this->belongsTo(Conversation::class,'conversation_id');
    }
}
