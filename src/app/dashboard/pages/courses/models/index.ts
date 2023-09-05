export interface Course {
    id: number;
    name: string;
    price: number;
    description: string;
    duration: string;
}

export interface CreateCourseData {
    name: string,
    price: number,
    description: string;
    duration: string;
}

export interface UpdateCourseData {
    name?: string,
    price?: number,
    description?: string;
    duration?: string;
}

export interface CreateCoursePayload {
    name: string | null;
    price: number | null;
    description: string | null;
    duration: string | null;
}