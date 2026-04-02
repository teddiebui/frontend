// api.test.js
import type { APIResultSet, EmployeeDTO, LoginResponseDTO } from '@/types';
import authService from '@/services/authService';
import { describe, it, expect } from 'vitest';


describe('login user', () => {
  it('should ok', async () => {
    // Make the actual HTTP request
    const response: APIResultSet<LoginResponseDTO> = await authService.login({
      username: 'admin',
      password: 'Abcd@1234',
    });

    const loginResponse: LoginResponseDTO = response.data as LoginResponseDTO;
    // Assertions
    expect(response.httpCode).toBe(200);
  });
});

//TODO: test later
// describe('logout user', () => {
//   it('should ok', async () => {
//     // Make the actual HTTP request
//     await authService.login({
//       username: 'admin',
//       password: 'Abcd@1234',
//     });
//     const response: APIResultSet<void> = await authService.logout();

//     // Assertions
//     expect(response.httpCode).toBe(200);
//   });
// }); 

// describe('get current user', () => {
//   it('should ok', async () => {
//     // Make the actual HTTP request
//     const response: APIResultSet<EmployeeDTO> = await authService.me();

//     const currentUser: EmployeeDTO = response.data as EmployeeDTO;
//     // Assertions
//     expect(response.httpCode).toBe(200);
//     console.log('Get Current User Response:', currentUser);
//   });
// });