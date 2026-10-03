export default function Table({
  columns = [],
  rows = [],
  empty = 'No data available.',
}) {

  return (
    <div className="table-wrap">

      <table>

        <thead>

          <tr>

            {columns.map(
              column => (
                <th
                  key={column.key}
                >
                  {column.label}
                </th>
              )
            )}

          </tr>

        </thead>


        <tbody>

          {rows.length > 0 ? (

            rows.map(
              (row, index) => (

                <tr
                  key={
                    row.id ??
                    row.Id ??
                    index
                  }
                >

                  {columns.map(
                    column => (

                      <td
                        key={
                          column.key
                        }
                      >

                        {column.render
                          ? column.render(
                              row,
                              index
                            )
                          : String(
                              row[
                                column.key
                              ] ??
                                '—'
                            )}

                      </td>

                    )
                  )}

                </tr>

              )
            )

          ) : (

            <tr>

              <td
                colSpan={
                  columns.length || 1
                }
                className="empty-cell"
              >
                {empty}
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  )
}