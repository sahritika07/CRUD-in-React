"use client"

export default function DeleteConfirmation({ isOpen, userName, onConfirm, onCancel }) {
  // If dialog is not open, don't render anything
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          This will permanently delete {userName}'s account. This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

