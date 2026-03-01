import { describe, it, expect, vi } from 'vitest';
import { recordAttempt } from './db.js';
import { CONFIG } from '../config.js'; // The "bridge" to keep test and code in sync

describe('db.js service', () => {
    it('successfully inserts a student attempt', async () => {
        // 1. Create a "Mock" Supabase client
        // We simulate the chain: .from().insert().select()
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
        // We check that the 'from' method was called with our config value
        expect(mockSupabase.from).toHaveBeenCalledWith(CONFIG.TABLES.TIMESTAMPS);
        expect(result[0].student_name).toBe('Test Student');
    });

    it('throws an error if studentName is missing', async () => {
        const mockSupabase = {}; // This shouldn't even be reached because of our guard clause
        
        await expect(recordAttempt(mockSupabase, ''))
            .rejects.toThrow("Student name is required");
    });
});