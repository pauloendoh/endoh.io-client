export interface SkillDto {
    id: number;
    userId: number

    dependencies: SkillDto[],  
    
    isPriority: boolean;
    name: string;
    currentLevel: number;
    goalLevel: number;

    createdAt: string
    updatedAt: string
}