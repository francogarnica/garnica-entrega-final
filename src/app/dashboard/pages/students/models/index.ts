export interface Student {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export interface CreateStudentPayload {
    name: string | null;
    surname: string | null;
    email: string | null;
}