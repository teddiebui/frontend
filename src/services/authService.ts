import { httpClient } from "../lib/http/httpClient"
import type { APIResultSet, EmployeeDTO, LoginRequestDTO, LoginResponseDTO } from "../types"


const BASE_URL= "/auth"

const authService = {
    login(loginRequest: LoginRequestDTO): Promise<APIResultSet<LoginResponseDTO>> {
        return httpClient.post<LoginResponseDTO>(`${BASE_URL}/login`, loginRequest)
    },
    logout(): Promise<APIResultSet<void>> {
        return httpClient.get<void>(`${BASE_URL}/logout`)
    },
    me(): Promise<APIResultSet<EmployeeDTO>> {
        return httpClient.get<EmployeeDTO>(`${BASE_URL}/me`)
    },
}

export default authService