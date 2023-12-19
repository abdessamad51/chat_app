<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = [
        'pivot'
    ];

    protected $fillable = [
        'name'
    ];

    public function messages() {
        return $this->hasMany(Message::class)->orderBy('created_at','ASC');;
    }

}
