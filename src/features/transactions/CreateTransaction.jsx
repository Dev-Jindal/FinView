import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "./transactionsSlice";

const CreateTransaction = () => {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [narration, setNarration] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

  // const handleCreateTransaction = async (e) => {
  //   e.preventDefault();
  //   await dispatch(createTransaction({ amount, receiver, narration }));
  //   if (!error) {
  //     setAmount(0);
  //     setReceiver("");
  //     setNarration("");
  //     alert("Transaction successful!");
  //   }
  // };
  
  const handleCreateTransaction = async (e) => {
    e.preventDefault();
  
    try {
      // `unwrap()` ensures we catch any errors thrown inside the async thunk
      await dispatch(createTransaction({ amount, receiver, narration })).unwrap();
  
      // If the transaction is successful, reset fields
      setAmount(0);
      setReceiver("");
      setNarration("");
      alert("Transaction successful!");
    } catch (err) {
      // Show error message when the transaction fails
      alert(`Transaction failed`);
    }
  };

  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center px-4">
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Create Transaction</h1>
          <form onSubmit={handleCreateTransaction}>
            <div className="mb-4">
              <label className="block text-gray-700">Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Receiver:</label>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Narration:</label>
              <input
                type="text"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pay
            </button>
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreateTransaction;
