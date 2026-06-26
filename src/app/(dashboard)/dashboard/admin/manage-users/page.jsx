import { getUsersList } from '@/lib/api/users';
import ManageUsersTable from './ManageUsersTable';
import React from 'react';

const ManageUsersPage = async () => {
  const { users } = await getUsersList();

  return (
    <div className="">
      <ManageUsersTable users={users} />
    </div>
  );
};

export default ManageUsersPage;