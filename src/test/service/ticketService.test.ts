import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ticketService } from '@/services/ticketService';
import { httpClient } from '@/lib/http/httpClient';
import type {
  APIResultSet,
  TicketDetailDTO,
  TicketListDTO,
  TicketDashboardDTO,
  TicketReportDTO,
  TicketSearchCriteria,
  NoteDTO,
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

describe('ticketService', () => {
  const mockedGet = vi.mocked(httpClient.get);
  const mockedPost = vi.mocked(httpClient.post);
  const mockedPut = vi.mocked(httpClient.put);
  const mockedDelete = vi.mocked(httpClient.delete);

  const dummyTicket: TicketDetailDTO = {
    id: 1,
    title: 'Test Ticket',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    closedAt: '2024-01-02T00:00:00Z',
    progressStatus: { id: 1, name: 'Open', code: 'OPEN' },
    category: { id: 1, code: 'GEN', name: 'General' },
    assignee: {
      userGroup: { groupId: 1, name: 'Admin', code: 'ADMIN', permissions: [], description: '' },
      name: 'Assignee',
      username: 'assignee',
      password: '',
      description: '',
      email: '',
      phone: '',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true,
      failedLoginCount: 0,
      statusLogs: [],
    },
    emotion: { id: 1, code: 'HAPPY', name: 'Happy' },
    satisfaction: { id: 1, code: 'SAT', name: 'Satisfied' },
    facebookUser: { facebookId: 'fb1', facebookName: 'FB User', facebookProfilePic: '' },
    tags: [],
    notes: [],
  };
  const dummyList: TicketListDTO[] = [
    {
      id: 1,
      title: 'Test Ticket',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      closedAt: '2024-01-02T00:00:00Z',
      progressStatus: { id: 1, name: 'Open', code: 'OPEN' },
      category: { id: 1, code: 'GEN', name: 'General' },
      assignee: dummyTicket.assignee,
      facebookUser: dummyTicket.facebookUser,
      emotion: dummyTicket.emotion,
      satisfaction: dummyTicket.satisfaction,
    },
  ];
  const dummyDashboard: TicketDashboardDTO[] = [
    {
      id: 1,
      title: 'Test Ticket',
      createdAt: '2024-01-01T00:00:00Z',
      assignee: { username: 'assignee', name: 'Assignee', group: dummyTicket.assignee.userGroup },
      facebookUser: dummyTicket.facebookUser,
      progressStatus: dummyTicket.progressStatus,
      hasNewMessage: false,
    },
  ];
  const dummyReport: TicketReportDTO[] = [
    {
      id: 1,
      username: 'assignee',
      name: 'Assignee',
      createdAt: 1704067200000,
      closedAt: 1704153600000,
      firstResponseTime: 10,
      avgResponseTime: 5,
      resolutionTime: 15,
      messages: [],
    },
  ];
  const dummyNotes: Set<NoteDTO> = new Set([
    { id: 1, text: 'Note', ticketId: 1, timestamp: '2024-01-01T00:00:00Z' },
  ]);
  const dummyPagination: PaginationResponse<TicketListDTO> = {
    content: dummyList,
    page: 0,
    size: 10,
    totalElements: 1,
    totalPages: 1,
  };
  const dummyCriteria: TicketSearchCriteria = {
    assignee: '',
    facebookId: '',
    title: '',
    tag: '',
    progressStatus: 0,
    fromTime: 0,
    toTime: 0,
    category: 0,
    emotion: 0,
    satisfaction: 0,
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

  it('getById happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyTicket));
    const res = await ticketService.getById(1);
    expect(res.data).toEqual(dummyTicket);
  });

  it('getById failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, message: 'Not found', httpCode: 404 }));
    const res = await ticketService.getById(1);
    expect(res.success).toBe(false);
    expect(res.data).toBeNull();
  });

  it('create happy path', async () => {
    mockedPost.mockResolvedValue(apiResult(dummyTicket));
    const res = await ticketService.create(dummyTicket);
    expect(res.data).toEqual(dummyTicket);
  });

  it('create failed path', async () => {
    mockedPost.mockResolvedValue(apiResult(null, { success: false, message: 'Error', httpCode: 400 }));
    const res = await ticketService.create(dummyTicket);
    expect(res.success).toBe(false);
  });

  it('update happy path', async () => {
    mockedPut.mockResolvedValue(apiResult(dummyTicket));
    const res = await ticketService.update(1, dummyTicket);
    expect(res.data).toEqual(dummyTicket);
  });

  it('update failed path', async () => {
    mockedPut.mockResolvedValue(apiResult(null, { success: false, message: 'Update failed', httpCode: 400 }));
    const res = await ticketService.update(1, dummyTicket);
    expect(res.success).toBe(false);
  });

  it('getByFacebookId happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyList));
    const res = await ticketService.getByFacebookId('fb1');
    expect(res.data).toEqual(dummyList);
  });

  it('getByFacebookId failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 404 }));
    const res = await ticketService.getByFacebookId('fb1');
    expect(res.data).toBeNull();
  });

  it('addNote happy path', async () => {
    mockedPut.mockResolvedValue(apiResult(null));
    const res = await ticketService.addNote(1, { id: 1, text: 'Note', ticketId: 1, timestamp: '2024-01-01T00:00:00Z' });
    expect(res.success).toBe(true);
  });

  it('addNote failed path', async () => {
    mockedPut.mockResolvedValue(apiResult(null, { success: false, message: 'Add note failed', httpCode: 400 }));
    const res = await ticketService.addNote(1, { id: 1, text: 'Note', ticketId: 1, timestamp: '2024-01-01T00:00:00Z' });
    expect(res.success).toBe(false);
  });

  it('removeNote happy path', async () => {
    mockedDelete.mockResolvedValue(apiResult(null));
    const res = await ticketService.removeNote(1, 1);
    expect(res.success).toBe(true);
  });

  it('removeNote failed path', async () => {
    mockedDelete.mockResolvedValue(apiResult(null, { success: false, message: 'Remove note failed', httpCode: 400 }));
    const res = await ticketService.removeNote(1, 1);
    expect(res.success).toBe(false);
  });

  it('getAllNotes happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyNotes));
    const res = await ticketService.getAllNotes(1);
    expect(res.data).toEqual(dummyNotes);
  });

  it('getAllNotes failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 404 }));
    const res = await ticketService.getAllNotes(1);
    expect(res.data).toBeNull();
  });

  it('search happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyPagination));
    const res = await ticketService.search(dummyCriteria, 0, 10);
    expect(res.data).toEqual(dummyPagination);
  });

  it('search failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 400 }));
    const res = await ticketService.search(dummyCriteria, 0, 10);
    expect(res.data).toBeNull();
  });

  it('searchReport happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyPagination));
    const res = await ticketService.searchReport(dummyCriteria);
    expect(res.data).toEqual(dummyPagination);
  });

  it('searchReport failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 400 }));
    const res = await ticketService.searchReport(dummyCriteria);
    expect(res.data).toBeNull();
  });

  it('dashboard happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyDashboard));
    const res = await ticketService.dashboard();
    expect(res.data).toEqual(dummyDashboard);
  });

  it('dashboard failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 500 }));
    const res = await ticketService.dashboard();
    expect(res.data).toBeNull();
  });

  it('findResolvedWithMessages happy path', async () => {
    mockedGet.mockResolvedValue(apiResult(dummyReport));
    const res = await ticketService.findResolvedWithMessages();
    expect(res.data).toEqual(dummyReport);
  });

  it('findResolvedWithMessages failed path', async () => {
    mockedGet.mockResolvedValue(apiResult(null, { success: false, httpCode: 500 }));
    const res = await ticketService.findResolvedWithMessages();
    expect(res.data).toBeNull();
  });
});
