<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    Protected $fillable = [
        'title',
        'author',
        'category',
        'status',
        'content'
    ];
}
