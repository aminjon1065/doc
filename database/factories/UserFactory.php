<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roles = ['admin', 'common', 'management', 'user'];
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => \Hash::make('password'),
            'position' => 'Test Position',
            'department' => 'Test Department',
            'region' => 'Test Region',
            'rank' => 'Test Rank',
            'avatar' => '/logo256.webp',
//            'role' => 'user',
            'role' => $roles[array_rand($roles)],
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
