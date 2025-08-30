import { HttpResponse, http } from 'msw'

export const handlers = [
  // TBD: replace with actual API
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
