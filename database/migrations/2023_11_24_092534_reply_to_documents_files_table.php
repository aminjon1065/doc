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
        Schema::table('documents_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reply_to_document_id');
            $table->string('file_path');
            $table->string('file_name');
            $table->string('file_type');
            $table->string('file_size');
            $table->foreign('reply_to_document_id')->references('id')->on('documents')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents_files', function (Blueprint $table) {
            //
        });
    }
};
