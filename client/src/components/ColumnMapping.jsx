import { useState } from "react";

function ColumnMapping({ columns = [] }) {
  const [mappings, setMappings] = useState(
    columns.map((column) => ({
      source: column,
      target: column
    }))
  );

  const handleTargetChange = (index, value) => {
    const updatedMappings = [...mappings];

    updatedMappings[index].target = value;

    setMappings(updatedMappings);
  };

  return (
    <div className="mapping-section">
      <div className="mapping-header">
        <div>
          <h3>Column Mapping</h3>
          <p>
            Map your source columns to the required target fields.
          </p>
        </div>
      </div>

      {mappings.length === 0 ? (
        <div className="mapping-empty">
          Upload a dataset to configure column mapping.
        </div>
      ) : (
        <div className="mapping-table">
          <div className="mapping-table-header">
            <span>Source Column</span>
            <span>Target Column</span>
          </div>

          {mappings.map((mapping, index) => (
            <div
              className="mapping-row"
              key={index}
            >
              <div className="source-column">
                {mapping.source}
              </div>

              <span className="mapping-arrow">
                →
              </span>

              <input
                type="text"
                value={mapping.target}
                onChange={(event) =>
                  handleTargetChange(
                    index,
                    event.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColumnMapping;