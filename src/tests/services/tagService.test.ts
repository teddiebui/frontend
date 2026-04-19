import { beforeEach, describe, expect, it, vi } from 'vitest';
import { httpClient } from '@/lib/http/httpClient';
import { tagService } from '@/services/tagService';
import type { APIResultSet, TagDTO } from '@/types';

vi.mock('@/lib/http/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedGet = vi.mocked(httpClient.get);
const mockedPost = vi.mocked(httpClient.post);
const mockedPut = vi.mocked(httpClient.put);
const mockedDelete = vi.mocked(httpClient.delete);

const mockedTag: TagDTO = { id: 1, name: 'test' };

function apiResult<T>(data: T | null, success = true): APIResultSet<T> {
  return {
    success,
    data,
    httpCode: success ? 200 : 500,
    message: success ? '' : 'error',
  };
}

describe('tagService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll calls the collection endpoint', async () => {
    mockedGet.mockResolvedValueOnce(apiResult([mockedTag]));

    const response = await tagService.getAll();

    expect(mockedGet).toHaveBeenCalledWith('/api/tag');
    expect(response.data).toEqual([mockedTag]);
  });

  it('search forwards the keyword as a query param', async () => {
    mockedGet.mockResolvedValueOnce(apiResult([mockedTag]));

    const response = await tagService.search('test');

    expect(mockedGet).toHaveBeenCalledWith('/api/tag/search', {
      params: { keyword: 'test' },
    });
    expect(response.success).toBe(true);
  });

  it('create posts the tag payload', async () => {
    mockedPost.mockResolvedValueOnce(apiResult(mockedTag));

    const response = await tagService.create(mockedTag);

    expect(mockedPost).toHaveBeenCalledWith('/api/tag', mockedTag);
    expect(response.data).toEqual(mockedTag);
  });

  it('update sends the id in the path', async () => {
    mockedPut.mockResolvedValueOnce(apiResult(mockedTag));

    const response = await tagService.update(1, mockedTag);

    expect(mockedPut).toHaveBeenCalledWith('/api/tag/1', mockedTag);
    expect(response.data).toEqual(mockedTag);
  });

  it('delete calls the entity endpoint', async () => {
    mockedDelete.mockResolvedValueOnce(apiResult<void>(undefined));

    const response = await tagService.delete(1);

    expect(mockedDelete).toHaveBeenCalledWith('/api/tag/1');
    expect(response.success).toBe(true);
  });

  it('surfaces error responses from the API client', async () => {
    mockedGet.mockResolvedValueOnce(apiResult<TagDTO[]>(null, false));

    const response = await tagService.getAll();

    expect(response.success).toBe(false);
    expect(response.data).toBeNull();
  });
});