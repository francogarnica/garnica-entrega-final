export interface Teacher {
    id: number;
    name: string;
    surname: string;
    email: string;
    courseId: number;
}

export interface CreateTeacherPayload {
    name: string | null;
}