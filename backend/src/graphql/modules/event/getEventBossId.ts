/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { getSQLDataSource } from '../../../datasource';
import { Event } from '../../../types';

export const getEventBossId = async (event: Event) => {
  if (event.author_id) {
    return event.author_id;
  } else if (event.group_id) {
    const group = await getSQLDataSource().groups.getById(event.group_id);
    if (!group) {
      throw new Error('Group does not exist');
    }
    // @ts-ignore
    return group.admin_id;
  }

  throw new Error('Event does not have admin or author');
};
