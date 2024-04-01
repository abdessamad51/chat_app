<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
