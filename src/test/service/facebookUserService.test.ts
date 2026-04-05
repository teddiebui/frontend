// src/test/service/facebookUserService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { facebookUserService } from '@/services/facebookUserService';
import { httpClient } from '@/lib/http/httpClient';
import type {
  FacebookUserListDTO,
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria,
  PaginationResponse,
  APIResultSet
} from '@/types';

vi.mock('@/lib/http/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('facebookUserService', () => {
  const mockUser: FacebookUserDetailDTO = {
    facebookId: '1',
    facebookName: 'Test User',
    facebookProfilePic: 'pic_url',
    realName: 'Real Name',
    email: 'test@example.com',
    phone: '123456789',
    zalo: 'zaloid',
    createdAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ping - success', async () => {
    (httpClient.get as any).mockResolvedValue({ data: 'it works', success: true });
    const res = await facebookUserService.ping();
    expect(res.data).toBe('it works');
  });

  it('getAll - success', async () => {
    (httpClient.get as any).mockResolvedValue({ data: [mockUser], success: true });
    const res = await facebookUserService.getAll();
    expect(res.data).toHaveLength(1);
  });

  it('get - success', async () => {
    (httpClient.get as any).mockResolvedValue({ data: mockUser, success: true });
    const res = await facebookUserService.get('1');
    expect(res.data).toEqual(mockUser);
  });

  it('create - success', async () => {
    (httpClient.post as any).mockResolvedValue({ data: mockUser, success: true });
    const res = await facebookUserService.create(mockUser);
    expect(res.data).toEqual(mockUser);
  });

  it('update - success', async () => {
    (httpClient.put as any).mockResolvedValue({ data: mockUser, success: true });
    const res = await facebookUserService.update(mockUser);
    expect(res.data).toEqual(mockUser);
  });

  it('search - success', async () => {
    const paged: PaginationResponse<FacebookUserDetailDTO> = {
      content: [mockUser],
      page: 0,
      size: 10,
      totalElements: 1,
      totalPages: 1,
    };
    (httpClient.get as any).mockResolvedValue({ data: paged, success: true });
    const res = await facebookUserService.search({}, 0, 10);
    expect(res.data?.content).toHaveLength(1);
  });

  it('delete - success', async () => {
    (httpClient.delete as any).mockResolvedValue({ data: null, success: true });
    const res = await facebookUserService.delete('1');
    expect(res.success).toBe(true);
  });

  it('exportExcel - success', async () => {
    const blob = new Blob(["excel data"]);
    (httpClient.get as any).mockResolvedValue(blob);
    const res = await facebookUserService.exportExcel({});
    expect(res).toBeInstanceOf(Blob);
  });

  it('deleteAll - success', async () => {
    (httpClient.delete as any).mockResolvedValue({ data: null, success: true });
    const res = await facebookUserService.deleteAll(['1', '2']);
    expect(res.success).toBe(true);
  });

  // Error paths
  it('getAll - error', async () => {
    (httpClient.get as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.getAll()).rejects.toThrow('fail');
  });

  it('get - error', async () => {
    (httpClient.get as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.get('1')).rejects.toThrow('fail');
  });

  it('create - error', async () => {
    (httpClient.post as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.create(mockUser)).rejects.toThrow('fail');
  });

  it('update - error', async () => {
    (httpClient.put as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.update(mockUser)).rejects.toThrow('fail');
  });

  it('search - error', async () => {
    (httpClient.get as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.search({}, 0, 10)).rejects.toThrow('fail');
  });

  it('delete - error', async () => {
    (httpClient.delete as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.delete('1')).rejects.toThrow('fail');
  });

  it('exportExcel - error', async () => {
    (httpClient.get as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.exportExcel({})).rejects.toThrow('fail');
  });

  it('deleteAll - error', async () => {
    (httpClient.delete as any).mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.deleteAll(['1', '2'])).rejects.toThrow('fail');
  });
});
