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

function BranchEdit(props) {
  const { value } = props.location.state;
  return (
    <Wrapper>
      <Sidebar active="perusahaan" />
      <Container>
        <Topbar />
        <ContainerFluid>
          <CardBasic title={`Edit ${value.nama}`} edit>
            <Input
              label="Nama Cabang"
              value={value.nama}
              onChange={() => null}
            />
            <Input
              label="Daftar Pengguna"
              value={value.users}
              onChange={() => null}
            />
            <Button title="Simpan" small onClick={() => alert("y")} />
          </CardBasic>
        </ContainerFluid>
      </Container>
    </Wrapper>
  );
}

export default BranchEdit;
