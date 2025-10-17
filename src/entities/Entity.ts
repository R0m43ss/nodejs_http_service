export interface Entity {
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
}