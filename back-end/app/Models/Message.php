<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'conversation_id',
        'message',
        'created_at'
    ];

    public function conversation() 
    {
        return $this->belongsTo(Conversation::class, 'conversation_id');
    }
}
