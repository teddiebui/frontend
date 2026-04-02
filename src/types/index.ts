export interface APIResultSet<T> {
    httpCode: number;
    message: string;
    data: T | null;
    success: boolean;
}

export type JavaTimestamp = string;
export type JavaInstant = string;
export type EpochMillis = number;

export interface ValidationResult {
    fieldErrors: Record<string, string>;
}

export interface ChangePasswordDTO {
    password: string;
    newPassword: string;
}

export interface EmployeeDashboardDTO {
    username: string;
    name: string;
    description: string;
    statusLog: StatusLogDTO;
    userGroup: UserGroupDTO;
    ticketCount: number;
}

export interface EmployeeStatusDTO {
    username: string;
}

export interface EmployeeTicketDTO {
    username: string;
    name: string;
    group: UserGroupDTO;
}

export interface ResetPasswordDTO {
    username: string;
    defaultPassword: string;
}

export interface AttachmentDTO {
    id: number;
    type: string;
    url: string;
    stickerId: number | null;
}

export interface MessageDTO {
    id: number;
    timestamp: JavaTimestamp;
    text: string;
    senderEmployee: boolean;
    ticketId: number;
    senderSystem: boolean;
    attachments: AttachmentDTO[];
}

export interface FacebookTokenResponseDTO {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface FacebookUserProfilePictureDataDTO {
    url: string;
}

export interface FacebookUserProfilePictureDTO {
    data: FacebookUserProfilePictureDataDTO;
}

export interface FacebookUserProfileDTO {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture: FacebookUserProfilePictureDTO;
}

export interface FacebookUserDetailDTO {
    facebookId: string;
    facebookName: string;
    facebookProfilePic: string;
    realName: string;
    email: string;
    phone: string;
    zalo: string;
    createdAt: JavaInstant;
}

export interface FacebookUserExportDTO {
    facebookId: string;
    facebookName: string;
    realName: string;
    email: string;
    phone: string;
    zalo: string;
    createdAt: JavaInstant;
}

export interface FacebookUserFetchDTO {
    id: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
}

export interface FacebookUserListDTO {
    facebookId: string;
    facebookName: string;
    facebookProfilePic: string;
}

export interface FacebookUserSearchCriteria {
    facebookId: string;
    facebookName: string;
    realName: string;
    email: string;
    phone: string;
    zalo: string;
}

export interface ProgressStatusDTO {
    id: number;
    name: string;
    code: string;
}

export interface TicketDashboardDTO {
    id: number;
    title: string;
    createdAt: JavaTimestamp;
    assignee: EmployeeTicketDTO;
    facebookUser: FacebookUserListDTO;
    progressStatus: ProgressStatusDTO;
    hasNewMessage: boolean;
}

export interface MessageEventDTO {
    id: number;
    ticket: TicketDashboardDTO;
    text: string;
    senderEmployee: boolean;
    timestamp: JavaTimestamp;
    senderSystem: boolean;
    attachments: AttachmentDTO[];
}

export interface PermissionDTO {
    id: number;
    name: string;
    description: string;
}

export interface UserGroupDTO {
    groupId: number;
    name: string;
    code: string;
    permissions: PermissionDTO[];
    description: string;
}

export interface StatusDTO {
    id: number;
    name: string;
}

export interface StatusLogDTO {
    status: StatusDTO;
    from: JavaTimestamp;
    username: string;
}

export interface EmployeeDTO {
    userGroup: UserGroupDTO;
    name: string;
    username: string;
    password: string;
    description: string;
    email: string;
    phone: string;
    createdAt: JavaTimestamp;
    isActive: boolean;
    failedLoginCount: number;
    statusLogs: StatusLogDTO[];
}

export interface EmployeeDetailDTO {
    userGroup: UserGroupDTO;
    name: string;
    username: string;
    password: string;
    description: string;
    email: string;
    phone: string;
    createdAt: JavaTimestamp;
    isActive: boolean;
    failedLoginCount: number;
}

export interface LoginRequestDTO {
    username: string;
    password: string;
}

export interface LoginResponseDTO {
    employeeDTO: EmployeeDTO;
    validationResult: ValidationResult;
}

export interface OpenAIMessageDTO {
    content: string;
}

export interface OpenAIChoiceDTO {
    message: OpenAIMessageDTO;
}

export interface OpenAIUsageDTO {
    total_tokens: number;
}

export interface OpenAIResponse {
    choices: OpenAIChoiceDTO[];
    usage: OpenAIUsageDTO;
}

export interface CategoryDTO {
    id: number;
    code: string;
    name: string;
}

export interface EmotionDTO {
    id: number;
    code: string;
    name: string;
}

export interface NoteDTO {
    id: number;
    text: string;
    ticketId: number;
    timestamp: JavaTimestamp;
}

export interface AssigneeDTO {
    username: string;
    name: string;
}

export interface CriteriaDetailDTO {
    id: number;
    code: string;
    name: string;
    description: string;
    active: boolean;
}

export interface CriteriaDTO {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface CriteriaFailedDTO {
    code: string;
}

export interface FailedCriteriaStatDTO {
    code: string;
    name: string;
    description: string;
    count: number;
}

export interface PerformanceMetricDTO {
    [key: string]: unknown;
}

export interface PerformanceSummaryStatDTO {
    chatQuality: PerformanceMetricDTO;
    firstResponseTime: PerformanceMetricDTO;
    avgResponseTime: PerformanceMetricDTO;
    resolutionTime: PerformanceMetricDTO;
    chatGPTsummary: string;
}

export interface PerformanceSummaryDTO {
    assignee: AssigneeDTO;
    month: number;
    summary: PerformanceSummaryStatDTO;
}

export interface TicketAssessmentDetailDTO {
    id: number;
    ticketId: number;
    assignee: string;
    evaluatedBy: string;
    evaluatedAt: EpochMillis;
    passed: boolean;
    firstResponseTime: number;
    avgResponseTime: number;
    resolutionTime: number;
    summary: string;
    criterias: CriteriaDTO[];
}

export interface TicketAssessmentDTO {}

export interface TicketAssessmentListDTO {
    ticketId: number;
    assigneeUsername: string;
    evaluatedBy: string;
    evaluatedAt: EpochMillis;
    passed: boolean;
}

export interface SatisfactionDTO {
    id: number;
    code: string;
    name: string;
}

export interface TagDTO {
    id: number;
    name: string;
}

export interface TicketDetailDTO {
    id: number;
    title: string;
    createdAt: JavaTimestamp;
    updatedAt: JavaTimestamp;
    closedAt: JavaTimestamp;
    progressStatus: ProgressStatusDTO;
    category: CategoryDTO;
    assignee: EmployeeDTO;
    emotion: EmotionDTO;
    satisfaction: SatisfactionDTO;
    facebookUser: FacebookUserListDTO;
    tags: TagDTO[];
    notes: NoteDTO[];
}

export interface TicketListDTO {
    id: number;
    title: string;
    createdAt: JavaTimestamp;
    updatedAt: JavaTimestamp;
    closedAt: JavaTimestamp;
    progressStatus: ProgressStatusDTO;
    category: CategoryDTO;
    assignee: EmployeeDTO;
    facebookUser: FacebookUserListDTO;
    emotion: EmotionDTO;
    satisfaction: SatisfactionDTO;
}

export interface TicketPerformanceDTO {
    id: number;
    createdAt: JavaTimestamp;
    assignee: EmployeeTicketDTO;
    messages: MessageDTO[];
}

export interface TicketReportDTO {
    id: number;
    username: string;
    name: string;
    createdAt: EpochMillis;
    closedAt: EpochMillis;
    firstResponseTime: number;
    avgResponseTime: number;
    resolutionTime: number;
    messages: MessageDTO[];
}

export interface TicketSearchCriteria {
    assignee: string;
    facebookId: string;
    title: string;
    tag: string;
    progressStatus: number;
    fromTime: EpochMillis;
    toTime: EpochMillis;
    category: number;
    emotion: number;
    satisfaction: number;
}

export interface TicketVolumeReportDTO {
    id: number;
    createdAt: JavaTimestamp;
}

export interface WebHookEventQuickReplyDTO {
    payload: string;
}

export interface WebHookEventCoordinatesDTO {
    lat: number;
    longt: number;
}

export interface WebHookEventAttachmentPayloadDTO {
    url: string;
    sticker_id: number;
    coordinates: WebHookEventCoordinatesDTO;
}

export interface WebHookEventAttachmentDTO {
    type: string;
    payload: WebHookEventAttachmentPayloadDTO;
}

export interface WebHookEventUserDTO {
    id: string;
}

export interface WebHookEventMessageDTO {
    mid: string;
    text: string;
    attachments: WebHookEventAttachmentDTO[];
    sticker_id: number;
    quick_reply: WebHookEventQuickReplyDTO;
}

export interface WebHookEventMessagingDTO {
    sender: WebHookEventUserDTO;
    recipient: WebHookEventUserDTO;
    timestamp: EpochMillis;
    message: WebHookEventMessageDTO;
}

export interface WebHookEventEntryDTO {
    id: string;
    time: EpochMillis;
    messaging: WebHookEventMessagingDTO[];
}

export interface WebHookEventDTO {
    object: string;
    entry: WebHookEventEntryDTO[];
}

export interface NotificationDTO<T = unknown> {
    entity: string;
    action: string;
    data: T;
}

export interface RequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    data?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
    timeoutMs?: number;
}

export type ShorthandConfig = Omit<RequestConfig, 'url' | 'method' | 'data'>;

export class NetworkError extends Error {
    public readonly cause: unknown;

    constructor(cause: unknown) {
        super('Network request failed');
        this.name = 'NetworkError';
        this.cause = cause;
    }
}