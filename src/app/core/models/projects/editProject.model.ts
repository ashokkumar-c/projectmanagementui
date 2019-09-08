export interface EditProject {
    projectId: number;
    projectName: string;
    setDates: boolean;
    startDate: Date;
    endDate: Date;
    priority: number;
    managerId: number;
    isSuspended: boolean;
    _id: string;
}
