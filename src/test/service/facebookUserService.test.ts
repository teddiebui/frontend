// src/test/service/facebookUserService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { facebookUserService } from '@/services/facebookUserService';
import { httpClient } from '@/lib/http/httpClient';
import type {
  APIResultSet,
  FacebookUserDetailDTO,
  PaginationResponse,
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
  const mockedGet = vi.mocked(httpClient.get);
  const mockedPost = vi.mocked(httpClient.post);
  const mockedPut = vi.mocked(httpClient.put);
  const mockedDelete = vi.mocked(httpClient.delete);

  const mockUser: FacebookUserDetailDTO = {
    facebookId: '1',
    facebookName: 'Test User',
    facebookProfilePic: 'pic_url',
    realName: 'Real Name',
    email: 'test@example.com',
    phone: '123456789',
    zalo: 'zaloid',
    createdAt: 1704067200000,
  };

  function apiResult<T>(
    data: T | null,
    overrides: Partial<APIResultSet<T>> = {},
  ): APIResultSet<T> {
    return {
      httpCode: 200,
      message: '',
      data,
      success: true,
      ...overrides,
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ping - success', async () => {
    mockedGet.mockResolvedValue(apiResult('it works'));
    const res = await facebookUserService.ping();
    expect(res.data).toBe('it works');
  });

  it('getAll - success', async () => {
    mockedGet.mockResolvedValue(apiResult([mockUser]));
    const res = await facebookUserService.getAll();
    expect(res.data).toHaveLength(1);
  });

  it('get - success', async () => {
    mockedGet.mockResolvedValue(apiResult(mockUser));
    const res = await facebookUserService.get('1');
    expect(res.data).toEqual(mockUser);
  });

  it('create - success', async () => {
    mockedPost.mockResolvedValue(apiResult(mockUser));
    const res = await facebookUserService.create(mockUser);
    expect(res.data).toEqual(mockUser);
  });

  it('update - success', async () => {
    mockedPut.mockResolvedValue(apiResult(mockUser));
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
    mockedGet.mockResolvedValue(apiResult(paged));
    const res = await facebookUserService.search({}, 0, 10);
    expect(res.data?.content).toHaveLength(1);
  });

  it('delete - success', async () => {
    mockedDelete.mockResolvedValue(apiResult(null));
    const res = await facebookUserService.delete('1');
    expect(res.success).toBe(true);
  });

  it('exportExcel - success', async () => {
    const blob = new Blob(["excel data"]);
    mockedGet.mockResolvedValue(apiResult(blob));
    const res = await facebookUserService.exportExcel({});
    expect(res.data).toBeInstanceOf(Blob);
  });

  it('deleteAll - success', async () => {
    mockedDelete.mockResolvedValue(apiResult(null));
    const res = await facebookUserService.deleteAll(['1', '2']);
    expect(res.success).toBe(true);
  });

  // Error paths
  it('getAll - error', async () => {
    mockedGet.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.getAll()).rejects.toThrow('fail');
  });

  it('get - error', async () => {
    mockedGet.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.get('1')).rejects.toThrow('fail');
  });

  it('create - error', async () => {
    mockedPost.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.create(mockUser)).rejects.toThrow('fail');
  });

  it('update - error', async () => {
    mockedPut.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.update(mockUser)).rejects.toThrow('fail');
  });

  it('search - error', async () => {
    mockedGet.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.search({}, 0, 10)).rejects.toThrow('fail');
  });

  it('delete - error', async () => {
    mockedDelete.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.delete('1')).rejects.toThrow('fail');
  });

  it('exportExcel - error', async () => {
    mockedGet.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.exportExcel({})).rejects.toThrow('fail');
  });

  it('deleteAll - error', async () => {
    mockedDelete.mockRejectedValue(new Error('fail'));
    await expect(facebookUserService.deleteAll(['1', '2'])).rejects.toThrow('fail');
  });
});
