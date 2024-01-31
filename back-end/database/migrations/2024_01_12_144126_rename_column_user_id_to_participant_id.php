<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnUserIdToParticipantId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('conversation_participant', function (Blueprint $table) {
            $table->renameColumn('user_id', 'participant_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('conversation_participant', function (Blueprint $table) {
            $table->renameColumn('participant_id', 'user_id');
        });
    }
}
