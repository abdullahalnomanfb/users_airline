import React, { useEffect, useState } from "react";
import { Button, Modal, Spin, Table } from "antd";
import axios from "axios";
import Pagination from "./Pagination";
const TablePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [airlelineDetail, setAirlelineDetail] = useState({
    country: "",
    established: "",
    head_quaters: "",
    id: 8,
    logo: "",
    name: "",
    slogan: "",
    website: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [usersData, setUsersData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const allUsers = usersData.slice(firstIndex, lastIndex);

  const columns = [
    {
      title: "User name",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (text) => (
        <a href="/#" style={{ textDecoration: "none" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Total number of trips ",
      dataIndex: "trips",
      key: "trips",
      width: 400,
    },
    {
      title: "Empty",
      key: "empty",
      render: () => (
        <div>
          <Button type="primary" onClick={showModal}>
            Airline{" "}
          </Button>
        </div>
      ),
      width: 400,
    },
  ];

  const fetchData = async () => {
    const {
      data: { data },
    } = await axios.get(
      "https://api.instantwebtools.net/v1/passenger?page=0&size=80"
    );
    setUsersData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const selectRow = (record) => {
    setAirlelineDetail(record?.airline[0]);
  };

  console.log(airlelineDetail);
  return (
    <div style={{ margin: "2% 10%" }}>
      <Modal
        title="Airline"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <img src={airlelineDetail.logo} alt="" />
          <h5 style={{marginTop:'10px'}}>Name: {airlelineDetail.name}</h5>
          <p>Country: {airlelineDetail.country}</p>
          <p>Established: {airlelineDetail.established} </p>
          <p>Website: <a href={airlelineDetail.website} target="_blank" rel="noreferrer">{airlelineDetail.website}</a> </p>
          
        </div>
  
      </Modal>

      <div
        style={{
          margin: "0%",
          marginBottom: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button type="danger" onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        <Button type="danger" onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
      <Pagination
        totalUsers={usersData.length}
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
      />

      <Table
        columns={columns}
        dataSource={allUsers}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          },
        })}
      />
      <div style={{ textAlign: "center", padding: "10px" }}>
        {!allUsers.length && <Spin size="large" />}
      </div>
    </div>
  );
};

export default TablePage;
