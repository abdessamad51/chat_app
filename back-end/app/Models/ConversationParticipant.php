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


    public function participant() {
        return $this->belongsTo(User::class,'user_id')->where('id','!=',Auth::user()->id);
    }
}
