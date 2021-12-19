import React from "react";
import DataTable from "react-data-table-component";
import Spinner from "../../Spinner";

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  headRow: {
    style: {
      // border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
      fontWeight: "bold",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
    style: {
      borderBottomWidth: "0px",
      borderBottomColor: "transparent",
      border: "none",
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
    },
  },
  header: {
    style: {
      padding: 0,
      minHeight: 0,
    },
  },
  subHeader: {
    style: {
      padding: 0,
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const CustomLoader = () => (
  <div style={{ padding: "24px", marginTop: "30px" }}>
    <Spinner />
  </div>
);

const FilterComponent = ({
  filterText,
  onFilter,
  onClear,
  onSave,
  onRefresh,
  onAdd,
}) => (
  <>
    <div className="col-12 d-flex px-0">
      <div className="input-group mb-0 justify-content-end">
        <div className="col-sm-12 col-md-5 col-xl-5 d-flex px-0">
          <div className="input-group">
            <input
              id="search"
              type="text"
              placeholder="Filter"
              aria-label="Search Input"
              value={filterText}
              onChange={onFilter}
              className="form-control form-control-sm"
              style={{
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRadius: 0,
                // borderColor: "#e74a3b",
                borderColor: "#d1d3e2",
              }}
            />
            {filterText.length ? (
              <div className="input-group-append">
                <button
                  className="btn btn-outline-danger btn-sm"
                  type="button"
                  onClick={onClear}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#d1d3e2",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    borderRadius: 0,
                  }}
                >
                  <i
                    className={
                      filterText.length
                        ? "fa fa-times text-dark"
                        : "fa fa-times text-muted"
                    }
                  />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-primary ml-2 btn-sm px-2 d-flex align-items-center"
        type="button"
        onClick={onRefresh}
      >
        <i className="fa fa-sync-alt" />
        <div className="d-none d-sm-block ml-2">Refresh</div>
      </button>
      <button
        className="btn btn-info ml-2 btn-sm px-2 d-flex align-items-center"
        type="button"
        onClick={onSave}
      >
        <i className="fa fa-cloud-download-alt" />
        <div className="d-none d-sm-block ml-2">Simpan</div>
      </button>
      <button
        className="btn btn-primary ml-2 btn-sm px-2 d-flex align-items-center"
        type="button"
        onClick={onAdd}
      >
        <i className="fa fa-plus-circle" />
        <div className="d-none d-sm-block ml-2">Tambah</div>
      </button>
    </div>
  </>
);

function TableDefault({
  title,
  loading = false,
  columns,
  data,
  onEdit,
  onDelete,
  onRefresh,
  onAdd,
  onSave,
  noAction = false,
  header = true,
}) {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const newColumns = [
    ...columns,
    {
      name: "Aksi",
      cell: (row) => (
        <div>
          <div
            className="badge badge-success py-1 px-2 mr-1"
            onClick={() => onEdit(row)}
            style={{ cursor: "pointer", fontSize: 11, fontWeight: "normal" }}
          >
            <i className="fa fa-edit" /> Edit
          </div>
          <div
            className="badge badge-danger py-1 px-2 mr-1"
            onClick={() => onDelete(row)}
            style={{ cursor: "pointer", fontSize: 11, fontWeight: "normal" }}
          >
            <i className="fa fa-trash" /> Hapus
          </div>
        </div>
      ),
      allowOverflow: true,
      // button: true,
      // width: "56px",
    },
  ];

  function filterItem(arr, searchKey) {
    return arr.filter((obj) =>
      Object.keys(obj).some((key) =>
        String(obj[key]).toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onSave={onSave}
        onRefresh={onRefresh}
        filterText={filterText}
        onClear={handleClear}
        onAdd={onAdd}
      />
    );
  }, [filterText, resetPaginationToggle, onRefresh, onAdd, onSave]);

  return (
    <DataTable
      title={title}
      columns={noAction ? columns : newColumns}
      data={filterItem(data, filterText)}
      pagination
      progressPending={loading}
      progressComponent={<CustomLoader />}
      customStyles={customStyles}
      highlightOnHover
      persistTableHead
      subHeader={header}
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
}

export default TableDefault;
