import { createAction } from '@reduxjs/toolkit';

import { getActionPrefix } from '@/utils/helpers';

const actionPrefix = getActionPrefix('config');

export const initializeApp = createAction(`${actionPrefix}/initializeApp`);
