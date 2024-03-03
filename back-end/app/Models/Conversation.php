<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = [
        'pivot',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'name'
    ];

    public function messages() {
        return $this->hasMany(Message::class)->orderBy('created_at','ASC');;
    }

    public function lastMessage() {
        return $this->hasOne(Message::class,'conversation_id')->orderBy('created_at','DESC')->limit(1);
    }

    public function participant1()
    {
        return $this->hasOne(ConversationParticipant::class,'conversation_id')->where('participant_id','!=',Auth::user()->id)->with('participant:id,full_name');
    }

}
