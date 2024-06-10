import { describe, it, expect } from 'vitest';
import createResponse from '../utils/createResponse';
import type { Response } from '../utils/types';

describe('createResponse', () => {
  it('should create a success response', () => {
    const data = { id: 1, name: 'Test' };
    const message = 'Operation successful';
    const response: Response<typeof data> = createResponse('success', data, message);

    expect(response.status).toBe('success');
    expect(response.data).toEqual(data);
    expect(response.message).toBe(message);
  });

  it('should create an error response with null data', () => {
    const message = 'An error occurred';
    const response: Response<null> = createResponse('error', null, message);

    expect(response.status).toBe('error');
    expect(response.data).toBeNull();
    expect(response.message).toBe(message);
  });

  it('should create an error response with any data', () => {
    const data = { errorCode: 500, errorMsg: 'Internal Server Error' };
    const message = 'An error occurred';
    const response: Response<typeof data> = createResponse('error', data, message);

    expect(response.status).toBe('error');
    expect(response.data).toEqual(data);
    expect(response.message).toBe(message);
  });
});