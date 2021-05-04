
type ApiError = {
    message: string;
    code: number;
}

type ApiStatus = {
    isSuccess: boolean;
    message: string;
}

export type Token = {
    id: string;
    role: "admin" | "staff";
}

export interface ApiResponse<T> {
    status: ApiStatus;
    data?: T;
    error?: ApiError;
}
