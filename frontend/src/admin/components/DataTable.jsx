import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function DataTable({ columns, data, onEdit, onDelete, emptyMessage = 'No records found.' }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-beige">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-lightBeige text-left text-darkCoffee">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 font-semibold text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-beige bg-white">
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-textSecondary">
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row._id} className="hover:bg-ivory/60 transition">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap text-textMain">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        className="p-2 rounded-lg text-darkCoffee hover:bg-beige transition"
                        aria-label="Edit"
                      >
                        <FiEdit2 />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                        aria-label="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
