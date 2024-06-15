import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'Marotti',
      email: 'fulano@exemplo.com',
      phone: '037489221',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)