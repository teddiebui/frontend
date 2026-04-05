import { describe, it, expect, vi, beforeEach } from 'vitest';
import { facebookUserService } from '@/services/facebookUserService';
import { httpClient } from '@/lib/http/httpClient';
import type { FacebookUserDetailDTO, PaginationResponse } from '@/types';

// mock httpClient
vi.mock('@/lib/http/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedHttp = vi.mocked(httpClient);

// mock data
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

describe('facebookUserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------- getAll --------
  it('getAll should call correct endpoint', async () => {
    mockedHttp.get.mockResolvedValue({
      success: true,
      data: [mockUser],
      httpCode: 200,
      message: '',
    });

    const res = await facebookUserService.getAll();

    expect(mockedHttp.get).toHaveBeenCalledWith('/facebookuser');
    expect(res.data).toHaveLength(1);
  });

  it('getAll should handle failure response', async () => {
    mockedHttp.get.mockResolvedValue({
      success: false,
      data: null,
      httpCode: 500,
      message: 'error',
    });

    const res = await facebookUserService.getAll();

    expect(res.success).toBe(false);
    expect(res.data).toBeNull();
  });

  it('getAll should throw on network error', async () => {
    mockedHttp.get.mockRejectedValue(new Error('network'));

    await expect(facebookUserService.getAll()).rejects.toThrow('network');
  });

  // -------- getById --------
  it('getById should call correct endpoint', async () => {
    mockedHttp.get.mockResolvedValue({
      success: true,
      data: mockUser,
      httpCode: 200,
      message: '',
    });

    const res = await facebookUserService.get('1');

    expect(mockedHttp.get).toHaveBeenCalledWith('/facebookuser', { params: { id: '1' } });
    expect(res.data?.facebookId).toBe('1');
  });

  // -------- create --------
  it('create should POST correct payload', async () => {
    mockedHttp.post.mockResolvedValue({
      success: true,
      data: mockUser,
      httpCode: 201,
      message: '',
    });

    const res = await facebookUserService.create(mockUser);

    expect(mockedHttp.post).toHaveBeenCalledWith('/facebookuser', mockUser);
    expect(res.data?.facebookId).toBe('1');
  });

  // -------- update --------
  it('update should PUT correct payload', async () => {
    mockedHttp.put.mockResolvedValue({
      success: true,
      data: mockUser,
      httpCode: 200,
      message: '',
    });

    const res = await facebookUserService.update(mockUser);

    expect(mockedHttp.put).toHaveBeenCalledWith(
      `/facebookuser`,
      mockUser
    );
    expect(res.data?.facebookId).toBe('1');
  });

  // -------- search --------
  it('search should send correct query params', async () => {
    const paged: PaginationResponse<FacebookUserDetailDTO> = {
      content: [mockUser],
      page: 0,
      size: 10,
      totalElements: 1,
      totalPages: 1,
    };

    mockedHttp.get.mockResolvedValue({
      success: true,
      data: paged,
      httpCode: 200,
      message: '',
    });

    const filter = { facebookName: 'test' };

    const res = await facebookUserService.search(filter, 0, 10);


    expect(mockedHttp.get).toHaveBeenCalledWith(
      '/facebookuser/search',
      expect.objectContaining({
        params: expect.objectContaining({
          ...filter,
          page: 0,
          size: 10,
          sort: expect.any(String),
        }),
      })
    );

    expect(res.data?.content).toHaveLength(1);
  });

  // -------- delete --------
  it('delete should call correct endpoint', async () => {
    mockedHttp.delete.mockResolvedValue({
      success: true,
      data: null,
      httpCode: 200,
      message: '',
    });

    const res = await facebookUserService.delete('1');

    expect(mockedHttp.delete).toHaveBeenCalledWith('/facebookuser', { params: { id: '1' } });
    expect(res.success).toBe(true);
  });

  // -------- deleteAll --------
  it('deleteAll should send ids payload', async () => {
    mockedHttp.delete.mockResolvedValue({
      success: true,
      data: null,
      httpCode: 200,
      message: '',
    });

    const ids = ['1', '2'];

    const res = await facebookUserService.deleteAll(ids);

    expect(mockedHttp.delete).toHaveBeenCalledWith('/facebookuser/delete-all', {
      data: ids,
    });

    expect(res.success).toBe(true);
  });

  // -------- exportExcel --------
//   it('exportExcel should request blob', async () => {
//     const blob = new Blob();

//     mockedHttp.get.mockResolvedValue({
//       success: true,
//       data: blob,
//       httpCode: 200,
//       message: '',
//     });

//     const res = await facebookUserService.exportExcel({ facebookName: 'test' });

//     expect(mockedHttp.get).toHaveBeenCalledWith(
//       '/facebookuser/export-excel',
//       {
//         params: { facebookName: 'test' },
//         responseType: 'blob',
//       }
//     );

//     expect(res.data).toBeInstanceOf(Blob);
//   });
});