/* eslint-disable array-callback-return */
import React from "react";
import {
  Container,
  ItemHome,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { Link } from "react-router-dom";

const items = [
  {
    name: "Dashboard",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/107x100/4839c9f5e9c6e67d1306cd75c8baf99e/Group_%2812%29.png",
    to: "DashboardAdmin",
  },
  {
    name: "Pengembalian Barang",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/100x101/760d7b11a111eb4544495b0858441769/Group_%2813%29.png",
    to: "PengembalianAdmin",
  },
  {
    name: "Penjualan",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/100x100/e424f24b1c6bad9842318d1a953e789b/Vector.png",
    to: "ProdukAdmin",
  },
  {
    name: "Periksa Chat",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/100x52/f694b218b1199328f408a473a3694c4e/XMLID_305.png",
    to: "PeriksaChatAdmin",
  },
  {
    name: "Verifikasi",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/96x100/fd26a43f39ef8cb2e8404ab8ba0a6fdd/Vector-1.png",
    to: "VerifikasiAdmin",
  },
  {
    name: "Blokir/Unblokir",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/100x101/1851a31850e69cc1413c50db5cae125e/Group_%2814%29.png",
    to: "ListBlokir",
  },
  {
    name: "Chat Komplain",
    icon: "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/100x100/39a7858c1bb6b63700305e55096b0887/Group.png",
    to: "ChatKomplain",
  },
  {
    name: "Informasi",
    icon: "https://juber.co.id/storage/images/gdov3KZ2pazMqaJZVGwpkzqLzmcnA7zEOVMrQz2N.png",
    to: "InformasiAdmin",
  },
  {
    name: "Broadcast",
    icon: "https://juber.co.id/storage/images/adunV3GMVOEN13ROXCeW9mKl9ZMwDWIO3B9PFz6K.png",
    to: "BroadcastAdmin",
  },
  {
    name: "Top Merchant/Produk",
    icon: "https://juber.co.id/storage/images/JCGgxjGtgAQ0UONQelWSM8r2GMsZE24lshRtjXVQ.png",
    to: "ListTopMerchant",
  },
  {
    name: "Update Versi",
    icon: "https://juber.co.id/storage/images/HCJea0PDRZn6fa0YEn8KwXgdGOzGFWY5SRP1l3tk.png",
    to: "UpdateVersi",
  },
  {
    name: "Voucher",
    icon: null,
    to: "AdminVoucher",
    vector: "tag-faces",
  },
  {
    name: "Check Akun / HP",
    icon: null,
    to: "AdminCheckAccount",
    vector: "account",
  },
  {
    name: "Pengaturan",
    icon: null,
    to: "AdminSettings",
    vector: "database-settings",
  },
  {
    name: "Pengaturan ALL IN",
    icon: null,
    to: "AdminSettingsALLIN",
    vector: "database-settings",
  },
];

function Dashboard() {
  return (
    <Wrapper>
      <Topbar />
      <Container>
        <Sidebar active="home" />
        <div className="page-content-wrapper">
          <div className="page-content" style={{ minHeight: 1615 }}>
            <div className="page-bar">
              <div className="page-title-breadcrumb">
                <div className=" pull-left">
                  <div className="page-title">Dashboard</div>
                </div>
                <ol className="breadcrumb page-breadcrumb pull-right">
                  <li>
                    <i className="fa fa-home"></i>&nbsp;
                    <Link className="parent-item" to="/dashboard">
                      Home
                    </Link>
                    &nbsp;<i className="fa fa-angle-right"></i>
                  </li>
                  <li className="active">Dashboard</li>
                </ol>
              </div>
            </div>
            <div className="row clearfix">
              {items.map((item, index) => {
                return (
                  <Link
                    className="col-lg-3 col-md-6 col-sm-12 text-center text-white"
                    to={item.to}
                  >
                    <ItemHome
                      title={item.name}
                      img={item.icon}
                      icon={item?.vector}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Dashboard;
