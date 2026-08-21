//src/types/user.ts

export type User = {
    id: string;
    fullName?: string;
    email?: string;
    role?: 'user' | 'admin' | 'instructor';
    isVerified?: boolean;
    emailVerified?: boolean;
    profilePicture?: string;
};

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    studentData: any | null;
    instructorData: any | null;
    responseTime: string;
    requestedAt: string;
    path: string;
    method: string;
}

