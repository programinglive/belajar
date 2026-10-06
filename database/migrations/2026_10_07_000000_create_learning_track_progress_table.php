<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('learning_track_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('track_slug', 100);
            $table->boolean('consent_given')->default(false);
            $table->timestamp('consent_given_at')->nullable();
            $table->json('completed_lessons')->nullable();
            $table->boolean('capstone_completed')->default(false);
            $table->timestamp('capstone_submitted_at')->nullable();
            $table->text('capstone_notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'track_slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learning_track_progress');
    }
};
