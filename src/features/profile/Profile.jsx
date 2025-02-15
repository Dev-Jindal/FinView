import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from './profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        <p className="text-gray-700 mb-4"><span className="font-semibold">Name:</span> {data.username}</p>
        <p className="text-gray-700 mb-4"><span className="font-semibold">Email:</span> {data.email}</p>
        <p className="text-gray-700 mb-4"><span className="font-semibold">Account Number:</span> {data.accountNumber}</p>
        {/* <p className="text-gray-700 mb-4"><span className="font-semibold">Account Created Date:</span> {new Date(data.createdAt).toLocaleDateString()}</p> */}
        <p className="text-gray-700 mb-4"><span className="font-semibold">Balance:</span> ${data.balance}</p>
      </div>
    </div>
  );
};

export default Profile;
