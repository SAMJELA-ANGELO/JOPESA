'use client';

import { createContext } from 'react';

export const AlumniAccessContext = createContext({
  hasFullAccess: false,
  isSystemAdmin: false,
});
