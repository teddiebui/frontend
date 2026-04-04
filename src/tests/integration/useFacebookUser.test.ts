import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFacebookUser } from '../../hooks/useFacebookUser';
import { facebookUserService } from '../../services/facebookUserService';
import type { FacebookUserDetailDTO, PaginationResponse } from '../../types';

vi.mock('../../services/facebookUserService', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    facebookUserService: {
      ...actual.facebookUserService,
      getAll: vi.fn(),
      getById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      search: vi.fn(),
      delete: vi.fn(),
      deleteAll: vi.fn(),
    },
  };
});

describe('useFacebookUser', () => {
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

  it('fetchAll happy path', async () => {
    (facebookUserService.getAll as jest.MockedFunction<typeof facebookUserService.getAll>).mockResolvedValue({ success: true, data: [mockUser], httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.fetchAll();
    });
    expect(result.current.users).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchAll fail path', async () => {
    (facebookUserService.getAll as jest.MockedFunction<typeof facebookUserService.getAll>).mockResolvedValue({ success: false, data: null, httpCode: 500, message: 'error' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.fetchAll();
    });
    expect(result.current.users).toHaveLength(0);
    expect(result.current.error).toBe('error');
  });

  it('fetchById happy path', async () => {
    (facebookUserService.getById as jest.MockedFunction<typeof facebookUserService.getById>).mockResolvedValue({ success: true, data: mockUser, httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.fetchById('1');
    });
    expect(result.current.detail?.facebookId).toBe('1');
    expect(result.current.error).toBeNull();
  });

  it('fetchById fail path', async () => {
    (facebookUserService.getById as jest.MockedFunction<typeof facebookUserService.getById>).mockResolvedValue({ success: false, data: null, httpCode: 404, message: 'not found' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.fetchById('1');
    });
    expect(result.current.detail).toBeNull();
    expect(result.current.error).toBe('not found');
  });

  it('search happy path', async () => {
    const paged: PaginationResponse<FacebookUserDetailDTO> = {
      content: [mockUser],
      page: 0,
      size: 10,
      totalElements: 1,
      totalPages: 1,
    };
    (facebookUserService.search as jest.MockedFunction<typeof facebookUserService.search>).mockResolvedValue({ success: true, data: paged, httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.search({}, 0, 10);
    });
    expect(result.current.pagination?.content).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('search fail path', async () => {
    (facebookUserService.search as jest.MockedFunction<typeof facebookUserService.search>).mockResolvedValue({ success: false, data: null, httpCode: 500, message: 'fail' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.search({}, 0, 10);
    });
    expect(result.current.pagination).toBeNull();
    expect(result.current.error).toBe('fail');
  });

  it('create happy path', async () => {
    (facebookUserService.create as jest.MockedFunction<typeof facebookUserService.create>).mockResolvedValue({ success: true, data: mockUser, httpCode: 201, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.create(mockUser);
    });
    expect(result.current.detail?.facebookId).toBe('1');
    expect(result.current.error).toBeNull();
  });

  it('create fail path', async () => {
    (facebookUserService.create as jest.MockedFunction<typeof facebookUserService.create>).mockResolvedValue({ success: false, data: null, httpCode: 400, message: 'fail' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.create(mockUser);
    });
    expect(result.current.detail).toBeNull();
    expect(result.current.error).toBe('fail');
  });

  it('update happy path', async () => {
    (facebookUserService.update as jest.MockedFunction<typeof facebookUserService.update>).mockResolvedValue({ success: true, data: mockUser, httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.update(mockUser);
    });
    expect(result.current.detail?.facebookId).toBe('1');
    expect(result.current.error).toBeNull();
  });

  it('update fail path', async () => {
    (facebookUserService.update as jest.MockedFunction<typeof facebookUserService.update>).mockResolvedValue({ success: false, data: null, httpCode: 400, message: 'fail' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.update(mockUser);
    });
    expect(result.current.detail).toBeNull();
    expect(result.current.error).toBe('fail');
  });

  it('remove happy path', async () => {
    (facebookUserService.delete as jest.MockedFunction<typeof facebookUserService.delete>).mockResolvedValue({ success: true, data: null, httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.remove('1');
    });
    expect(result.current.error).toBeNull();
  });

  it('remove fail path', async () => {
    (facebookUserService.delete as jest.MockedFunction<typeof facebookUserService.delete>).mockResolvedValue({ success: false, data: null, httpCode: 400, message: 'fail' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.remove('1');
    });
    expect(result.current.error).toBe('fail');
  });

  it('removeAll happy path', async () => {
    (facebookUserService.deleteAll as jest.MockedFunction<typeof facebookUserService.deleteAll>).mockResolvedValue({ success: true, data: null, httpCode: 200, message: '' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.removeAll(['1', '2']);
    });
    expect(result.current.error).toBeNull();
  });

  it('removeAll fail path', async () => {
    (facebookUserService.deleteAll as jest.MockedFunction<typeof facebookUserService.deleteAll>).mockResolvedValue({ success: false, data: null, httpCode: 400, message: 'fail' });
    const { result } = renderHook(() => useFacebookUser());
    await act(async () => {
      await result.current.removeAll(['1', '2']);
    });
    expect(result.current.error).toBe('fail');
  });
});
