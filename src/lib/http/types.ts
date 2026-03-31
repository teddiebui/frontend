// --- More DTOs migrated from Java ---
export interface APIResultSet<T> {
    httpCode: number
    message: string
    data: T | null
    success: boolean
}
export interface ChangePasswordDTO {
    password: string;
    newPassword: string;
};

export interface EmployeeDashboardDTO {
    username: string;
    name: string;
    description: string;
    statusLog: StatusLogDTO;
    userGroup: UserGroupDTO;
    ticketCount: number;
};

export interface EmployeeStatusDTO {
    username: string;
};

export interface EmployeeTicketDTO {
    username: string;
    name: string;
    group: UserGroupDTO;
};

export interface ResetPasswordDTO {
    username: string;
    defaultPassword: string;
};

export interface AttachmentDTO {
    id: number;
    type: string;
    url: string;
    stickerId: number | null;
};

export interface MessageDTO {
    id: number;
    timestamp: string;
    text: string;
    senderEmployee: boolean;
    ticketId: number;
    senderSystem: boolean;
    attachments: AttachmentDTO[];
};

export interface FacebookUserListDTO {
    facebookId: string;
    facebookName: string;
    facebookProfilePic: string;
};

export interface ProgressStatusDTO {
    id: number;
    name: string;
    code: string;
};

export interface TicketDashboardDTO {
    id: number;
    title: string;
    createdAt: string;
    assignee: EmployeeTicketDTO;
    facebookUser: FacebookUserListDTO;
    progressStatus: ProgressStatusDTO;
    hasNewMessage: boolean;
};

export interface MessageEventDTO {
    id: number;
    ticket: TicketDashboardDTO;
    text: string;
    senderEmployee: boolean;
    timestamp: string;
    senderSystem: boolean;
    attachments: AttachmentDTO[];
};

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
    constructor(cause: unknown) {
        super('Network request failed');
        this.name = 'NetworkError';
        this.cause = cause;
    }
}

// --- DTOs migrated from Java ---

export interface PermissionDTO {
    id: number;
    name: string;
    description: string;
};

export interface UserGroupDTO {
    groupId: number;
    name: string;
    code: string;
    permissions: PermissionDTO[];
    description: string;
};

export interface StatusDTO {
    id: number;
    name: string;
};

export interface StatusLogDTO {
    status: StatusDTO;
    from: string; // Timestamp as ISO string
    username: string;
};

export interface EmployeeDTO {
    userGroup: UserGroupDTO;
    name: string;
    username: string;
    password: string;
    description: string;
    email: string;
    phone: string;
    createdAt: string; // Timestamp as ISO string
    isActive: boolean;
    failedLoginCount: number;
    statusLogs: StatusLogDTO[];
};

export interface ValidationResult {
    fieldErrors: Record<string, string>;
};

export interface LoginRequestDTO {
    username: string;
    password: string;
};

export interface LoginResponseDTO {
    employeeDTO: EmployeeDTO;
    validationResult: ValidationResult;
};