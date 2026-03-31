import { httpClient } from "../http/httpClient"
import type { APIResultSet, EmployeeDTO, LoginRequestDTO, LoginResponseDTO } from "../http/types"


const BASE_URL= import.meta.env.VITE_BASE_AUTH_URL || "/api/auth"
const LOGIN_URL= `${BASE_URL}/login`
const LOGOUT_URL= `${BASE_URL}/logout`
const ME_URL= `${BASE_URL}/me`

const authService = {
    login(loginRequest: LoginRequestDTO): Promise<APIResultSet<LoginResponseDTO>> {
        return httpClient.post<LoginResponseDTO>(LOGIN_URL, loginRequest)
    },
    logout(): Promise<APIResultSet<void>> {
        return httpClient.get<void>(LOGOUT_URL)
    },
    me(): Promise<APIResultSet<EmployeeDTO>> {
        return httpClient.get<EmployeeDTO>(ME_URL)
    },
}

export default authService