<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//       \App\Models\User::factory(20)->create();

       \App\Models\User::factory()->create([
           'name' => 'Admin2 Admin2',
           'email' => 'aminjon1066@gmail.com',
           'password' => \Hash::make('password'),
           'position' => 'Test Position',
           'department' => 'Test Department',
           'region' => 'Test Region',
           'rank' => 'Test Rank',
           'avatar' => '/logo256.webp',
           'role' => 'admin',
       ]);
    }
}
