/* eslint-disable array-callback-return */
import React from "react";
import {
  CardBasic,
  Container,
  ContainerFluid,
  Sidebar,
  Topbar,
  Wrapper,
  Input,
  Button,
} from "../../../components";

function BranchAdd() {
  return (
    <Wrapper>
      <Sidebar active="perusahaan" />
      <Container>
        <Topbar />
        <ContainerFluid>
          <CardBasic title="Tambah Cabang" edit>
            <Input label="Nama Cabang" />
            <Input label="Daftar Pengguna" />
            <Button title="Simpan" small onClick={() => alert("y")} />
          </CardBasic>
        </ContainerFluid>
      </Container>
    </Wrapper>
  );
}

export default BranchAdd;
