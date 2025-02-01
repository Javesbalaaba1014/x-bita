import { User } from '../types/user';

const API_URL = 'http://localhost:3005';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}; 