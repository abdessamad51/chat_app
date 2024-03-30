<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'image'
    ];
    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function messages() {
        return $this->hasMany(Message::class,'conversation_id','conversation_id');
    }

    public function conversations() {
        return $this->belongsToMany(Conversation::class,'conversation_participant');
    }

    public function conversationsParticipantsHasMessages() {
        return $this->hasMany(ConversationParticipant::class,'participant_id','id')->whereHas('messages');
    }


    public function invitationStatus() {
        return $this->hasMany(Invitation::class,'receiver_id')->where('sender_id',Auth::user()->id);
    }
    public function conversationsParticipants() {
        return $this->hasMany(ConversationParticipant::class,'participant_id','id');
    }

 }
