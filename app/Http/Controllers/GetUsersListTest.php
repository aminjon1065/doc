<?php

namespace Tests\Unit;

use App\Http\Controllers\GetUsersList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class GetUsersListTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the usersList method.
     */
    public function test_users_list(): void
    {
        // Create some test users
        $user1 = User::factory()->create([
            'role' => 'user',
            'name' => 'John Doe',
            'department' => 'Sales',
            'region' => 'North'
        ]);

        $user2 = User::factory()->create([
            'role' => 'admin',
            'name' => 'Jane Smith',
            'department' => 'Marketing',
            'region' => 'South'
        ]);

        // Make a request to the usersList endpoint
        $response = $this->get('/users-list');

        // Assert the response status code is 200
        $response->assertStatus(Response::HTTP_OK);

        // Assert the response content is a valid JSON array
        $response->assertJson([]);

        // Assert the response content matches the expected user list
        $response->assertJson([
            [
                'value' => $user1->id,
                'label' => $user1->name . '-' . $user1->department . ' (' . $user1->region . ')'
            ]
        ]);
    }
}
