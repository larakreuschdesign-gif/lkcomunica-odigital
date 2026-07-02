export default function Table({
  title = null,
  headers = [],
  rows = [],
  medals = true,
}) {
  const getMedalEmoji = (index) => {
    const medals = ['🥇', '🥈', '🥉']
    return medals[index] || null
  }

  return (
    <div>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {medals && <th className="text-left py-3 px-4 font-semibold w-12"></th>}
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="text-left py-3 px-4 font-semibold text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {medals && (
                  <td className="text-center py-3 px-4">
                    {getMedalEmoji(rowIdx)}
                  </td>
                )}
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="py-3 px-4 text-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
