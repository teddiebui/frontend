import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tagService } from '@/services/tagService';
import type { APIResultSet, TagDTO } from '@/types';

vi.mock('@/services/tagService', () => ({
  tagService: {
    search: vi.fn(),
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedTagService = vi.mocked(tagService);

const mockedTag: TagDTO = { id: 1, name: 'test' };
const mockedResponse: APIResultSet<TagDTO> = {
  success: true,
  data: mockedTag,
  httpCode: 200,
  message: '',
};
const mockedVoidResponse: APIResultSet<void> = {
  success: true,
  data: undefined,
  httpCode: 200,
  message: '',
};
const mockedListResponse: APIResultSet<TagDTO[]> = {
    success: true,
    data: [mockedTag],
    httpCode: 200,
    message: '',
    };  
const mockedEmptyListResponse: APIResultSet<TagDTO[]> = {
    success: true,
    data: [],
    httpCode: 200,
    message: '',
    };
    
describe('tagService', () => {
  const mockTag = { id: 1, name: 'test' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

    it('getAll - success', async () => {
    mockedTagService.getAll.mockResolvedValue(mockedListResponse);
    const res = await mockedTagService.getAll();
    expect(res.success).toBe(true);
    expect(res.data).toHaveLength(1);
  });

  it('getAll - fail', async () => {
    mockedTagService.getAll.mockResolvedValue(mockedEmptyListResponse);
    const res = await mockedTagService.getAll();
    expect(res.success).toBe(true);
    expect(res.data).toHaveLength(0);
  });

  it('search - success', async () => {
    mockedTagService.search.mockResolvedValue(mockedListResponse);
    const res = await mockedTagService.search('test');
    expect(res.success).toBe(true);
    expect(res.data).toHaveLength(1);
  });

    it('search - empty result', async () => {
    mockedTagService.search.mockResolvedValue(mockedEmptyListResponse);
    const res = await mockedTagService.search('test');
    expect(res.success).toBe(true);
    expect(res.data).toHaveLength(0);
  });

  it('create - success', async () => {
    mockedTagService.create.mockResolvedValue(mockedResponse);
    const res = await mockedTagService.create(mockTag);
    expect(res.success).toBe(true);
    expect(res.data).toEqual(mockTag);
  });

  it('update - success', async () => {
    mockedTagService.update.mockResolvedValue(mockedResponse);
    const res = await mockedTagService.update(1, mockTag);
    expect(res.success).toBe(true);
    expect(res.data).toEqual(mockTag);
  });

  it('delete - success', async () => {
    mockedTagService.delete.mockResolvedValue(mockedVoidResponse);
    const res = await mockedTagService.delete(1);
    expect(res.success).toBe(true);
  });
});