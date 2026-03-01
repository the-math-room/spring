import { describe, it, expect, vi } from 'vitest';
import { recordAttempt } from './db.js';

describe('db.js service', () => {
    it('successfully inserts a student attempt', async () => {
        // 1. Create a "Mock" Supabase client
        const mockSupabase = {
            from: vi.fn().mockReturnThis(),
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockResolvedValue({ 
                data: [{ id: 1, student_name: 'Test Student' }], 
                error: null 
            })
        };

        // 2. Run the function
        const result = await recordAttempt(mockSupabase, 'Test Student');

        // 3. Assertions (The "Checks")
        expect(mockSupabase.from).toHaveBeenCalledWith('timestamps');
        expect(result[0].student_name).toBe('Test Student');
    });

    it('throws an error if studentName is missing', async () => {
        const mockSupabase = {}; // Shouldn't even be called
        
        await expect(recordAttempt(mockSupabase, ''))
            .rejects.toThrow("Student name is required");
    });
});