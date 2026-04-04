import { describe, it, expect, vi, beforeEach } from 'vitest';
import { facebookUserService } from '../../services/facebookUserService';
import { httpClient } from '../../lib/http/httpClient';
import type { FacebookUserDetailDTO, PaginationResponse } from '../../types';
// import type {
//   FacebookUserDetailDTO,
//   PaginationResponse
// } from '../../../types';

vi.mock('../../lib/http/httpClient', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    httpClient: {
      ...actual.httpClient,
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('facebookUserService', () => {
  const mockUser: FacebookUserDetailDTO = {
    facebookId: '1',
    facebookName: 'Test User',
    facebookProfilePic: 'pic_url',
    realName: 'Real Name',
    email: 'test@example.com',
    phone: '123456789',
    zalo: 'zalo',
    createdAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all users (happy path)', async () => {
    (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue({ success: true, data: [mockUser], httpCode: 200, message: '' });
    const res = await facebookUserService.getAll();
    expect(res.success).toBe(true);
    expect(res.data).toHaveLength(1);
  });

  it('should handle get all users (fail path)', async () => {
    (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue({ success: false, data: null, httpCode: 500, message: 'error' });
    const res = await facebookUserService.getAll();
    expect(res.success).toBe(false);
    expect(res.data).toBeNull();
  });

  it('should get user by id', async () => {
    (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue({ success: true, data: mockUser, httpCode: 200, message: '' });
    const res = await facebookUserService.getById('1');
    expect(res.success).toBe(true);
    expect(res.data?.facebookId).toBe('1');
  });

  it('should create user', async () => {
    (httpClient.post as jest.MockedFunction<typeof httpClient.post>).mockResolvedValue({ success: true, data: mockUser, httpCode: 201, message: '' });
    const res = await facebookUserService.create(mockUser);
    expect(res.success).toBe(true);
    expect(res.data?.facebookId).toBe('1');
  });

  it('should update user', async () => {
    (httpClient.put as jest.MockedFunction<typeof httpClient.put>).mockResolvedValue({ success: true, data: mockUser, httpCode: 200, message: '' });
    const res = await facebookUserService.update(mockUser);
    expect(res.success).toBe(true);
    expect(res.data?.facebookId).toBe('1');
  });

  it('should search users', async () => {
    const paged: PaginationResponse<FacebookUserDetailDTO> = {
      content: [mockUser],
      page: 0,
      size: 10,
      totalElements: 1,
      totalPages: 1,
    };
    (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue({ success: true, data: paged, httpCode: 200, message: '' });
    const res = await facebookUserService.search({}, 0, 10);
    expect(res.success).toBe(true);
    expect(res.data?.content).toHaveLength(1);
  });

  it('should delete user', async () => {
    (httpClient.delete as jest.MockedFunction<typeof httpClient.delete>).mockResolvedValue({ success: true, data: null, httpCode: 200, message: '' });
    const res = await facebookUserService.delete('1');
    expect(res.success).toBe(true);
  });

  it('should delete all users', async () => {
    (httpClient.delete as jest.MockedFunction<typeof httpClient.delete>).mockResolvedValue({ success: true, data: null, httpCode: 200, message: '' });
    const res = await facebookUserService.deleteAll(['1', '2']);
    expect(res.success).toBe(true);
  });

  it('should export excel', async () => {
    (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue({ success: true, data: new Blob(), httpCode: 200, message: '' });
    const res = await facebookUserService.exportExcel({});
    expect(res.success).toBe(true);
  });
});
