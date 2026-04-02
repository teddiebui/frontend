## Files to be created/edited
### `src/lib/services/employeeService.ts`
```typescript
import { httpClient } from '../http/httpClient';
import type {
  APIResultSet,
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO
} from '../http/types';

const BASE_URL = '/api/employee-management';

const employeeService = {
  getUserByUsername(username?: string): Promise<APIResultSet<EmployeeDTO>> {
    return httpClient.get<EmployeeDTO>(`${BASE_URL}`, { params: username ? { username } : undefined });
  },
  getAllUsers(): Promise<APIResultSet<EmployeeDTO[]>> {
    return httpClient.get<EmployeeDTO[]>(`${BASE_URL}/get-all-user`);
  },
  dashboard(): Promise<APIResultSet<EmployeeDashboardDTO[]>> {
    return httpClient.get<EmployeeDashboardDTO[]>(`${BASE_URL}/dashboard`);
  },
  getUserProfile(): Promise<APIResultSet<EmployeeDetailDTO>> {
    return httpClient.get<EmployeeDetailDTO>(`${BASE_URL}/me`);
  },
  getOnlineStatus(): Promise<APIResultSet<StatusLogDTO>> {
    return httpClient.get<StatusLogDTO>(`${BASE_URL}/me/online-status`);
  },
  updateCache(): Promise<APIResultSet<StatusLogDTO>> {
    return httpClient.get<StatusLogDTO>(`${BASE_URL}/me/update-cache`);
  },
  createUser(employeeDTO: EmployeeDTO): Promise<APIResultSet<EmployeeDTO>> {
    return httpClient.post<EmployeeDTO>(`${BASE_URL}`, employeeDTO);
  },
  updateProfile(employeeDTO: EmployeeDTO): Promise<APIResultSet<EmployeeDetailDTO>> {
    return httpClient.put<EmployeeDetailDTO>(`${BASE_URL}/me`, employeeDTO);
  },
  updateUser(employeeDTO: EmployeeDTO): Promise<APIResultSet<EmployeeDetailDTO>> {
    return httpClient.put<EmployeeDetailDTO>(`${BASE_URL}`, employeeDTO);
  },
  changePassword(changePasswordDTO: ChangePasswordDTO): Promise<APIResultSet<void>> {
    return httpClient.put<void>(`${BASE_URL}/me/password`, changePasswordDTO);
  },
  updateOnlineStatus(logDTO: StatusLogDTO): Promise<APIResultSet<void>> {
    return httpClient.put<void>(`${BASE_URL}/me/online-status`, logDTO);
  },
  resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<APIResultSet<void>> {
    return httpClient.put<void>(`${BASE_URL}/reset-password`, resetPasswordDTO);
  },
  deleteUser(employeeDTO: EmployeeDTO): Promise<APIResultSet<void>> {
    return httpClient.delete<void>(`${BASE_URL}`, { data: employeeDTO });
  },
};

export default employeeService;
```

### `src/hooks/useEmployee.ts`
```typescript
import { useCallback } from 'react';
import employeeService from '../lib/services/employeeService';
import type {
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO
} from '../lib/http/types';

export function useEmployee() {
  const getUserByUsername = useCallback((username?: string) => employeeService.getUserByUsername(username), []);
  const getAllUsers = useCallback(() => employeeService.getAllUsers(), []);
  const dashboard = useCallback(() => employeeService.dashboard(), []);
  const getUserProfile = useCallback(() => employeeService.getUserProfile(), []);
  const getOnlineStatus = useCallback(() => employeeService.getOnlineStatus(), []);
  const updateCache = useCallback(() => employeeService.updateCache(), []);
  const createUser = useCallback((employeeDTO: EmployeeDTO) => employeeService.createUser(employeeDTO), []);
  const updateProfile = useCallback((employeeDTO: EmployeeDTO) => employeeService.updateProfile(employeeDTO), []);
  const updateUser = useCallback((employeeDTO: EmployeeDTO) => employeeService.updateUser(employeeDTO), []);
  const changePassword = useCallback((changePasswordDTO: ChangePasswordDTO) => employeeService.changePassword(changePasswordDTO), []);
  const updateOnlineStatus = useCallback((logDTO: StatusLogDTO) => employeeService.updateOnlineStatus(logDTO), []);
  const resetPassword = useCallback((resetPasswordDTO: ResetPasswordDTO) => employeeService.resetPassword(resetPasswordDTO), []);
  const deleteUser = useCallback((employeeDTO: EmployeeDTO) => employeeService.deleteUser(employeeDTO), []);

  return {
    getUserByUsername,
    getAllUsers,
    dashboard,
    getUserProfile,
    getOnlineStatus,
    updateCache,
    createUser,
    updateProfile,
    updateUser,
    changePassword,
    updateOnlineStatus,
    resetPassword,
    deleteUser,
  };
}
```

### `src/test/service/employeeService.test.ts`
```typescript
import employeeService from '../../lib/services/employeeService';
import type { EmployeeDTO, ChangePasswordDTO, ResetPasswordDTO } from '../../lib/http/types';
import { describe, it, expect, vi } from 'vitest';

// Example test for getAllUsers

describe('employeeService', () => {
  it('should call getAllUsers and return data', async () => {
    vi.spyOn(employeeService, 'getAllUsers').mockResolvedValue({
      httpCode: 200,
      message: 'OK',
      data: [],
      success: true,
    });
    const result = await employeeService.getAllUsers();
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
  });
});
```
