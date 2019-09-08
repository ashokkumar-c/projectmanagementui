export interface AddProject {
    projectName: string;
    setDates: boolean;
    startDate: Date;
    endDate: Date;
    priority: number;
    managerId: number;
    isSuspended: boolean;
}
