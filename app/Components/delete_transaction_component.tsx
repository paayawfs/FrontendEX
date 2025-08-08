'use client';
import React from 'react';

interface DeleteTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    transactionName: string;
    transactionAmount: number;
}

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    transactionName,
    transactionAmount
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">
                    Delete Transaction
                </h2>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        Are you sure you want to delete this transaction?
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium text-[#1a1a2e]">{transactionName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium text-[#1a1a2e]">₵{transactionAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTransactionModal;