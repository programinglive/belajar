<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningTrackProgress extends Model
{
    use HasFactory;

    protected $table = 'learning_track_progress';

    protected $fillable = [
        'user_id',
        'track_slug',
        'consent_given',
        'consent_given_at',
        'completed_lessons',
        'capstone_completed',
        'capstone_submitted_at',
        'capstone_notes',
    ];

    protected $casts = [
        'consent_given' => 'boolean',
        'consent_given_at' => 'datetime',
        'completed_lessons' => 'array',
        'capstone_completed' => 'boolean',
        'capstone_submitted_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
