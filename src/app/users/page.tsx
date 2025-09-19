"use client";

import { useFetch } from "@/hooks/useFetch";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
}

const USERS_PER_PAGE = 5;

export default function UsersPage() {
  const [forceError, setForceError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const endpoint = forceError ? "invalid-endpoint" : "users";

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<User[]>(["users", endpoint], endpoint);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRefetch = () => {
    setCurrentPage(1);
    if (forceError) {
      setForceError(false);
    } else {
      refetch();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading users...</p>;
    }

    if (isError) {
      return (
        <div className="text-center">
          <p className="mb-4 text-red-500">
            Error loading users: {error?.message || "Unknown error"}
          </p>
          <button
            onClick={handleRefetch}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!users) {
      return <p className="text-center text-gray-500">No users found.</p>;
    }

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.company.name}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefetch}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Refetch Data
          </button>
          <button
            onClick={() => setForceError(true)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Simulate Error
          </button>
        </div>
      </div>

      {renderContent()}

      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedUser.name}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={`http://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {selectedUser.website}
                </a>
              </p>
              <p>
                <strong>Company:</strong> {selectedUser.company.name}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}`}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
