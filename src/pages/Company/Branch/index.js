/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import {
  CardBasic,
  Container,
  ContainerFluid,
  Sidebar,
  Topbar,
  Table,
  Wrapper,
  ModalSave,
} from "../../../components";

function Branch(props) {
  const [loading, setLoading] = useState(true);
  const [saveModal, setSaveModal] = useState(false);
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Daftar Pengguna",
      selector: (row) => row.users,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      nama: "Cabang Ngawi",
      users: "Semua Pengguna",
    },
    {
      id: 2,
      nama: "Cabang Madiun",
      users: "Herly, Ncip, Aku, Aini",
    },
  ];

  const refresh = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper>
      <Sidebar active="perusahaan" />
      <Container>
        <Topbar />
        <ContainerFluid>
          <CardBasic noHead>
            <Table
              title="Cabang"
              columns={columns}
              data={data}
              loading={loading}
              onAdd={() => props.history.push("/tambah_cabang")}
              onEdit={(val) =>
                props.history.push("/edit_cabang", { value: val })
              }
              onDelete={(val) => alert("Menghapus" + JSON.stringify(val))}
              onRefresh={() => refresh()}
              onSave={() => setSaveModal(true)}
            />
          </CardBasic>
        </ContainerFluid>
      </Container>
      <ModalSave
        show={saveModal}
        onHide={() => setSaveModal(false)}
        data={data}
      />
    </Wrapper>
  );
}

export default Branch;
